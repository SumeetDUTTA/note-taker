import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// console.log("auth.js sees JWT_SECRET =", JWT_SECRET);

export const verifyToken = (req, res, next) => {

    // console.log("🔐 authHeader:", req.headers.authorization);
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message: "Access denied, no token provided."});
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({message: "Invalid token."});
    }
}