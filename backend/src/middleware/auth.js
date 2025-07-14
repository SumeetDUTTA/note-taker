import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.autherization;

    if(!authHeader) {
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