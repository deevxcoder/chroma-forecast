
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
    const colorMap: Record<string, string> = {
      red: "#e74c3c",
      green: "#2ecc71",
      violet: "#9b59b6"
    };
    
    return {
      background: colorMap[colors],
      shadow: isSelected ? `0 0 15px ${colorMap[colors]}` : "none",
      scale: isSelected ? 1.05 : 1
    };
  }
  
  // Multiple colors case (violet + another color)
  const primaryColor = colors[0] === "violet" ? colors[1] : colors[0];
  const primaryColorHex = primaryColor === "red" ? "#e74c3c" : "#2ecc71";
  const secondaryColorHex = "#9b59b6"; // violet
  
  return {
    background: `linear-gradient(135deg, ${primaryColorHex}, ${secondaryColorHex})`,
    shadow: isSelected ? `0 0 15px rgba(155, 89, 182, 0.7)` : "none",
    scale: isSelected ? 1.05 : 1
  };
};

const NumberButton = ({ number, isSelected, onClick }: NumberButtonProps) => {
  const { background, shadow, scale } = getButtonColors(number, isSelected);
  
  return (
    <motion.button
      className="number-button focus:outline-none"
      style={{ 
        background, 
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
      <div className="number-button-inner bg-white/10 backdrop-blur-sm text-white">
        {number}
      </div>
    </motion.button>
  );
};

export default NumberButton;
