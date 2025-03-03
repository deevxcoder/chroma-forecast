
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
    <div className="min-h-screen relative px-4 py-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-game-violet/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-game-red/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-game-green/20 rounded-full blur-[100px]"></div>
      </div>
      
      <header className="mb-8 relative">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="relative inline-block">
            <h1 className="text-4xl font-bold gold-text tracking-wider">CHROMA</h1>
            <motion.div 
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-game-gold/30 via-game-gold to-game-gold/30"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
          </div>
          <p className="text-white/60 text-sm mt-1">Color Prediction Game</p>
        </motion.div>
      </header>
      
      <main className="relative z-10">
        <ColorPrediction />
      </main>
      
      <footer className="mt-12 text-center text-white/40 text-xs">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          Demo version for entertainment purposes only
        </motion.p>
      </footer>
    </div>
  );
};

export default Index;
