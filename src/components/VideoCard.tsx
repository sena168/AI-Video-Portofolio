import type { Video } from '../data/videoData';
import VideoCardMux from './VideoCardMux';
import VideoCardVimeo from './VideoCardVimeo';

type VideoCardProps = {
  video: Video;
};

const VideoCard = ({ video }: VideoCardProps) => {
  if (video.source === 'mux') {
    return <VideoCardMux video={video} />;
  } else if (video.source === 'vimeo') {
    return <VideoCardVimeo video={video} />;
  }
  return null;
};

export default VideoCard;