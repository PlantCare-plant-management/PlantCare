import React, { useState } from "react";
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

  const plants = [
    {
      id: "1",
      name: "Tanaman Anggrek",
      latin_name: "Orchidaceae",
      description:
        "Anggrek adalah tanaman hias berbunga yang dikenal karena bunganya yang indah dan beragam.",
      difficulty: "Intermediate",
      harvest: "False",
      recommendation: [
        "Watering: 2-3 times a week, ensuring the medium is dry before watering again.",
        "Light: Indirect bright light, avoid direct sunlight.",
        "Soil: Use a special orchid potting mix.",
        "Fertilizing: Monthly with a balanced orchid fertilizer.",
      ],
      main_care: [
        "Watering",
        "Lighting",
        "Fertilizing",
        "Monitor plant health",
      ],
      imageUrl:
        "https://i.pinimg.com/originals/17/23/5d/17235d9912e952a2889a5f2552f95f11.png",
    },
    {
      id: "2",
      name: "Rose",
      latin_name: "Rosa",
      description: "A beautiful flower.",
      difficulty: "Hard",
      harvest: "True",
      recommendation: [
        "Watering: Keep the soil moist at all times.",
        "Light: Full sun.",
        "Soil: Well-drained soil.",
        "Fertilizing: Monthly with rose fertilizer.",
      ],
      main_care: ["Watering", "Lighting", "Fertilizing", "Pruning"],
      imageUrl:
        "https://superawesomevectors.com/wp-content/uploads/2016/08/flat-rose-vector-illustration-800x566.jpg",
    },
    {
      id: "3",
      name: "Tulip",
      latin_name: "Tulipa",
      description: "A colorful spring flower.",
      difficulty: "Easy",
      harvest: "True",
      recommendation: [
        "Watering: Once a week.",
        "Light: Full sun.",
        "Soil: Well-drained soil.",
        "Fertilizing: Before planting and in spring.",
      ],
      main_care: [
        "Watering",
        "Lighting",
        "Fertilizing",
        "Monitor plant health",
      ],
      imageUrl:
        "https://us.123rf.com/450wm/eugenebsov/eugenebsov2202/eugenebsov220200093/182537714-realistic-pink-red-tulip-with-green-leaves-isolated-on-white-background-spring-fresh-flowers.jpg?ver=6",
    },
  ];

  const [filter, setFilter] = useState("All plants");

  const filteredPlants =
    filter === "All plants"
      ? plants
      : plants.filter((plant) => plant.location === filter);

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
      </View>
      <FlatList
        data={filteredPlants}
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
