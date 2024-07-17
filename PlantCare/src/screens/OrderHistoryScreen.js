import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const orders = [
  { id: '1', date: '2024-07-14', total: 'Rp119.000', status: 'Completed' },
];

const OrderHistoryScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.total}>{item.total}</Text>
      <Text style={styles.status}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  item: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    color: 'green',
    marginTop: 4,
  },
});

export default OrderHistoryScreen;
