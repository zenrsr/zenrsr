
import { useEffect, useState } from 'react';

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 10;
        return next > 100 ? 100 : next;
      });
    }, 100);

    // Hide loading screen after completion
    const timeout = setTimeout(() => {
      setHidden(true);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={`loading-screen ${hidden ? 'hidden' : ''}`}>
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold mb-6 animate-pulse-soft">Portfolio</div>
        <div className="w-48 h-1 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-muted-foreground">{Math.round(progress)}%</div>
      </div>
    </div>
  );
};

export default Loading;
