import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import notesRoutes from './routes/notesroutes.js';
import connectDB from './config/db.js';
import ratelimiter from './middleware/ratelimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
}))
app.use(express.json());
app.use(ratelimiter);

// app.use((req, res, next) => {
//   console.log(`Received a ${req.method} request for ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on PORT:', PORT);
  });
});




