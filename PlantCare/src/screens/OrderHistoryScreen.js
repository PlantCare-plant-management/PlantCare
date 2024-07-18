import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await SecureStore.getItemAsync('access_token');
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/plantMarket/history-order`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.plant.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.plant.name}</Text>
        <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        <Text style={styles.amount}>Rp {item.amount.toLocaleString()}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      )}
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
    flexDirection: 'row',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  info: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  amount: {
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
