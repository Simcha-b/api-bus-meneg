import multer from 'multer';
import nodemailer from 'nodemailer';

const storage = multer.memoryStorage();  // אם אתה לא רוצה לשמור את הקבצים על השרת
const upload = multer({ storage }).single('file'); // 'file' זה שם השדה ב-FormData

const sendMail = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log('Error during file upload:', err);
      return res.status(500).send('שגיאה בקובץ המועלה');
    }

    const { email, subject, body } = req.body;
    const file = req.file;

    if (!email) {
      console.log('No recipient email provided');
      return res.status(400).send('שגיאה: אין כתובת אימייל נמען');
    }
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'simchaberkovitz@gmail.com',
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'בדרך הישר - ניהול',
      to: email,
      subject: subject,
      text: `${body}`,
      attachments: [
        {
          filename: file.originalname,
          content: file.buffer,
        },
      ],
    };

    try {
      console.log('Attempting to send email...');
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      res.status(200).send('מייל נשלח בהצלחה');
    } catch (error) {
      console.log('Error during email sending:', error);
      res.status(500).send('שגיאה בשליחת המייל');
    }
  });
};

export default sendMail;
