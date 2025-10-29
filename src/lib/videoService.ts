// Import the functions
import { connectToDatabase, COLLECTIONS } from './db';
import type { VideoDocument } from './db';

// Get all videos from database
export async function getAllVideos(): Promise<VideoDocument[]> {
  try {
    const db = await connectToDatabase();
    const videos = await db.collection(COLLECTIONS.VIDEOS).find().toArray() as VideoDocument[];
    return videos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

// Get video by ID
export async function getVideoById(id: string): Promise<VideoDocument | null> {
  try {
    const db = await connectToDatabase();
    const video = await db.collection(COLLECTIONS.VIDEOS).findOne({ id }) as VideoDocument;
    return video;
  } catch (error) {
    console.error(`Error fetching video with ID ${id}:`, error);
    return null;
  }
}

// Increment play count for a video
export async function incrementPlayCount(id: string): Promise<boolean> {
  try {
    const db = await connectToDatabase();
    const result = await db.collection(COLLECTIONS.VIDEOS).updateOne(
      { id },
      {
        $inc: { playCount: 1 },
        $set: { lastPlayed: new Date() }
      }
    );
    return result.modifiedCount > 0;
  } catch (error) {
    console.error(`Error incrementing play count for video ${id}:`, error);
    return false;
  }
}

// Add a new video
export async function addVideo(video: Omit<VideoDocument, 'playCount' | 'dateAdded'>): Promise<boolean> {
  try {
    const db = await connectToDatabase();
    const newVideo: VideoDocument = {
      ...video,
      playCount: 0,
      dateAdded: new Date()
    };
    
    const result = await db.collection(COLLECTIONS.VIDEOS).insertOne(newVideo);
    return !!result.insertedId;
  } catch (error) {
    console.error("Error adding new video:", error);
    return false;
  }
}

// Save contact form submission
export async function saveContactSubmission(email: string, name: string, message: string): Promise<boolean> {
  try {
    const db = await connectToDatabase();
    const result = await db.collection(COLLECTIONS.CONTACTS).insertOne({
      email,
      name,
      message,
      dateSubmitted: new Date()
    });
    return !!result.insertedId;
  } catch (error) {
    console.error("Error saving contact submission:", error);
    return false;
  }
}