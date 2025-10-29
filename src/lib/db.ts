import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = import.meta.env.VITE_MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Database and collection names
export const DB_NAME = 'portovideo';
export const COLLECTIONS = {
  VIDEOS: 'videos',
  CONTACTS: 'contacts'
};

// Connect to MongoDB
export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(DB_NAME);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

// Close the connection
export async function closeDatabaseConnection() {
  await client.close();
  console.log("MongoDB connection closed");
}

// Video schema type
export interface VideoDocument {
  id: string;
  title: string;
  category: string;
  description: string;
  source: 'mux' | 'vimeo';
  playCount: number;
  dateAdded: Date;
  lastPlayed?: Date;
}

// Contact schema type
export interface ContactDocument {
  email: string;
  name?: string;
  message: string;
  dateSubmitted: Date;
}