import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BalanceCard from "./BalanceCard";
import Timer from "./Timer";
import ColorButton from "./ColorButton";
import NumberButton from "./NumberButton";
import GameHistory from "./GameHistory";
import { 
  BetAmount, 
  BetHistory, 
  ColorOrSize, 
  ColorType, 
  GameNumber, 
  calculatePayout, 
  formatBalance, 
  generateGameId, 
  randomResult 
} from "@/utils/gameUtils";
import { toast } from "@/components/ui/use-toast";

const GAME_DURATION = 60; // 1 minute default
const INITIAL_BALANCE = 100;

const ColorPrediction = () => {
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [gameId, setGameId] = useState(generateGameId());
  const [selectedColor, setSelectedColor] = useState<ColorType | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<GameNumber | null>(null);
  const [selectedSize, setSelectedSize] = useState<'big' | 'small' | null>(null);
  const [betAmount, setBetAmount] = useState<BetAmount>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [gameHistory, setGameHistory] = useState<BetHistory[]>([]);
  const [lastResult, setLastResult] = useState<GameNumber | null>(null);
  const [duration, setDuration] = useState(GAME_DURATION);
  const [lastPayout, setLastPayout] = useState(0);
  
  const getSelectedBet = (): ColorOrSize | GameNumber | null => {
    if (selectedColor) return selectedColor;
    if (selectedSize) return selectedSize;
    if (selectedNumber !== null) return selectedNumber;
    return null;
  };
  
  const startNewRound = () => {
    setGameId(generateGameId());
    setSelectedColor(null);
    setSelectedNumber(null);
    setSelectedSize(null);
    setLastResult(null);
    setLastPayout(0);
  };
  
  const handleGameComplete = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const result = randomResult();
      setLastResult(result);
      
      processBet(result);
      
      setTimeout(() => {
        startNewRound();
        setIsProcessing(false);
      }, 3000);
    }, 1000);
  };
  
  const processBet = (result: GameNumber) => {
    let userBet: ColorOrSize | GameNumber | null = null;
    
    if (selectedColor) userBet = selectedColor;
    else if (selectedSize) userBet = selectedSize;
    else if (selectedNumber !== null) userBet = selectedNumber;
    
    if (userBet === null) return;
    
    const { payout, isWin } = calculatePayout(userBet, result, betAmount);
    
    setLastPayout(isWin ? payout : 0);
    
    setBalance((prev) => prev + payout - betAmount);
    
    const historyEntry: BetHistory = {
      id: gameId,
      timestamp: Date.now(),
      result,
      userBet,
      betAmount,
      payout,
      isWin,
      resultColor: result === 0 ? ['violet', 'red'] : 
                  result === 5 ? ['violet', 'green'] : 
                  result % 2 === 0 ? 'red' : 'green'
    };
    
    setGameHistory((prev) => [historyEntry, ...prev]);
    
    if (isWin) {
      toast({
        title: "You won!",
        description: `Congratulations! You won €${formatBalance(payout)}`,
        variant: "default",
      });
    } else {
      toast({
        title: "Better luck next time",
        description: `You lost €${formatBalance(betAmount)}`,
        variant: "destructive",
      });
    }
  };
  
  const handleBetAmountSelect = (amount: BetAmount) => {
    if (balance < amount) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough balance for this bet",
        variant: "destructive",
      });
      return;
    }
    
    setBetAmount(amount);
  };
  
  const handleColorSelect = (color: ColorType) => {
    if (isProcessing) return;
    if (balance < betAmount) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough balance for this bet",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedColor(selectedColor === color ? null : color);
    setSelectedNumber(null);
    setSelectedSize(null);
  };
  
  const handleNumberSelect = (num: GameNumber) => {
    if (isProcessing) return;
    if (balance < betAmount) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough balance for this bet",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedNumber(selectedNumber === num ? null : num);
    setSelectedColor(null);
    setSelectedSize(null);
  };
  
  const handleSizeSelect = (size: 'big' | 'small') => {
    if (isProcessing) return;
    if (balance < betAmount) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough balance for this bet",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedSize(selectedSize === size ? null : size);
    setSelectedColor(null);
    setSelectedNumber(null);
  };
  
  const handleTimeSlotSelect = (seconds: number) => {
    setDuration(seconds);
  };
  
  const handleRecharge = () => {
    setBalance((prev) => prev + 100);
    toast({
      title: "Balance recharged",
      description: "Successfully added €100 to your balance",
    });
  };
  
  const handleWithdraw = () => {
    toast({
      title: "Withdrawal requested",
      description: "Withdrawal functionality is not implemented in this demo",
    });
  };
  
  const numberButtons: GameNumber[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  const betMultipliers: BetAmount[] = [1, 5, 10, 50, 100];
  
  return (
    <div className="w-full max-w-md mx-auto pb-10">
      <BalanceCard 
        balance={balance} 
        onRecharge={handleRecharge} 
        onWithdraw={handleWithdraw}
      />
      
      <div className="my-6">
        <div className="flex justify-between items-center mb-2">
          <div className="h-[2px] flex-1 bg-white/5"></div>
          <div className="px-4">
            <div className="flex space-x-2">
              {[1, 3, 5, 10].map((min) => (
                <div 
                  key={min}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs
                    ${min === 1 ? 'bg-game-gold text-black font-semibold' : 'bg-white/10 text-white/70'}
                  `}
                >
                  {min} min
                </div>
              ))}
            </div>
          </div>
          <div className="h-[2px] flex-1 bg-white/5"></div>
        </div>
      </div>
      
      <Timer
        duration={duration}
        onComplete={handleGameComplete}
        gameId={gameId}
        isProcessing={isProcessing}
        lastResult={lastResult}
        selectedBet={getSelectedBet()}
        payout={lastPayout}
        betAmount={betAmount}
      />
      
      {isProcessing && lastResult !== null && (
        <motion.div
          className="my-8 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p className="text-white/70 text-sm mb-2">Result</p>
          <div className="relative">
            <NumberButton
              number={lastResult}
              isSelected={true}
              onClick={() => {}}
            />
            <motion.div
              className="absolute inset-0"
              animate={{ 
                boxShadow: ['0 0 20px rgba(255,255,255,0.5)', '0 0 40px rgba(255,255,255,0.8)', '0 0 20px rgba(255,255,255,0.5)'] 
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
      
      <div className="my-6">
        <div className="flex justify-center gap-3 mb-6">
          <ColorButton
            color="green"
            isSelected={selectedColor === 'green'}
            onClick={() => handleColorSelect('green')}
          />
          <ColorButton
            color="violet"
            isSelected={selectedColor === 'violet'}
            onClick={() => handleColorSelect('violet')}
          />
          <ColorButton
            color="red"
            isSelected={selectedColor === 'red'}
            onClick={() => handleColorSelect('red')}
          />
        </div>
        
        <div className="grid grid-cols-5 gap-3 mb-6">
          {numberButtons.map((num) => (
            <NumberButton
              key={num}
              number={num}
              isSelected={selectedNumber === num}
              onClick={() => handleNumberSelect(num)}
            />
          ))}
        </div>
        
        <div className="flex gap-3 justify-center mb-8">
          {['random', 'x1', 'x5', 'x10', 'x50', 'x100'].map((option) => (
            <motion.button
              key={option}
              className="bg-white/10 text-white/90 text-xs font-medium py-1 px-3 rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {option}
            </motion.button>
          ))}
        </div>
        
        <div className="flex justify-center gap-3 mb-6">
          <motion.button
            className={`flex-1 py-3 px-4 rounded-md font-medium text-white
                      ${selectedSize === 'big' ? 'bg-gradient-to-r from-purple-500 to-indigo-600' : 'bg-white/10'}
                      transition-all duration-300`}
            onClick={() => handleSizeSelect('big')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Big
          </motion.button>
          <motion.button
            className={`flex-1 py-3 px-4 rounded-md font-medium text-white
                      ${selectedSize === 'small' ? 'bg-gradient-to-r from-blue-500 to-cyan-600' : 'bg-white/10'}
                      transition-all duration-300`}
            onClick={() => handleSizeSelect('small')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Small
          </motion.button>
        </div>
        
        <div className="glass-card rounded-xl p-4 mb-6">
          <p className="text-white/70 text-sm mb-3 text-center">Bet Amount</p>
          <div className="flex justify-between gap-2">
            {betMultipliers.map((amount) => (
              <motion.button
                key={amount}
                className={`py-2 px-4 rounded-md font-medium text-sm
                           ${betAmount === amount 
                              ? 'bg-game-gold text-black' 
                              : 'bg-white/10 text-white'}`}
                onClick={() => handleBetAmountSelect(amount)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={balance < amount}
              >
                {amount}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      
      <GameHistory history={gameHistory} />
    </div>
  );
};

export default ColorPrediction;
