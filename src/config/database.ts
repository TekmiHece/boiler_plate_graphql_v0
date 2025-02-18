import mongoose from 'mongoose';
import { environment } from './environment';
import logger from '@/utils/logger';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(environment.mongoUri);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
}; 