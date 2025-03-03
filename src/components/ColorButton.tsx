
import { ColorType } from "@/utils/gameUtils";
import { motion } from "framer-motion";

interface ColorButtonProps {
  color: ColorType;
  isSelected: boolean;
  onClick: () => void;
}

const colorConfig = {
  green: {
    background: "bg-game-green",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(46,204,113,0.5)]",
    activeGlow: "shadow-[0_0_20px_rgba(46,204,113,0.7)]",
    text: "text-white"
  },
  red: {
    background: "bg-game-red",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(231,76,60,0.5)]",
    activeGlow: "shadow-[0_0_20px_rgba(231,76,60,0.7)]",
    text: "text-white"
  },
  violet: {
    background: "bg-game-violet",
    hoverGlow: "hover:shadow-[0_0_15px_rgba(155,89,182,0.5)]",
    activeGlow: "shadow-[0_0_20px_rgba(155,89,182,0.7)]",
    text: "text-white"
  }
};

const ColorButton = ({ color, isSelected, onClick }: ColorButtonProps) => {
  const config = colorConfig[color];
  
  return (
    <motion.button
      className={`${config.background} ${config.text} ${config.hoverGlow} 
                 ${isSelected ? config.activeGlow : ''}
                 py-2 px-6 rounded-md font-semibold transition-all duration-300`}
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
      {color.charAt(0).toUpperCase() + color.slice(1)}
    </motion.button>
  );
};

export default ColorButton;
