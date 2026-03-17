import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { useStockStore } from '@store/stockStore';
import { usePortfolioStore } from '@store/portfolioStore';
import { useUserStore } from '@store/userStore';
import { StockCard } from '@components/StockCard';
import { stockAPI } from '@services/stockAPI';

export const DashboardScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { portfolio, totalValue, totalGainLoss, totalGainLossPercent } = usePortfolioStore();
  const { loading } = useStockStore();
  const { preferences } = useUserStore();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      // Fetch updated portfolio data
      await Promise.all(
        portfolio.map((item) => stockAPI.getCurrentPrice(item.symbol))
      );
    } catch (error) {
      console.error('Error refreshing portfolio:', error);
    }
    setRefreshing(false);
  }, [portfolio]);

  const gainLossColor = totalGainLoss >= 0 ? '#10B981' : '#EF4444';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: preferences.darkMode ? '#111827' : '#FFFFFF' }]} 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Portfolio Overview Card */}
      <View style={styles.overviewCard}>
        <Text style={styles.overviewLabel}>Portfolio Value</Text>
        <Text style={styles.overviewValue}>${totalValue.toFixed(2)}</Text>
        <Text style={[styles.overviewGainLoss, { color: gainLossColor }]}> 
          {totalGainLoss >= 0 ? '+' : ''}{totalGainLoss.toFixed(2)} ({totalGainLossPercent.toFixed(2)}%)
        </Text>
      </View>

      {/* Holdings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Holdings</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#3B82F6" style={styles.loader} />
        ) : (
          portfolio.map((item) => (
            <StockCard
              key={item.symbol}
              stock={{
                symbol: item.symbol,
                name: item.symbol,
                price: item.currentPrice,
                change: item.gainLoss,
                changePercent: item.gainLossPercent,
                timestamp: Date.now(),
              }}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 16,
  },
  overviewCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  overviewLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  overviewValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  overviewGainLoss: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  loader: {
    marginVertical: 20,
  },
});
