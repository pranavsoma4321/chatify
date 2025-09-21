import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Import your existing rate limiters
import { authRateLimiter, apiRateLimiter } from "../middleware/rateLimit.middleware.js";

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from '../lib/db.js';
import { ENV } from '../lib/env.js';

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(express.json({ limit: "10mb"}));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// CORS setup
const allowedOrigins = [ENV.CLIENT_URL, 'http://localhost:5173'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(cookieParser());

// --- Apply Rate Limiting using YOUR existing limiters ---
app.use('/api/', apiRateLimiter); // Apply general limiter to all API routes
app.use('/api/auth', authRateLimiter); // Apply auth-specific limiter

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