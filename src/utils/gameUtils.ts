
export type ColorType = 'green' | 'red' | 'violet';
export type ColorOrSize = ColorType | 'big' | 'small';
export type BetAmount = 1 | 5 | 10 | 50 | 100;
export type GameNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface BetHistory {
  id: string;
  timestamp: number;
  result: GameNumber;
  userBet: ColorOrSize | GameNumber;
  betAmount: number;
  payout: number;
  isWin: boolean;
  resultColor: ColorType | ColorType[];
}

const COLOR_MAPPING: Record<GameNumber, ColorType | ColorType[]> = {
  0: ['violet', 'red'],
  1: 'green',
  2: 'red',
  3: 'green',
  4: 'red',
  5: ['violet', 'green'],
  6: 'red',
  7: 'green',
  8: 'red',
  9: 'green',
};

export const getNumberColor = (num: GameNumber): ColorType | ColorType[] => {
  return COLOR_MAPPING[num];
};

export const isBig = (num: GameNumber): boolean => {
  return num >= 5;
};

export const isSmall = (num: GameNumber): boolean => {
  return num < 5;
};

export const hasBet = (bet: ColorOrSize | GameNumber | null): boolean => {
  return bet !== null;
};

export const calculatePayout = (
  bet: ColorOrSize | GameNumber,
  result: GameNumber,
  amount: number
): { payout: number; isWin: boolean } => {
  // Get result color
  const resultColor = COLOR_MAPPING[result];
  
  // Check if bet is a color
  if (bet === 'red' || bet === 'green' || bet === 'violet') {
    // Check if resultColor contains the bet color
    const betMatches = Array.isArray(resultColor) 
      ? resultColor.includes(bet)
      : resultColor === bet;
      
    if (betMatches) {
      const multiplier = bet === 'violet' ? 4.5 : 2;
      return { payout: amount * multiplier, isWin: true };
    }
    return { payout: 0, isWin: false };
  }
  
  // Check if bet is big/small
  if (bet === 'big' && isBig(result)) {
    return { payout: amount * 2, isWin: true };
  }
  
  if (bet === 'small' && isSmall(result)) {
    return { payout: amount * 2, isWin: true };
  }
  
  // Check if bet is a number
  if (typeof bet === 'number' && bet === result) {
    return { payout: amount * 9, isWin: true };
  }
  
  return { payout: 0, isWin: false };
};

export const generateGameId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${timestamp}${random}`;
};

export const formatBalance = (balance: number): string => {
  return balance.toFixed(2);
};

export const randomResult = (): GameNumber => {
  return Math.floor(Math.random() * 10) as GameNumber;
};
