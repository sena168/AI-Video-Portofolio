import { motion } from 'framer-motion';

type TabProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabNavigation = ({ activeTab, setActiveTab }: TabProps) => {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'ads', label: 'Ads & Promo' },
    { id: 'music', label: 'Music Videos' },
    { id: 'humor', label: 'Humor & Anecdote' },
    { id: 'tutorials', label: 'Tutorials' },
  ];

  return (
    <div className="relative mb-8">
      <div className="max-w-2xl mx-auto flex flex-wrap justify-center md:space-x-8 border-b border-tertiary">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            
            className={`py-2 px-2 mx-1 my-1 text-sm md:text-lg relative transition-colors duration-300 ${
              activeTab === tab.id ? 'text-accent' : 'text-neutral hover:text-textPrimary'
            }`}
            style={{
              textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
            }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;