import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from '../lib/db.js';
import { ENV } from '../lib/env.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(express.json()); // parse JSON
app.use(express.urlencoded({ extended: true })); // parse URL-encoded

// CORS setup
const allowedOrigins = [ENV.CLIENT_URL, 'http://localhost:5173']; // add localhost for dev
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(cookieParser());

// --- Logging for debugging network issues ---
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// --- Production static files ---
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// --- Start server ---
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await connectDB();
    console.log('Database connected successfully!');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
});
