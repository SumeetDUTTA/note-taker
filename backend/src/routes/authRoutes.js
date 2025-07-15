import express from 'express';
import { registerUser, login } from '../controllers/authControllers.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', login)

export default router;