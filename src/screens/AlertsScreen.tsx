import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AlertBanner } from '@components/AlertBanner';
import alertManager, { Alert } from '@utils/alertManager';

export const AlertsScreen: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Listen for new alerts
    const handleNewAlert = (alert: Alert) => {
      setAlerts((prev) => [alert, ...prev]);
    };

    alertManager.addListener(handleNewAlert);
    setAlerts(alertManager.getAlerts());

    return () => {
      alertManager.removeListener(handleNewAlert);
    };
  }, []);

  const handleDismiss = (alertId: string) => {
    alertManager.markAsRead(alertId);
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alerts</Text>
        {alerts.length > 0 && (
          <TouchableOpacity onPress={() => setAlerts([])}>
            <Text style={styles.clearButton}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {alerts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No alerts yet</Text>
          <Text style={styles.emptySubtext}>You'll be notified when volatility or price changes occur</Text>
        </View>
      ) : (
        alerts.map((alert) => (
          <AlertBanner
            key={alert.id}
            alert={alert}
            onDismiss={() => handleDismiss(alert.id)}
          />
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  clearButton: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
});
