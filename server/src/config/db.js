import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDb = async () => {
  await mongoose.connect(env.mongoUri);
  // eslint-disable-next-line no-console
  console.log('MongoDB connected');
};
