import { useState, useEffect, useRef } from 'react';

interface SplashScreenProps {
  videoSrc: string;
  duration?: number;
  onClose?: () => void;
}

const SplashScreen = ({ videoSrc, duration = 5000, onClose }: SplashScreenProps) => {
  const [visible, setVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0; // Restart from beginning
      videoRef.current.play();
      setIsMuted(false);
    }
  };

  const handleError = (e: any) => {
    console.error('Video error:', e);
    setError('Failed to load splash video. Please try again.');
  };

  if (!visible) return null;

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black/70 z-[9999] flex justify-center items-center transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'} ${visible ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div className="relative w-[90%] max-w-4xl h-[70vh] max-h-[700px] bg-black rounded-lg shadow-2xl overflow-hidden flex items-center justify-center">
        <button 
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          ✕
        </button>
        {error ? (
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            textAlign: 'center',
            padding: '20px'
          }}>
            {error}
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
            onEnded={handleClose}
            onError={handleError}
            onLoadedData={() => console.log('Video loaded successfully')}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {isMuted && (
          <button
            onClick={handleUnmute}
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '12px 24px',
              backgroundColor: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              zIndex: 10,
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#2563EB';
              e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#3B82F6';
              e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
            }}
          >
            🔊 Enable Sound
          </button>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;