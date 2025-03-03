
import { GameNumber, getNumberColor } from "@/utils/gameUtils";
import { motion } from "framer-motion";

interface NumberButtonProps {
  number: GameNumber;
  isSelected: boolean;
  onClick: () => void;
}

const getButtonColors = (number: GameNumber, isSelected: boolean) => {
  const colors = getNumberColor(number);
  
  // Single color case
  if (!Array.isArray(colors)) {
    const colorMap: Record<string, any> = {
      red: {
        bg: "bg-gradient-to-br from-rose-400 to-rose-600",
        shadow: "rgba(244,63,94,0.7)"
      },
      green: {
        bg: "bg-gradient-to-br from-emerald-400 to-emerald-600",
        shadow: "rgba(16,185,129,0.7)"
      },
      violet: {
        bg: "bg-gradient-to-br from-violet-400 to-violet-600",
        shadow: "rgba(139,92,246,0.7)"
      }
    };
    
    return {
      background: colorMap[colors].bg,
      shadow: isSelected ? `0 0 15px ${colorMap[colors].shadow}` : "none",
      scale: isSelected ? 1.05 : 1
    };
  }
  
  // Multiple colors case (violet + another color)
  const primaryColor = colors[0] === "violet" ? colors[1] : colors[0];
  const violetGradient = "from-violet-500 via-violet-400";
  const secondGradient = primaryColor === "red" ? "to-rose-500" : "to-emerald-500";
  
  return {
    background: `bg-gradient-to-br ${violetGradient} ${secondGradient}`,
    shadow: isSelected ? `0 0 15px rgba(139,92,246,0.7)` : "none",
    scale: isSelected ? 1.05 : 1
  };
};

const NumberButton = ({ number, isSelected, onClick }: NumberButtonProps) => {
  const { background, shadow, scale } = getButtonColors(number, isSelected);
  
  return (
    <motion.button
      className={`number-button focus:outline-none ${background}`}
      style={{ 
        boxShadow: shadow,
        transform: `scale(${scale})`
      }}
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: scale }}
      transition={{ duration: 0.3 }}
    >
      {isSelected && (
        <motion.div 
          className="absolute inset-0 rounded-full bg-white/20"
          animate={{ 
            opacity: [0, 0.3, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      )}
      <div className="number-button-inner bg-white/10 backdrop-blur-sm text-white">
        {number}
      </div>
    </motion.button>
  );
};

export default NumberButton;
