import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FormatRupiah } from "../helper/FormatRupiah";

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await SecureStore.getItemAsync("access_token");
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/plantMarket/history-order`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderStatusUpdate = async (orderId) => {
    setUpdatingOrderId(orderId);
    try {
      const token = await SecureStore.getItemAsync("access_token");
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/plantMarket/order/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "Success" }),
        }
      );

      if (response.ok) {
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, status: "Success" } : order
          )
        );
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status", error);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => handleExpand(item._id)}>
        <View style={styles.header}>
          <Image source={{ uri: item.plant.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.plant.name}</Text>
            <Text style={styles.status}>{item.status}</Text>
            <Text style={styles.amount}>
              Total: {FormatRupiah(item.amount)}
            </Text>
          </View>
          <Ionicons
            name={expandedOrderId === item._id ? "chevron-up" : "chevron-down"}
            size={24}
            color="black"
          />
        </View>
      </TouchableOpacity>
      {expandedOrderId === item._id && (
        <View style={styles.details}>
          <Text style={styles.detailHeader}>Order Details:</Text>
          <View style={styles.detailRow}>
            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Date:</Text>
              <Text style={styles.detailValue}>
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Payment:</Text>
              <Text style={styles.detailValue}>{item.payment}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Quantity</Text>
              <Text style={styles.detailValue}>{item.quantity}</Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Unit Price:</Text>
              <Text style={styles.detailValue}>
                {FormatRupiah(item.plant.price)}
              </Text>
            </View>
          </View>
          <View style={styles.actions}>
            {item.status === "Process" ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleOrderStatusUpdate(item._id)}
              >
                {updatingOrderId === item._id ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Order Received</Text>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("Planting Guide", {
                    plantId: item.plant.plantId,
                  })
                }
              >
                <Text style={styles.buttonText}>Start Planting</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8BC34A" />
        </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  item: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  info: {
    marginLeft: 16,
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    color: "green",
    marginTop: 4,
  },
  details: {
    marginTop: 16,
  },
  detailHeader: {
    fontSize: 14,
    fontWeight: "bold",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailColumn: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  detailValue: {
    fontSize: 13,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 10,
    width: "100%",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
});

export default OrderHistoryScreen;
