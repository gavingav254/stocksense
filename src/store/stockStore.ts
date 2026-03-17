import create from 'zustand';
import { Stock, ChartData } from '@services/stockAPI';

interface StockState {
  stocks: Stock[];
  selectedStock: Stock | null;
  chartData: ChartData[];
  loading: boolean;
  error: string | null;
  
  setStocks: (stocks: Stock[]) => void;
  setSelectedStock: (stock: Stock | null) => void;
  setChartData: (data: ChartData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addStock: (stock: Stock) => void;
  removeStock: (symbol: string) => void;
  updateStock: (symbol: string, updates: Partial<Stock>) => void;
}

export const useStockStore = create<StockState>((set) => ({
  stocks: [],
  selectedStock: null,
  chartData: [],
  loading: false,
  error: null,

  setStocks: (stocks) => set({ stocks }),
  setSelectedStock: (stock) => set({ selectedStock: stock }),
  setChartData: (data) => set({ chartData: data }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  addStock: (stock) => set((state) => ({ 
    stocks: [...state.stocks, stock] 
  })),
  
  removeStock: (symbol) => set((state) => ({
    stocks: state.stocks.filter((s) => s.symbol !== symbol),
  })),
  
  updateStock: (symbol, updates) => set((state) => ({
    stocks: state.stocks.map((s) =>
      s.symbol === symbol ? { ...s, ...updates } : s
    ),
  })),
}));