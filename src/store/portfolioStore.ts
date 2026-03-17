import create from 'zustand';

export interface PortfolioItem {
  symbol: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
  totalValue: number;
  gainLoss: number;
  gainLossPercent: number;
  recommendation?: 'buy' | 'sell' | 'hold';
}

interface PortfolioState {
  portfolio: PortfolioItem[];
  totalValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  
  addPosition: (item: PortfolioItem) => void;
  removePosition: (symbol: string) => void;
  updatePosition: (symbol: string, updates: Partial<PortfolioItem>) => void;
  getPosition: (symbol: string) => PortfolioItem | undefined;
  calculateTotals: () => void;
  setPortfolio: (portfolio: PortfolioItem[]) => void;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  portfolio: [],
  totalValue: 0,
  totalGainLoss: 0,
  totalGainLossPercent: 0,

  addPosition: (item) =>
    set((state) => {
      const updated = [...state.portfolio, item];
      return { portfolio: updated };
    }),

  removePosition: (symbol) =>
    set((state) => ({
      portfolio: state.portfolio.filter((p) => p.symbol !== symbol),
    })),

  updatePosition: (symbol, updates) =>
    set((state) => ({
      portfolio: state.portfolio.map((p) =>
        p.symbol === symbol ? { ...p, ...updates } : p
      ),
    })),

  getPosition: (symbol) => {
    const state = get();
    return state.portfolio.find((p) => p.symbol === symbol);
  },

  calculateTotals: () =>
    set((state) => {
      const totalValue = state.portfolio.reduce((sum, p) => sum + p.totalValue, 0);
      const totalGainLoss = state.portfolio.reduce((sum, p) => sum + p.gainLoss, 0);
      const totalGainLossPercent = totalValue > 0 ? (totalGainLoss / totalValue) * 100 : 0;

      return { totalValue, totalGainLoss, totalGainLossPercent };
    }),

  setPortfolio: (portfolio) => set({ portfolio }),
}));