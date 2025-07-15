import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
// console.log("authControllers.js sees JWT_SECRET =", JWT_SECRET)

export const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const userExists = await User.findOne({email})
        if(userExists) {
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {expiresIn: "2h"});

        res.status(201).json({
            message: "User registered successfully",
            user: {username: newUser.username, email: newUser.email},
            token,
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({message: "Internal server error", error: error.message});
    }
};

export const login = async (req, res) => {
    // console.log("🔑 Login attempt:", req.body);
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "Invalid email or password."})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: "Invalid email or password."})
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: '2h'})
        res.status(200).json({message: "Login successful", token, user: {id: user._id, username: user.username}});
    } catch (error) {
        console.error("🔴 LOGIN EXCEPTION:", error)
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}
