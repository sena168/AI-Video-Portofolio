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
      <div className="min-h-screen bg-[url('/povmaintrans.png')] bg-cover bg-center bg-slate-900 text-slate-100 p-5">
        <div className="bg-black/70 p-5 rounded-lg max-w-2xl mx-auto my-10 mb-5">
          <h1 className="text-4xl text-center text-white drop-shadow-lg">
            Prompt One Visuals
          </h1>
          <p className="text-xl text-center text-slate-400 drop-shadow-md">
            AI Visionary | Video Creator
          </p>
        </div>
        <AboutSection />

        <div className="max-w-4xl mx-auto my-10">
          <div className="flex justify-center gap-5 mb-8 bg-black/70 p-2.5 rounded-lg max-w-lg mx-auto my-5">
            <button
              className={`px-4 py-2 rounded cursor-pointer ${
                activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-transparent text-slate-400'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded cursor-pointer ${
                activeTab === 'ads' ? 'bg-blue-500 text-white' : 'bg-transparent text-slate-400'
              }`}
              onClick={() => setActiveTab('ads')}
            >
              Ads & Promo
            </button>
            <button
              className={`px-4 py-2 rounded cursor-pointer ${
                activeTab === 'music' ? 'bg-blue-500 text-white' : 'bg-transparent text-slate-400'
              }`}
              onClick={() => setActiveTab('music')}
            >
              Music Videos
            </button>
            <button
              className={`px-4 py-2 rounded cursor-pointer ${
                activeTab === 'humor' ? 'bg-blue-500 text-white' : 'bg-transparent text-slate-400'
              }`}
              onClick={() => setActiveTab('humor')}
            >
              Humor & Anecdote
            </button>
            <button
              className={`px-4 py-2 rounded cursor-pointer ${
                activeTab === 'tutorials' ? 'bg-blue-500 text-white' : 'bg-transparent text-slate-400'
              }`}
              onClick={() => setActiveTab('tutorials')}
            >
              Tutorials
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <div key={video.id} className="m-2.5">
                  <VideoCard video={video} />
                </div>
              ))
            ) : (
              <p className="col-span-full text-center">
                No videos found in this category.
              </p>
            )}
          </div>
        </div>

        <div className="text-center mt-24 max-w-lg mx-auto">
          <h2 className="text-2xl mb-5 drop-shadow-md">
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
              action={`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`}
              method='POST'
              className="mb-5 w-full"
            >
              <input
                type='text'
                name='name'
                placeholder='Your Name'
                className="w-full p-3 mb-2.5 bg-slate-800 border border-slate-700 text-white rounded"
                required
              />
              <input
                type='email'
                name='email'
                placeholder='Your Email'
                className="w-full p-3 mb-2.5 bg-slate-800 border border-slate-700 text-white rounded"
                required
              />
              <textarea
                name='message'
                placeholder='Your Question'
                rows={4}
                className="w-full p-3 mb-2.5 bg-slate-800 border border-slate-700 text-white resize-vertical rounded"
              />
              <div className="flex gap-2.5 items-center justify-center bg-black/70 p-2.5 rounded-lg w-full">
                <button
                  type='submit'
                  className="flex-1 p-3 bg-blue-500 text-white border-none rounded cursor-pointer font-bold transition-transform duration-200 h-12 flex items-center justify-center hover:bg-blue-600"
                >
                  Send Message
                </button>

                <div className="font-bold text-white">or</div>

                <a
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=Hai%20Prompt%20One!%20Mau%20tau%20donk%20video%20seperti%20apa%20yang%20bisa%20kamu%20buatin%20buat%20aku?`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className="flex-1 inline-flex items-center justify-center gap-2 p-3 bg-green-500 text-white border-none rounded cursor-pointer font-bold no-underline transition-transform duration-200 h-12 hover:bg-green-600"
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

          <footer className="text-center mt-24 pb-5 text-slate-400 drop-shadow-md">
            © 2025 Prompt One Visuals Portfolio. All rights reserved.
          </footer>
        </div>
      </div>
    </VideoPlaybackContext.Provider>
  );
}

export default App;
