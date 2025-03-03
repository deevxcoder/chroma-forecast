
import { useEffect } from "react";
import { motion } from "framer-motion";
import ColorPrediction from "@/components/ColorPrediction";

const Index = () => {
  useEffect(() => {
    // Add a class to the body for global styling
    document.body.classList.add("bg-zinc-900");
    
    return () => {
      document.body.classList.remove("bg-zinc-900");
    };
  }, []);
  
  return (
    <div className="min-h-screen px-4 py-8">
      <header className="mb-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-3xl font-bold gold-text">CHROMA</h1>
          <p className="text-white/60 text-sm mt-1">Color Prediction Game</p>
        </motion.div>
      </header>
      
      <main>
        <ColorPrediction />
      </main>
      
      <footer className="mt-8 text-center text-white/40 text-xs">
        <p>Demo version for entertainment purposes only</p>
      </footer>
    </div>
  );
};

export default Index;
