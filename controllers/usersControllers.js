import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db/connection.js";
// מפתח סודי לאימות הטוקן
const secretKey = process.env.my_secret_key;

async function loginUser(req, res) {
  const { email, password } = req.body;
  console.log("Login request received:", email, password);
  
  // console.log("Login request received:", email, password);

  try {
    // שליפת המשתמש מהמסד
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "משתמש לא נמצא"
      });
    }

    const user = users[0];

    // השוואת הסיסמה הגולמית לסיסמה המוצפנת
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "סיסמה שגויה"
      });
    }

    // יצירת טוקן JWT
    const token = jwt.sign(
      {
        userId: user.idusers,
        email: user.email,
      },
      secretKey,
      { expiresIn: "24h" }
    );
    const userInfo = {
      userId: user.idusers,
      email: user.email,
      role: user.role,
      name: user.name,
    };
    console.log("Login successful!");
    res.json({ token, userInfo }); 
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({
      success: false,
      message: "אירעה שגיאה בתהליך ההתחברות",
      error: err.message
    });
  }
}

export { loginUser };
