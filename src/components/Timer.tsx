
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimerProps {
  duration: number;
  onComplete: () => void;
  gameId: string;
  isProcessing: boolean;
  lastResult: number | null;
  selectedBet: any;
  payout?: number;
  betAmount?: number;
}

const Timer = ({ 
  duration, 
  onComplete, 
  gameId, 
  isProcessing, 
  lastResult, 
  selectedBet,
  payout = 0,
  betAmount = 0
}: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(100);
  const [showCountdown, setShowCountdown] = useState(false);
  
  useEffect(() => {
    setTimeLeft(duration);
    setProgress(100);
    setShowCountdown(false);
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        // Check if we need to show the countdown popup
        if (prev === 6) {
          setShowCountdown(true);
        }
        
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
      className="w-full max-w-md mx-auto relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Timer Card */}
      <div className="glass-card rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg overflow-hidden">
        {/* Timer Display */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="px-2 py-1 bg-white/10 rounded text-xs font-medium text-white/70 backdrop-blur-sm">
              {duration < 60 ? `${duration}s` : `${Math.floor(duration/60)}m`}
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
          
          <div className="progress-bar h-2 bg-gray-200/20 rounded-full overflow-hidden">
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
      </div>
      
      {/* Countdown Popup */}
      <AnimatePresence>
        {showCountdown && !isProcessing && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-zinc-800/90 border border-white/10 rounded-xl p-8 backdrop-blur-xl shadow-xl flex flex-col items-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <p className="text-white/80 text-lg mb-2">Drawing in</p>
              <motion.div 
                className="text-7xl font-bold text-white mb-4"
                animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                {seconds}
              </motion.div>
              <p className="text-white/60 text-sm">Get ready for results</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Results Popup */}
      <AnimatePresence>
        {isProcessing && lastResult !== null && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={`rounded-xl p-8 backdrop-blur-xl shadow-xl flex flex-col items-center
                border-2 ${selectedBet !== null && payout > 0 
                ? 'bg-emerald-900/40 border-emerald-500/50' 
                : 'bg-rose-900/40 border-rose-500/50'}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <p className={`text-xl font-bold mb-6 ${selectedBet !== null && payout > 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                {selectedBet !== null && payout > 0 ? 'You Won!' : 'You Lost'}
              </p>
              
              <div className="bg-zinc-800/80 rounded-full w-24 h-24 flex items-center justify-center mb-6">
                <motion.div
                  className="text-4xl font-bold text-white"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0, -10, 0],
                  }}
                  transition={{ duration: 1.5 }}
                >
                  {lastResult}
                </motion.div>
              </div>
              
              {selectedBet !== null && (
                <div className="text-center">
                  {payout > 0 ? (
                    <motion.p 
                      className="text-2xl font-bold text-emerald-300 mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      +€{payout.toFixed(2)}
                    </motion.p>
                  ) : (
                    <motion.p 
                      className="text-2xl font-bold text-rose-300 mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      -€{betAmount.toFixed(2)}
                    </motion.p>
                  )}
                </div>
              )}
              
              <p className="text-white/60 text-sm mt-4">Next round starting soon...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Timer;
