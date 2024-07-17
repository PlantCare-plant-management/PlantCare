import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";

const AddPlantScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState("");


  async function fetchData() {
    const token = await SecureStore.getItemAsync('access_token');
    try {
      const res = await fetch(process.env.EXPO_PUBLIC_API_URL + "/plants", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      if (!res.ok) {
        throw new Error("Gagal fetch");
      }
      const data = await res.json();
      setPlants(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPlants = plants.filter(
    (plant) => plant.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  );

  const careIcons = {
    Watering: "watering-can",
    Lighting: "lightbulb-on-outline",
    Fertilizing: "leaf",
    "Monitor plant health": "note-check",
    "Pruning dead leaves": "content-cut",
    "Pruning dead flowers": "content-cut",
    Pruning: "content-cut",
    "Dusting leaves": "broom",
    "Cleaning central cup": "cup-water",
    "Cleaning pitchers": "bottle-wine-outline",
    Shaping: "content-cut",
    "Deadheading spent flowers": "flower-outline",
    "Staking tall plants": "tree-outline",
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Scan Your Plant</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("CameraScreen", { plants })}
        >
          <Ionicons name="camera" size={32} color="white" />
        </TouchableOpacity>
      </View>

     {/* Search Section */}
     <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search plant..."
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="magnify" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Plant List */}
      <FlatList
        data={filteredPlants}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.plantItem}
            onPress={() => navigation.navigate("AddPlantForm", { plant: item })}
          >
            <View style={styles.plantCard}>
              <View style={styles.plantInfo}>
                <Text style={styles.plantName}>{item.name}</Text>
                <View style={styles.careContainer}>
                  {item.main_care.map((care, index) => (
                    <Icon
                      key={`${item._id}-${care}-${index}`}
                      name={careIcons[care] || "leaf"}
                      size={24}
                      color="#8BC34A"
                      style={styles.careIcon}
                    />
                  ))}
                </View>
              </View>
              <Image
                source={{
                  uri: item.imgUrl || `https://via.placeholder.com/100`,
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
    backgroundColor: "#F4F4F4",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#4CAF50",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  addButton: {
    padding: 12,
    backgroundColor: "#388E3C",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  scanImage: {
    width: 30,
    height: 30,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#DDD",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
  },
  searchButton: {
    height: 40,
    width: 40,
    backgroundColor: "#388E3C",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  plantItem: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginHorizontal: 16,
  },
  plantCard: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 130,
    borderRadius: 15,
    overflow: "hidden",
  },
  plantInfo: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  plantName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    color: "green",
  },
  careContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  careIcon: {
    marginRight: 8,
  },
  plantImage: {
    flex: 2,
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
});

export default AddPlantScreen;