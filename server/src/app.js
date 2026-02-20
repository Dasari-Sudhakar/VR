import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import tourRoutes from './routes/tourRoutes.js';
import userRoutes from './routes/userRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import { errorHandler, notFound } from './middleware/error.js';
import { env } from './config/env.js';

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true
  })
);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
