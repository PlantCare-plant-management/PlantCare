import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

const MyPlantScreen = () => {
  const navigation = useNavigation();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const URL = process.env.EXPO_PUBLIC_API_URL

  const fetchMyPlants = async () => {
    try {
      const token = await SecureStore.getItemAsync('access_token');
      const userId = await SecureStore.getItemAsync('user_id');
      console.log(userId);
      const response = await fetch(`${URL}/myplants/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });

      const result = await response.json();
      console.log(result);
      setPlants(result);
    } catch (error) {
      console.error("Error fetching my plants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPlants();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchMyPlants();
    }, [])
  );

  const [filter, setFilter] = useState("All plants");

  const filteredPlants =
    filter === "All plants"
      ? plants
      : plants.filter((plant) => plant.location === filter);

  if (loading) {
    return <ActivityIndicator size="large" color="#4CAF50" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.date}>Wednesday, 10 July 2024</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "All plants" && styles.selectedFilter,
          ]}
          onPress={() => setFilter("All plants")}
        >
          <Text style={styles.filterText}>All plants</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "Bedroom" && styles.selectedFilter,
          ]}
          onPress={() => setFilter("Bedroom")}
        >
          <Text style={styles.filterText}>Bedroom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "Kitchen" && styles.selectedFilter,
          ]}
          onPress={() => setFilter("Kitchen")}
        >
          <Text style={styles.filterText}>Kitchen</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredPlants}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.plantItem}
            onPress={() =>
              navigation.navigate("PlantInfo", { plantId: item._id })
            }
          >
            <View style={styles.plantInfo}>
              <Text style={styles.plantName}>{item.name}</Text>
              <Text style={styles.plantDate}>Date planted: {item.date}</Text>
            </View>
            <View style={styles.plantPhotoContainer}>
              <Text style={styles.plantPhotoText}>Foto Tanaman</Text>
            </View>
          </TouchableOpacity>
        )}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  date: {
    fontSize: 16,
    color: "#888",
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  filterButton: {
    padding: 8,
    marginRight: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  selectedFilter: {
    backgroundColor: "#a0e0a0",
  },
  filterText: {
    fontSize: 16,
    color: "#333",
  },
  plantItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  plantInfo: {
    flex: 1,
  },
  plantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  plantDate: {
    fontSize: 14,
    color: "#666",
  },
  plantPhotoContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#d0d0d0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  plantPhotoText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    padding: 16,
    backgroundColor: "#4caf50",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MyPlantScreen;