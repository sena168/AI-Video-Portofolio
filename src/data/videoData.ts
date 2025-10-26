import videolinks from '../videolinks.json';

export type Video = {
  id: string;           // Mux Playback ID or Vimeo URL
  title: string;
  category: 'ads' | 'music' | 'humor' | 'tutorials';
  description?: string;
  thumbnail?: string;   // Optional custom thumbnail URL
  source: 'mux' | 'vimeo'; // Video source platform
  thumbnailTime?: number; // Thumbnail time in seconds for Mux
}

export const videos: Video[] = videolinks as Video[];