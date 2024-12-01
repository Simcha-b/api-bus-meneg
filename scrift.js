import bcrypt from 'bcryptjs';
import pool from './db/connection.js';

const saltRounds = 10;

async function encryptExistingPasswords() {
    try {
        // שליפת כל המשתמשים
        const [users] = await pool.query('SELECT idusers, password FROM users'); // שים לב למבנה החזרה

        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, saltRounds); // הצפנת הסיסמה

            // עדכון הסיסמה המוצפנת במסד
            await pool.query('UPDATE users SET password = ? WHERE idusers = ?', [hashedPassword, user.idusers]);
            console.log(`Password updated for user ID: ${user.idusers}`);
        }

        console.log('All passwords have been encrypted successfully!');
    } catch (err) {
        console.error('Error encrypting passwords:', err);
    }
}

// הפעלת הפונקציה
// encryptExistingPasswords();
