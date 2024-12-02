import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db/connection.js";
// מפתח סודי לאימות הטוקן
const secretKey = process.env.my_secret_key;

// import { getUser } from "../db/queries/usersQueries.js";

// const getUserById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const user = await getUser(id);
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error retrieving user",
//       error: error.message || "Internal Server Error",
//     });
//   }
// };

async function loginUser(req, res) {
  const { email, password } = req.body;
  // console.log("Login request received:", email, password);

  try {
    // שליפת המשתמש מהמסד
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      throw new Error("User not found");
    }

    const user = users[0];

    // השוואת הסיסמה הגולמית לסיסמה המוצפנת
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
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
    throw err;
  }
}

export { loginUser };
