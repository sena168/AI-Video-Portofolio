import { useState, createContext, useEffect } from 'react';
import { videos } from './data/videoData';
import VideoCard from './components/VideoCard';
import SplashScreen from './components/SplashScreen';
import AboutSection from './components/AboutSection';

// Create context for video playback control
export const VideoPlaybackContext = createContext({
  currentlyPlaying: '',
  setCurrentlyPlaying: (_: string) => {},
});

function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentlyPlaying, setCurrentlyPlaying] = useState('');
  const [showSplash, setShowSplash] = useState(true);

  // Hide splash screen after duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 15000); // Set to 15 seconds for video length
    return () => clearTimeout(timer);
  }, []);

  // Filter videos based on active tab
  const filteredVideos =
    activeTab === 'all'
      ? videos
      : videos.filter((video) => video.category === activeTab);

  return (
    <VideoPlaybackContext.Provider
      value={{ currentlyPlaying, setCurrentlyPlaying }}
    >
      {showSplash && (
        <SplashScreen
          videoSrc='/splashPOV.mp4'
          duration={15000}
          onClose={() => setShowSplash(false)}
        />
      )}
      <div
        style={{
          minHeight: '100vh',
          backgroundImage: 'url(/povmaintrans.png)',
          backgroundSize: '100% auto',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top center',
          backgroundColor: '#0F172A',
          color: '#F1F5F9',
          padding: '20px',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '800px',
            margin: '40px auto 20px auto',
          }}
        >
          <h1
            style={{
              fontSize: '3rem',
              textAlign: 'center',
              color: 'white',
              textShadow:
                '2px 2px 4px #000000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            }}
          >
            Prompt One Visuals
          </h1>
          <p
            style={{
              fontSize: '1.5rem',
              textAlign: 'center',
              color: '#94A3B8',
              textShadow:
                '1px 1px 2px #000000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            }}
          >
            AI Visionary | Video Creator
          </p>
        </div>
        <AboutSection />

        <div style={{ maxWidth: '1200px', margin: '40px auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              marginBottom: '30px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '10px',
              borderRadius: '10px',
              maxWidth: '600px',
              margin: '20px auto 30px auto',
            }}
          >
            <button
              style={{
                padding: '8px 16px',
                backgroundColor:
                  activeTab === 'all' ? '#3B82F6' : 'transparent',
                color: activeTab === 'all' ? 'white' : '#94A3B8',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button
              style={{
                padding: '8px 16px',
                backgroundColor:
                  activeTab === 'ads' ? '#3B82F6' : 'transparent',
                color: activeTab === 'ads' ? 'white' : '#94A3B8',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => setActiveTab('ads')}
            >
              Ads & Promo
            </button>
            <button
              style={{
                padding: '8px 16px',
                backgroundColor:
                  activeTab === 'music' ? '#3B82F6' : 'transparent',
                color: activeTab === 'music' ? 'white' : '#94A3B8',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => setActiveTab('music')}
            >
              Music Videos
            </button>
            <button
              style={{
                padding: '8px 16px',
                backgroundColor:
                  activeTab === 'humor' ? '#3B82F6' : 'transparent',
                color: activeTab === 'humor' ? 'white' : '#94A3B8',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => setActiveTab('humor')}
            >
              Humor & Anecdote
            </button>
            <button
              style={{
                padding: '8px 16px',
                backgroundColor:
                  activeTab === 'tutorials' ? '#3B82F6' : 'transparent',
                color: activeTab === 'tutorials' ? 'white' : '#94A3B8',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => setActiveTab('tutorials')}
            >
              Tutorials
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
              marginTop: '30px',
            }}
          >
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <div key={video.id} style={{ margin: '10px' }}>
                  <VideoCard video={video} />
                </div>
              ))
            ) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                No videos found in this category.
              </p>
            )}
          </div>
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: '100px',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          <h2
            style={{
              fontSize: '2rem',
              marginBottom: '20px',
              textShadow:
                '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            }}
          >
            Contact Me
          </h2>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <form
              action={`https://formspree.io/f/xdkwlorz`}
              method='POST'
              style={{ marginBottom: '20px', width: '100%' }}
            >
              <input
                type='text'
                name='name'
                placeholder='Your Name'
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '10px',
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  color: 'white',
                  borderRadius: '4px',
                }}
                required
              />
              <input
                type='email'
                name='email'
                placeholder='Your Email'
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '10px',
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  color: 'white',
                  borderRadius: '4px',
                }}
                required
              />
              <textarea
                name='message'
                placeholder='Your Question'
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '10px',
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  color: 'white',
                  resize: 'vertical',
                  borderRadius: '4px',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  padding: '10px',
                  borderRadius: '10px',
                  width: '100%',
                }}
              >
                <button
                  type='submit'
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'transform 0.2s, background-color 0.3s',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = '#2563EB')
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = '#3B82F6')
                  }
                  onMouseDown={(e) =>
                    (e.currentTarget.style.transform = 'scale(0.95)')
                  }
                  onMouseUp={(e) =>
                    (e.currentTarget.style.transform = 'scale(1)')
                  }
                >
                  Send Message
                </button>

                <div style={{ fontWeight: 'bold', color: 'white' }}>or</div>

                <a
                  href='https://wa.me/6285814668168?text=Hai%20Prompt%20One!%20Mau%20tau%20donk%20video%20seperti%20apa%20yang%20bisa%20kamu%20buatin%20buat%20aku?'
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{
                    flex: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    backgroundColor: '#25D366',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    transition: 'transform 0.2s, background-color 0.3s',
                    height: '48px',
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = '#128C7E')
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = '#25D366')
                  }
                  onMouseDown={(e) =>
                    (e.currentTarget.style.transform = 'scale(0.95)')
                  }
                  onMouseUp={(e) =>
                    (e.currentTarget.style.transform = 'scale(1)')
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    viewBox='0 0 16 16'
                  >
                    <path d='M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z' />
                  </svg>
                  Contact on WhatsApp
                </a>
              </div>
            </form>
          </div>

          <footer
            style={{
              textAlign: 'center',
              marginTop: '100px',
              paddingBottom: '20px',
              color: '#94A3B8',
              textShadow:
                '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            }}
          >
            © 2025 Prompt One Visuals Portfolio. All rights reserved.
          </footer>
        </div>
      </div>
    </VideoPlaybackContext.Provider>
  );
}

export default App;
