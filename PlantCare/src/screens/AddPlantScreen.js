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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useQuery, gql } from "@apollo/client";

const AddPlantScreen = () => {
  const navigation = useNavigation();
  // const [searchText, setSearchText] = useState("");
  const [plants, setPlants] = useState([]);

  async function fetchData() {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist",
        {
          cache: "no-store",
          next: {
            tags: ["fetch-plants"],
          },
        }
      );
    } catch (error) {
      throw new Error("Gagal fetch data");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPlants = plants.filter(
    (plant) => plant.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add a New Plant</Text>
      </View>
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
      <FlatList
        data={data?.getAllPlants}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.plantItem}
            onPress={() => navigation.navigate("AddPlantForm", { plant: item })}
          >
            <View style={styles.plantInfo}>
              <Text style={styles.plantName}>{item.name}</Text>
              <View style={styles.careContainer}>
                <Icon
                  name="watering-can"
                  size={24}
                  color="#AED581"
                  style={styles.careIcon}
                />
                <Icon
                  name="leaf"
                  size={24}
                  color="#8BC34A"
                  style={styles.careIcon}
                />
                <Icon
                  name="content-cut"
                  size={24}
                  color="#FFC107"
                  style={styles.careIcon}
                />
                <Icon
                  name="flower-tulip"
                  size={24}
                  color="#F48FB1"
                  style={styles.careIcon}
                />
              </View>
            </View>
            <Image source={{ uri: item.image }} style={styles.plantImage} />
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    alignSelf: "flex-end",
    padding: 16,
    backgroundColor: "#4caf50",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginRight: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
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
    borderColor: "#ddd",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  searchButton: {
    height: 40,
    width: 40,
    backgroundColor: "#4caf50",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  plantItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#fff",
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
  plantInfo: {
    flex: 1,
    marginRight: 16,
  },
  plantName: {
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
  },
  careContainer: {
    flexDirection: "row",
  },
  careIcon: {
    marginRight: 8,
  },
  plantImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
});

export default AddPlantScreen;
