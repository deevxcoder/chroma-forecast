
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BetHistory, ColorType } from "@/utils/gameUtils";

interface GameHistoryProps {
  history: BetHistory[];
}

const GameHistory = ({ history }: GameHistoryProps) => {
  const [activeTab, setActiveTab] = useState<'history' | 'bets' | 'trend'>('history');
  
  const tabs = [
    { id: 'history', label: 'Game History' },
    { id: 'bets', label: 'My Bets' },
    { id: 'trend', label: 'Trend' }
  ];
  
  const getColorDot = (colors: ColorType | ColorType[]) => {
    if (!Array.isArray(colors)) {
      const colorMap: Record<string, string> = {
        red: "bg-game-red",
        green: "bg-game-green",
        violet: "bg-game-violet"
      };
      
      return <div className={`w-3 h-3 rounded-full ${colorMap[colors]}`}></div>;
    }
    
    // Handle multiple colors (violet + another color)
    return (
      <div className="flex -space-x-1">
        {colors.map((color, index) => {
          const colorMap: Record<string, string> = {
            red: "bg-game-red",
            green: "bg-game-green",
            violet: "bg-game-violet"
          };
          
          return (
            <div 
              key={index} 
              className={`w-3 h-3 rounded-full ${colorMap[color]} ${index === 0 ? 'z-10' : 'z-0'}`}
              style={{ marginLeft: index > 0 ? '-4px' : '0' }}
            ></div>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="flex border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'text-white tab-active' 
                  : 'text-white/50 hover:text-white/80'
              }`}
              onClick={() => setActiveTab(tab.id as 'history' | 'bets' | 'trend')}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'history' && (
              <div className="px-2 py-1">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-white/50 border-b border-white/10">
                      <th className="py-2 px-2 font-medium">Draw</th>
                      <th className="py-2 px-2 font-medium">Number</th>
                      <th className="py-2 px-2 font-medium">Big/Small</th>
                      <th className="py-2 px-2 font-medium">Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.length > 0 ? (
                      history.slice(0, 10).map((item) => (
                        <tr key={item.id} className="border-b border-white/5 text-white">
                          <td className="py-2 px-2 text-xs">{item.id.slice(-10)}</td>
                          <td className="py-2 px-2">{item.result}</td>
                          <td className="py-2 px-2">{item.result >= 5 ? 'Big' : 'Small'}</td>
                          <td className="py-2 px-2 flex justify-center">
                            {getColorDot(item.resultColor)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-4 text-center text-white/50">
                          No game history yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            
            {activeTab === 'bets' && (
              <div className="p-4 text-center text-white/70">
                <p>Your betting history will appear here</p>
              </div>
            )}
            
            {activeTab === 'trend' && (
              <div className="p-4 text-center text-white/70">
                <p>Game trend analytics will appear here</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GameHistory;
