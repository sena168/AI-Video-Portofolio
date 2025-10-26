// MongoDB implementation commented out for Vercel deployment
// import { MongoClient, ServerApiVersion } from 'mongodb';

// const uri = "mongodb+srv://promptonevisuals_db_user:40esNU5zFP8r8DAm@promptonevisualsmongodb.idegnge.mongodb.net/?retryWrites=true&w=majority&appName=PromptOneVisualsMongoDB";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// Database and collection names
export const DB_NAME = 'portovideo';
export const COLLECTIONS = {
  VIDEOS: 'videos',
  CONTACTS: 'contacts'
};

// Connect to MongoDB - commented out for now
export async function connectToDatabase() {
  try {
    // await client.connect();
    console.log("MongoDB connection disabled for deployment");
    return null;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

// Close the connection
export async function closeDatabaseConnection() {
  // await client.close();
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