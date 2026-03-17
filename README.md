# StockSense - Mobile Stock Trading App

A modern, AI-powered mobile application for tracking stocks, managing your investment portfolio, and receiving intelligent market insights.

## Features

✨ **Core Features**
- 📊 **Real-Time Stock Prices & Charts** - Live price updates with interactive charts
- 💼 **Portfolio Tracker** - Manage your stock holdings with buy/sell/hold recommendations
- 🤖 **AI Market Analysis** - AI-powered explanations of market trends and stock movements
- ⚠️ **Volatility Alerts** - Get notified when stocks experience significant price swings
- 📈 **Risk Analysis** - Personalized risk assessment for your portfolio

🎨 **Design**
- Dark mode-friendly modern finance dashboard
- Clean and minimal UI with excellent mobile responsiveness
- Intuitive navigation and user-friendly interface

## Tech Stack

### Frontend
- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe code
- **React Navigation** - Navigation library
- **Zustand** - State management
- **React Native Chart Kit** - Interactive charts and visualizations

### Backend & Services
- **Axios** - HTTP client for API calls
- **WebSocket** - Real-time data streaming
- **AI APIs** - Third-party AI services for market analysis

### Development Tools
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Project Structure

```
stocksense/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── StockCard.tsx
│   │   ├── PortfolioCard.tsx
│   │   └── AlertBanner.tsx
│   ├── screens/             # Screen components
│   │   ├── DashboardScreen.tsx
│   │   ├── PortfolioScreen.tsx
│   │   └── AlertsScreen.tsx
│   ├── services/            # API and external services
│   │   ├── stockAPI.ts
│   │   └── aiService.ts
│   ├── store/               # Zustand state stores
│   │   ├── stockStore.ts
│   │   ├── portfolioStore.ts
│   │   └── userStore.ts
│   ├── utils/               # Utility functions
│   │   └── alertManager.ts
│   └── App.tsx              # Main app component
├── package.json
├── tsconfig.json
├── app.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- React Native development environment setup

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gavingav254/stocksense.git
cd stocksense
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Update `.env` with your API keys:
```
REACT_APP_STOCK_API_KEY=your_api_key_here
REACT_APP_AI_API_KEY=your_ai_api_key_here
REACT_APP_WS_URL=your_websocket_url_here
```

### Running the App

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

**Web:**
```bash
npm run web
```

## Development

### Code Quality

**Run linter:**
```bash
npm run lint
```

**Format code:**
```bash
npm run format
```

**Run tests:**
```bash
npm test
```

## Features Roadmap

### Phase 1 (Current)
- ✅ Project setup and configuration
- ✅ UI component library
- ⏳ Real-time stock price integration
- ⏳ Portfolio management

### Phase 2
- ⏳ AI market analysis integration
- ⏳ Advanced charting and technical analysis
- ⏳ Volatility alert system

### Phase 3
- ⏳ Social features (share portfolios, follow traders)
- ⏳ Advanced risk modeling
- ⏳ Educational content and tutorials

## API Integration

### Stock Price API
The app integrates with real-time stock price APIs. Update the `API_BASE_URL` in `src/services/stockAPI.ts` with your chosen provider (e.g., Alpha Vantage, IEX Cloud, etc.).

### AI Service
AI-powered market analysis is provided through the `aiService`. Configure your AI API provider in `src/services/aiService.ts`.

### WebSocket Streaming
Real-time price updates are streamed via WebSocket. Configure the `WS_URL` in your environment variables.

## Contributing

We welcome contributions! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## Issues & GitHub Tracking

This project is organized using GitHub Issues. The following features are tracked:

- [#1 - Personalized Risk Analysis](https://github.com/gavingav254/stocksense/issues/1)
- [#2 - Real-Time Stock Prices and Charts](https://github.com/gavingav254/stocksense/issues/2)
- [#3 - Portfolio Tracker with Buy/Sell/Hold Recommendations](https://github.com/gavingav254/stocksense/issues/3)
- [#4 - AI-Powered Market Trend Explanations](https://github.com/gavingav254/stocksense/issues/4)
- [#5 - High Volatility Alerts](https://github.com/gavingav254/stocksense/issues/5)
- [#6 - Modern Finance Dashboard UI](https://github.com/gavingav254/stocksense/issues/6)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues, please open a GitHub issue or reach out to the maintainers.

---

**Built with ❤️ for investors and traders**