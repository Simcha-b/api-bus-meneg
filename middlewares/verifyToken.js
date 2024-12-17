import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); 
const secretKey = process.env.my_secret_key; 

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];        
    if (!token) {
        return res.status(403).json({ message: "Token is required" });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default verifyToken;
