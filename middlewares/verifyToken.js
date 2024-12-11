import jwt from "jsonwebtoken";

const secretKey = process.env.my_secret_key; 

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];        
    if (!token) {
        return res.status(403).json({ message: "Token is required" });
    }
    try {
        const decoded = jwt.verify(token, secretKey); // אימות הטוקן
        req.user = decoded; // שמירת המידע מהטוקן ב-request
        next(); // המשך לבקשה הבאה
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default verifyToken;
