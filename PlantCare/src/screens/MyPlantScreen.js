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
import Icon from 'react-native-vector-icons/FontAwesome';

const MyPlantScreen = () => {
  const navigation = useNavigation();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true); 
  const URL = process.env.EXPO_PUBLIC_API_URL;

  const fetchMyPlants = async () => {
    try {
      const token = await SecureStore.getItemAsync('access_token');
      const response = await fetch(`${URL}/myplants`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      const result = await response.json();
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

  const getActionIcon = (actionName) => {
    switch (actionName) {
      case 'Watering':
        return 'tint';
      case 'Lighting':
        return 'sun-o';
      case 'Fertilizing':
        return 'leaf';
      case 'Pruning dead leaves':
      case 'Monitor plant health':
        return 'heartbeat';
      default:
        return 'circle';
    }
  };

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
              <View style={styles.actionsContainer}>
                {item.actions
                  .filter(action => action.show)
                  .map(action => (
                    <View
                      key={action.id}
                      style={[
                        styles.action,
                        action.status ? styles.actionDone : styles.actionPending,
                      ]}
                    >
                      <Icon name={getActionIcon(action.name)} size={20} color="#000" />
                      <Text style={styles.actionText}></Text>
                    </View>
                  ))}
              </View>
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
  actionsContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    marginRight: 4,
    borderRadius: 4,
  },
  actionDone: {
    backgroundColor: "#a0e0a0",
  },
  actionPending: {
    backgroundColor: "#e0e0e0",
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
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
