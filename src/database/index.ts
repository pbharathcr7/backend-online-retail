import { connect, set } from 'mongoose';
import { NODE_ENV } from '@config';

export const dbConnection = async () => {
  const DB_URI = process.env.DB_URI;
  
  if (!DB_URI) {
    throw new Error('DB_URI environment variable is not defined');
  }

  const dbConfig = {
    url: DB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
  };

  if (NODE_ENV !== 'production') {
    set('debug', true);
  }

  try {
    await connect(dbConfig.url, dbConfig.options);
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}