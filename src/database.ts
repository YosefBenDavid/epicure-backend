import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.MONGO_URL;


if (!url) {
  throw new Error('MongoDB connection URL (MONGO_URL) is not provided in the environment variables. Make sure to set it in your .env file.');
}


const client = new MongoClient(url);

async function connectToDatabase(): Promise<void> {
  try {
    await client.connect();
    console.log('Connected to MongoDB from the DB.ts');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

async function closeDatabaseConnection(): Promise<void> {
  try {
    await client.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
}

process.on('SIGINT', async () => {
  await closeDatabaseConnection();
  process.exit(0);
});

export { connectToDatabase, closeDatabaseConnection };
