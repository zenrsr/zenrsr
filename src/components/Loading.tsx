
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  
  // English word with Japanese-style font
  const loadingText = "LOADING";

  useEffect(() => {
    // Simulate loading progress with smoother increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 5 + (100 - prev) * 0.05;
        const next = prev + increment;
        return next > 100 ? 100 : next;
      });
    }, 100);

    // Hide loading screen after completion with a delay for smoother transition
    const timeout = setTimeout(() => {
      setHidden(true);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div 
          className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { 
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1] 
            }
          }}
        >
          <div className="flex flex-col items-center justify-center text-white">
            <motion.div 
              className="text-7xl font-bold mb-12 tracking-widest font-brushFont"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2
                }
              }}
              style={{
                textShadow: '0 0 15px rgba(255,255,255,0.5)',
                letterSpacing: '0.1em',
                fontFamily: '"Bungee Shade", "Zen Antique", sans-serif',
                fontWeight: 400,
                transform: 'scale(1, 0.9)'
              }}
            >
              {loadingText}
            </motion.div>
            
            <div className="w-60 relative">
              <div className="h-px bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: progress / 100,
                    transition: { 
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }}
                />
              </div>
              <motion.div 
                className="absolute right-0 top-2 text-xs text-white/70"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: { delay: 0.4 }
                }}
              >
                {Math.round(progress)}%
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
