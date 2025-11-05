// server.js (ES Modules)

import express from 'express';
import 'express-async-errors'; // handles async errors in routes
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import questionRoutes from './routes/question.js';
import authRoutes from './routes/auth.js';
import quizRoutes from './routes/quiz.js';
import attemptRoutes from './routes/attempt.js';

dotenv.config();
connectDB();
console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/attempts', attemptRoutes);

// Handle 404 for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
