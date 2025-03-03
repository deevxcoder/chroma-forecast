
import { ColorType } from "@/utils/gameUtils";
import { motion } from "framer-motion";

interface ColorButtonProps {
  color: ColorType;
  isSelected: boolean;
  onClick: () => void;
}

const colorConfig = {
  green: {
    background: "bg-emerald-500",
    gradient: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]",
    activeGlow: "shadow-[0_0_20px_rgba(16,185,129,0.7)]",
    text: "text-white"
  },
  red: {
    background: "bg-rose-500",
    gradient: "bg-gradient-to-br from-rose-400 to-rose-600",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(244,63,94,0.5)]",
    activeGlow: "shadow-[0_0_20px_rgba(244,63,94,0.7)]",
    text: "text-white"
  },
  violet: {
    background: "bg-violet-500",
    gradient: "bg-gradient-to-br from-violet-400 to-violet-600",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]",
    activeGlow: "shadow-[0_0_20px_rgba(139,92,246,0.7)]",
    text: "text-white"
  }
};

const ColorButton = ({ color, isSelected, onClick }: ColorButtonProps) => {
  const config = colorConfig[color];
  
  return (
    <motion.button
      className={`${isSelected ? config.gradient : config.background} ${config.text} ${config.hoverGlow} 
                 ${isSelected ? config.activeGlow : ''}
                 relative overflow-hidden py-2 px-6 rounded-md font-semibold transition-all duration-300`}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      {isSelected && (
        <motion.div 
          className="absolute inset-0 bg-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
        />
      )}
      {color.charAt(0).toUpperCase() + color.slice(1)}
    </motion.button>
  );
};

export default ColorButton;
