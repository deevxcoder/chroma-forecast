
import { formatBalance } from "@/utils/gameUtils";
import { motion } from "framer-motion";
import { useState } from "react";

interface BalanceCardProps {
  balance: number;
  onRecharge: () => void;
  onWithdraw: () => void;
}

const BalanceCard = ({ balance, onRecharge, onWithdraw }: BalanceCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <motion.div
      className="w-full max-w-md mx-auto p-5 rounded-xl glass-card overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <div className="relative">
        <div className="absolute -right-4 -top-4 w-24 h-24 gold-gradient opacity-40 rounded-full blur-xl"></div>
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-game-violet/20 rounded-full blur-xl"></div>
        
        <div className="flex items-center gap-4 mb-3">
          <motion.div 
            className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center shadow-lg"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-6 h-6 text-white"
            >
              <circle cx="12" cy="12" r="8" />
              <path d="M9.5 9.5 14.5 14.5" />
              <path d="M14.5 9.5 9.5 14.5" />
            </svg>
          </motion.div>
          <div>
            <p className="text-white/70 text-xs font-medium">Your Balance</p>
            <h3 className="text-white text-3xl font-bold flex items-center">
              € {formatBalance(balance)}
              <motion.span 
                className="ml-2"
                animate={{ rotate: isHovering ? 180 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-white/40"
                >
                  <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
                  <path d="M12 2a10 10 0 0 1 10 10H12V2Z" />
                  <path d="M12 22v-10h10" />
                </svg>
              </motion.span>
            </h3>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(245, 158, 11, 1)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium py-2.5 px-4 rounded-md shadow-md"
            onClick={onRecharge}
          >
            Recharge
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/10 text-white font-medium py-2.5 px-4 rounded-md border border-white/20 shadow-md"
            onClick={onWithdraw}
          >
            Withdraw
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default BalanceCard;
