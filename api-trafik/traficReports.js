import axios from 'axios';
import * as cheerio from 'cheerio';
import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';

const URL = "https://www.iroads.co.il/";

async function fetchTrafficReports() {
  try {
    // יצירת CookieJar לניהול Cookies
    const jar = new CookieJar();
    const client = wrapper(axios.create({ jar }));

    // בקשה עם Headers משופרים
    const { data } = await client.get(URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
        'Referer': URL,
        'Connection': 'keep-alive',
      },
    });

    // עיבוד הדף עם Cheerio
    const $ = cheerio.load(data);

    // שמירת כל סוגי הדיווחים
    const reportCategories = [
      { id: '#allReports', category: 'הכל' },
      // { id: '#roadConstruction', category: 'עבודות' },
      // { id: '#loads', category: 'עומסים' }
    ];

    const reports = [];

    reportCategories.forEach(({ id, category }) => {
      // חיפוש דיווחים תחת כל קטגוריה
      $(`${id} .reportsList__item`).each((index, element) => {
        const roadNumber = $(element).find('.roadNumber').text().trim().replace(/\s+/g, ' ');
        const description = $(element).find('.description').text().trim().replace(/\s+/g, ' ');

        // הוספת המידע שנמצא למערך
        reports.push({
          roadNumber,
          description,
          category,
        });
      });
    });

    return reports;
  } catch (error) {
    console.error('Error fetching traffic reports:', error.message);

   // Fallback לפתרון מבוסס Puppeteer
    if (error.response?.status === 403) {
      console.warn('ניסיון לעקוף חסימה באמצעות Puppeteer...');
      return await fetchTrafficReportsWithPuppeteer();
    }
  }
}

// Fallback: שימוש ב-Puppeteer
import puppeteer from 'puppeteer';

async function fetchTrafficReportsWithPuppeteer() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: 'networkidle2' });

    // שליפת תוכן הדף
    const content = await page.content();
    const $ = cheerio.load(content);

    // חזור על הלוגיקה לניתוח הדיווחים כמו למעלה
    const reportCategories = [
      { id: '#allReports', category: 'הכל' },
    ];

    const reports = [];

    reportCategories.forEach(({ id, category }) => {
      $(`${id} .reportsList__item`).each((index, element) => {
        const roadNumber = $(element).find('.roadNumber').text().trim().replace(/\s+/g, ' ');
        const description = $(element).find('.description').text().trim().replace(/\s+/g, ' ');

        reports.push({
          roadNumber,
          description,
          category,
        });
      });
    });

    await browser.close();
    return reports;
  } catch (error) {
    console.error('Error fetching traffic reports with Puppeteer:', error.message);
    return [];
  }
}

export default fetchTrafficReports;
