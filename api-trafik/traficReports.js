// import axios from 'axios';
// import * as cheerio from 'cheerio';

// const URL = "https://www.iroads.co.il/";
// async function fetchTrafficReports() {
//     try {
//       // שליפת התוכן של הדף
//       const { data } = await axios.get(URL); // יש להחליף בכתובת האתר
//       const $ = cheerio.load(data);
//   // שמירת כל סוגי הדיווחים
//   const reportCategories = [
//     { id: '#allReports', category: 'הכל' },
//     // { id: '#roadConstruction', category: 'עבודות' },
//     // { id: '#loads', category: 'עומסים' }
//   ];

//   const reports = [];

//   reportCategories.forEach(({ id, category }) => {
//     // חיפוש דיווחים תחת כל קטגוריה
//     $(`${id} .reportsList__item`).each((index, element) => {
//       const roadNumber = $(element).find('.roadNumber').text().trim().replace(/\s+/g, ' ');
//       const description = $(element).find('.description').text().trim().replace(/\s+/g, ' ');

//       // חיפוש זמן דיווח, אם קיים   
//     //   const timeReport = $(element).find('.timeReport').text().trim(); // צריך לוודא ש-HTML כולל שעת דיווח

//       reports.push({
//         roadNumber,
//         description,
//         category,
//       });
//     });
//   });
//   return reports;

//   } catch (error) {
//     console.error('Error fetching traffic reports:', error);
//   }
// }

// async function fetchAndCompareReports() {
//   const currentReports = await fetchTrafficReports();
//   if (JSON.stringify(currentReports) !== JSON.stringify(previousReports)) {
//     console.log('עודכנו דיווחים חדשים:', currentReports);
//     previousReports = currentReports;
//   } else {
//     console.log('אין שינויים בדיווחים.');
//   }
// }

// export default fetchTrafficReports;
import axios from 'axios';
import * as cheerio from 'cheerio';

const URL = "https://www.iroads.co.il/";

async function fetchTrafficReports() {
    // רוטציה של User Agents
    const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0'
    ];

    // רוטציה של Referrers
    const referrers = [
        'https://www.google.com',
        'https://www.bing.com',
        'https://www.yahoo.com'
    ];

    try {
        // בחירה רנדומלית של User Agent ו-Referrer
        const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
        const randomReferrer = referrers[Math.floor(Math.random() * referrers.length)];

        const headers = {
            'User-Agent': randomUserAgent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
            'Accept-Encoding': 'gzip, deflate, br',
            'Referer': randomReferrer,
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1'
        };

        // שימוש ב-proxy אם הוגדר
        const proxyUrl = process.env.PROXY_URL;
        const proxyUsername = process.env.PROXY_USERNAME;
        const proxyPassword = process.env.PROXY_PASSWORD;

        let axiosConfig = {
            headers,
            timeout: 30000,
            maxRedirects: 5,
            validateStatus: function (status) {
                return status >= 200 && status < 500; // דחיית שגיאות שרת בלבד
            }
        };

        // הוספת תצורת proxy אם הוגדר
        if (proxyUrl) {
            const proxyConfig = {
                protocol: 'http',
                host: proxyUrl.split(':')[0],
                port: proxyUrl.split(':')[1],
                ...(proxyUsername && proxyPassword && {
                    auth: {
                        username: proxyUsername,
                        password: proxyPassword
                    }
                })
            };
            axiosConfig.proxy = proxyConfig;
        }

        // ניסיון לבצע את הבקשה עם retry logic
        let retries = 3;
        let error;

        while (retries > 0) {
            try {
                const response = await axios.get(URL, axiosConfig);
                
                // בדיקה אם התגובה היא אכן HTML ולא דף שגיאה
                if (response.status === 200 && response.data.includes('reportsList__item')) {
                    const $ = cheerio.load(response.data);
                    const reports = [];

                    $('.reportsList__item').each((index, element) => {
                        const roadNumber = $(element).find('.roadNumber').text().trim().replace(/\s+/g, ' ');
                        const description = $(element).find('.description').text().trim().replace(/\s+/g, ' ');
                        
                        if (roadNumber || description) {
                            reports.push({
                                roadNumber,
                                description,
                                timestamp: new Date().toISOString(),
                            });
                        }
                    });

                    if (reports.length > 0) {
                        return reports;
                    }
                }
                
                // אם הגענו לכאן, התגובה לא הכילה את המידע הנדרש
                throw new Error('Invalid response structure');
                
            } catch (e) {
                error = e;
                retries--;
                if (retries > 0) {
                    // המתנה לפני הניסיון הבא
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
            }
        }

        // אם כל הניסיונות נכשלו
        throw error || new Error('Failed to fetch data after multiple retries');

    } catch (error) {
        console.error('Scraping error:', {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data
        });
        throw error;
    }
}

export default fetchTrafficReports;