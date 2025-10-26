import { motion } from 'framer-motion';
import MuxPlayer from '@mux/mux-player-react';
import { useState, useEffect, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import type { Video } from '../data/videoData';
import { VideoPlaybackContext } from '../App';

type VideoCardMuxProps = {
  video: Video;
};

const VideoCardMux = ({ video }: VideoCardMuxProps) => {
  const [showFullView, setShowFullView] = useState(false);
  const { currentlyPlaying, setCurrentlyPlaying } = useContext(VideoPlaybackContext);
  const playerRef = useRef<any>(null);
  const modalPlayerRef = useRef<any>(null);

  const handlePlay = () => {
    // Set this video as currently playing
    setCurrentlyPlaying(video.id);
  };

  // Handle video playback control
  useEffect(() => {
    if (currentlyPlaying && currentlyPlaying !== video.id) {
      // Pause this video if another one is playing
      if (playerRef.current) {
        playerRef.current.pause();
      }
      if (modalPlayerRef.current) {
        modalPlayerRef.current.pause();
      }
    }
  }, [currentlyPlaying, video.id]);

  useEffect(() => {
    if (showFullView) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showFullView]);

  return (
    <motion.div
      style={{
        backgroundColor: '#1E293B',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0 0 15px rgba(249, 115, 22, 0.3)'
      }}
      transition={{ duration: 0.2 }}
    >
      <div style={{ aspectRatio: '16/9', width: '100%' }}>
        <MuxPlayer
          ref={playerRef}
          streamType="on-demand"
          playbackId={video.id}
          metadata={{
            video_title: video.title,
            video_id: video.id,
          }}
          thumbnailTime={video.thumbnailTime || 0}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onPlay={handlePlay}
        />
      </div>
      <div style={{ padding: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3
            style={{
              color: '#F1F5F9',
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '8px',
              height: '54px',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
            title={video.title}
          >
            {video.title}
          </h3>
          <p style={{
            color: '#94A3B8',
            fontSize: '14px',
            marginBottom: '12px',
            height: '60px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}>
            {video.description}
          </p>
        </div>
        <button
          onClick={() => {
            // Pause the card view video before showing full view
            if (playerRef.current) {
              playerRef.current.pause();
            }
            setShowFullView(true);
            setCurrentlyPlaying(video.id);
          }}
          style={{
            backgroundColor: '#3B82F6',
            color: 'white',
            fontSize: '12px',
            padding: '4px 8px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            alignSelf: 'flex-start'
          }}
        >
          Full View
        </button>
      </div>

      {/* Full view modal */}
      {showFullView && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            pointerEvents: 'all'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowFullView(false);
            }
          }}
        >
          <div
            style={{
              width: '90vw',
              maxWidth: '1200px',
              backgroundColor: '#1E293B',
              borderRadius: '8px',
              padding: '20px',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFullView(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#475569',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              ✕
            </button>
            <div style={{ aspectRatio: '16/9', width: '100%' }}>
              <MuxPlayer
                ref={modalPlayerRef}
                streamType="on-demand"
                playbackId={video.id}
                metadata={{
                  video_title: video.title,
                  video_id: video.id,
                }}
                autoPlay
                muted={false}
                thumbnailTime={video.thumbnailTime || 0}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onPlay={handlePlay}
              />
            </div>
            <h2 style={{ color: '#F1F5F9', marginTop: '20px' }}>{video.title}</h2>
            <p style={{ color: '#94A3B8' }}>{video.description}</p>
          </div>
        </div>,
        document.body
      )}
    </motion.div>
  );
};

export default VideoCardMux;