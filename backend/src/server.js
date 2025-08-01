import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';

import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';
import userDb from './config/userDb.js';
import ratelimiter from './middleware/ratelimiter.js';
import { env } from 'process';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve()

if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }))
}

app.use(express.json());
app.use(ratelimiter);

// app.use((req, res, next) => {
//   console.log(`Received a ${req.method} request for ${req.url}`);
//   next();
// });

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"))
  })
}

connectDB().then(() => {
  userDb().then(() => {
    app.listen(PORT, () => {
      console.log('Server is running on PORT:', PORT);
    });
  });
});




