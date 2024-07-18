//
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import Icon from "react-native-vector-icons/FontAwesome";
import { formatDate } from "../helper/FormatRupiah";

const MyPlantScreen = () => {
  const navigation = useNavigation();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const URL = process.env.EXPO_PUBLIC_API_URL;

  const fetchMyPlants = async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      const response = await fetch(`${URL}/myplants`, {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    return <ActivityIndicator size="large" color="#ff6347" />;
  }

  const getActionIcon = (actionName) => {
    switch (actionName) {
      case "Watering":
        return "tint";
      case "Lighting":
        return "sun-o";
      case "Fertilizing":
        return "leaf";
      case "Pruning dead leaves":
      case "Monitor plant health":
        return "heartbeat";
      default:
        return "circle";
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formatDate(new Date())}</Text>
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

      {/* jika tidak ada plant */}
      {filteredPlants.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You don't have any plants yet.</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("OptionScreen")}
          >
            <Text style={styles.addButtonText}>Add Plant</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* end jika tidak ada plant */}
      <FlatList
        data={filteredPlants}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.plantItem}
            onPress={() => navigation.navigate("PlantInfo", { plant: item })}
          >
            <View style={styles.plantInfo}>
              <Text style={styles.plantName}>{item.name}</Text>
              <Text style={styles.plantDate}>Date planted: {formatDate(item.createdAt)}</Text>
              <View style={styles.actionsContainer}>
                {item.actions && item.actions.length > 0 ? (
                  item.actions
                    .filter((action) => action.show)
                    .map((action) => (
                      <View
                        key={action.id}
                        style={[
                          styles.action,
                          action.status
                            ? styles.actionDone
                            : styles.actionPending,
                        ]}
                      >
                        <Icon
                          name={getActionIcon(action.name)}
                          size={20}
                          color="#fff"
                        />
                      </View>
                    ))
                ) : (
                  <Text style={styles.noActionsText}>No actions available</Text>
                )}
              </View>
            </View>
            <View style={styles.plantPhotoContainer}>
              <Image
                source={{
                  uri: item.photo || item.plants.imgUrl || `https://via.placeholder.com/100`,
                }}
                style={styles.plantImage}
              />
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
    backgroundColor: "#c0c0c0",
    borderRadius: 8,
  },
  selectedFilter: {
    backgroundColor: "#696969",
  },
  filterText: {
    fontSize: 16,
    color: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 16,
    color: "#666",
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
    borderRadius: 8,
  },
  actionDone: {
    backgroundColor: "#d3d3d3",
  },
  actionPending: {
    backgroundColor: "#8BC34A",
  },
  noActionsText: {
    fontSize: 14,
    color: "#666",
  },
  plantPhotoContainer: {
    width: 100,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  plantImage: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  addButton: {
    height: 48,
    width: "60%",
    backgroundColor: "tomato",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  plantImage: {
    borderRadius: 10,
    flex: 2,
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
});

export default MyPlantScreen;
