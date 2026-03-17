import create from 'zustand';

interface UserPreferences {
  darkMode: boolean;
  currency: string;
  riskTolerance: 'low' | 'medium' | 'high';
  alertSettings: {
    volatilityThreshold: number;
    priceAlerts: boolean;
    newsAlerts: boolean;
  };
}

interface UserState {
  preferences: UserPreferences;
  watchlist: string[];
  
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  setWatchlist: (watchlist: string[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  preferences: {
    darkMode: true,
    currency: 'USD',
    riskTolerance: 'medium',
    alertSettings: {
      volatilityThreshold: 5,
      priceAlerts: true,
      newsAlerts: true,
    },
  },
  watchlist: [],

  updatePreferences: (prefs) =>
    set((state) => ({
      preferences: { ...state.preferences, ...prefs },
    })),

  addToWatchlist: (symbol) =>
    set((state) => ({
      watchlist: [...new Set([...state.watchlist, symbol])],
    })),

  removeFromWatchlist: (symbol) =>
    set((state) => ({
      watchlist: state.watchlist.filter((s) => s !== symbol),
    })),

  setWatchlist: (watchlist) => set({ watchlist }),
}));