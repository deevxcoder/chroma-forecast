
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimerProps {
  duration: number;
  onComplete: () => void;
  gameId: string;
}

const Timer = ({ duration, onComplete, gameId }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    setTimeLeft(duration);
    setProgress(100);
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, onComplete, gameId]);
  
  useEffect(() => {
    setProgress((timeLeft / duration) * 100);
  }, [timeLeft, duration]);
  
  // Format time as minutes:seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // Warning state when timer is low
  const isWarning = timeLeft <= 10;
  
  return (
    <motion.div 
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="glass-card rounded-xl p-4 backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="px-2 py-1 bg-white/10 rounded text-xs font-medium text-white/70 backdrop-blur-sm">
            1 Min
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-white/70 mb-1">Time remaining</p>
            <AnimatePresence mode="wait">
              <motion.div 
                key={`${minutes}${seconds}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className={`flex justify-center gap-1 text-2xl font-bold ${
                  isWarning ? 'text-rose-400' : 'text-white'
                }`}
              >
                <span className="w-8 text-center">{minutes.toString().padStart(2, '0')}</span>
                <motion.span
                  animate={{ opacity: isWarning ? [1, 0.5, 1] : 1 }}
                  transition={{ 
                    duration: 1, 
                    repeat: isWarning ? Infinity : 0,
                    repeatType: "loop" 
                  }}
                >:</motion.span>
                <span className="w-8 text-center">{seconds.toString().padStart(2, '0')}</span>
              </motion.div>
            </AnimatePresence>
          </div>
          <div></div> {/* Empty div for flex balance */}
        </div>
        
        <div className="text-center mb-3">
          <motion.p 
            className="text-xs font-medium text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {gameId}
          </motion.p>
        </div>
        
        <div className="progress-bar h-1.5 bg-gray-200/20 rounded-full overflow-hidden">
          <motion.div
            className="progress-bar-fill h-full"
            style={{ 
              width: `${progress}%`,
              background: isWarning 
                ? 'linear-gradient(90deg, #f43f5e, #ef4444)' 
                : 'linear-gradient(90deg, #f59e0b, #f97316)'
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Timer;
