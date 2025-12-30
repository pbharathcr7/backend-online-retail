import { connect, set } from 'mongoose';
import { NODE_ENV } from '@config';

export const dbConnection = async () => {
  const DB_URI = process.env.DB_URI;
  
  if (!DB_URI) {
    throw new Error('DB_URI environment variable is not defined');
  }

  if (NODE_ENV !== 'production') {
    set('debug', true);
  }

  try {
    await connect(DB_URI);  // Remove the options parameter
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}