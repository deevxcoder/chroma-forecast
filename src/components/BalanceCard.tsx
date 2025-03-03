
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
      className="w-full max-w-md mx-auto p-4 rounded-xl glass-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <div className="relative">
        <div className="absolute -right-4 -top-4 w-24 h-24 gold-gradient opacity-40 rounded-full blur-xl"></div>
        
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-5 h-5 text-white"
            >
              <circle cx="12" cy="12" r="8" />
              <path d="M9.5 9.5 14.5 14.5" />
              <path d="M14.5 9.5 9.5 14.5" />
            </svg>
          </div>
          <div>
            <p className="text-white/70 text-xs font-medium">Balance</p>
            <h3 className="text-white text-2xl font-bold flex items-center">
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
        
        <div className="grid grid-cols-2 gap-3 mt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-amber-600 text-white font-medium py-2 px-4 rounded-md"
            onClick={onRecharge}
          >
            Recharge
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/10 text-white font-medium py-2 px-4 rounded-md border border-white/20"
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
