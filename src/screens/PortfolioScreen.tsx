import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { usePortfolioStore } from '@store/portfolioStore';
import { PortfolioCard } from '@components/PortfolioCard';
import { aiService } from '@services/aiService';

export const PortfolioScreen: React.FC = () => {
  const { portfolio, totalValue, calculateTotals } = usePortfolioStore();

  useEffect(() => {
    calculateTotals();
  }, [portfolio]);

  useEffect(() => {
    // Fetch AI recommendations for portfolio
    if (portfolio.length > 0) {
      aiService.analyzePortfolioRisk(portfolio).catch(console.error);
    }
  }, [portfolio]);

  return (
    <ScrollView style={styles.container}>
      {/* Portfolio Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Portfolio Value</Text>
        <Text style={styles.summaryValue}>${totalValue.toFixed(2)}</Text>
      </View>

      {/* Holdings List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Holdings</Text>
        {portfolio.length === 0 ? (
          <Text style={styles.emptyText}>No holdings yet. Add stocks to get started!</Text>
        ) : (
          portfolio.map((item) => <PortfolioCard key={item.symbol} item={item} />)
        )}
      </View>

      {/* Add Position Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Position</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 16,
  },
  summaryCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
  emptyText: {
    color: '#9CA3AF',
    textAlign: 'center',
    paddingVertical: 32,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
