import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VideoCard from './VideoCard';
import { videos } from '../data/videoData';
import type { Video } from '../data/videoData';

type VideoGridProps = {
  activeTab: string;
};

const VideoGrid = ({ activeTab }: VideoGridProps) => {
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);

  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(videos.filter(video => video.category === activeTab));
    }
  }, [activeTab]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {filteredVideos.map((video) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <VideoCard video={video} />
        </motion.div>
      ))}
    </div>
  );
};

export default VideoGrid;