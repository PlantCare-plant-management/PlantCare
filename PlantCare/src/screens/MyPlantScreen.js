import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const MyPlantScreen = () => {
  const navigation = useNavigation();
  const [myPlants, setMyPlants] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "/plants", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(data.message);
      }

      const data = await response.json();

      setMyPlant(data)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>Wednesday, 10 July 2024</Text>
      <View style={styles.filterContainer}>
        {/* <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "All plants" && styles.selectedFilter,
          ]}
          onPress={() => setFilter("All plants")}
        >
          <Text style={styles.filterText}>All plants</Text>
        </TouchableOpacity> */}
      </View>
      <FlatList
        data={myPlants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.plantItem}
            onPress={() => navigation.navigate("PlantInfo", { plant: item })}
          >
            <View style={styles.plantInfo}>
              <Text style={styles.plantName}>{item.name}</Text>
              <Text style={styles.plantDate}>
                Latin name: {item.latin_name}
              </Text>
            </View>
            <View style={styles.plantPhotoContainer}>
              <Text style={styles.plantPhotoText}>Foto Tanaman</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddPlant")}
      >
        <Text style={styles.addButtonText}>Add a new plant</Text>
      </TouchableOpacity>
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
