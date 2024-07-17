import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";

const AddPlantFormScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const plant = route.params?.plant || {};

  const [photo, setPhoto] = useState(plant.photo || plant.imgUrl);
  const [name, setName] = useState(plant.name || "");
  const [location, setLocation] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [locations, setLocations] = useState([]);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const URL = process.env.EXPO_PUBLIC_API_URL;

  const fetchLocations = async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      const response = await fetch(`${URL}/locations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const list = ["Living Room", "Bedroom", "Kitchen", "Garden"];
      data.forEach((element) => {
        list.push(element.name);
      });
      setLocations(list);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const addCare = () => {
    const array = [];
    plant.main_care.forEach((element, i) => {
      element = {
        id: i + 1,
        name: element.task,
        frequency: element.frequency,
        update: new Date(),
        status: false,
        show: true,
      };
      array.push(element);
    });
    setActions(array);
  };

  useEffect(() => {
    fetchLocations();
    addCare();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchLocations();
      addCare();
    }, [])
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleAddPlant = async () => {
    const token = await SecureStore.getItemAsync("access_token");

    if (!location) {
      Alert.alert("Error", "Please select a location for the plant.");
      return;
    }

    setIsAdding(true);
    try {
      const formData = new FormData();
      formData.append("imgUrl", {
        uri: photo,
        name: "plant_photo.jpg",
        type: "image/jpeg",
      });
      formData.append("name", name);
      formData.append("location", location);
      formData.append("plantId", plant._id);
      formData.append("actions", JSON.stringify(actions));

      const response = await fetch(`${URL}/plants`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseBody = await response.text();
      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);
      console.log("Response Body:", responseBody);

      let result;
      try {
        result = JSON.parse(responseBody);
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError);
        Alert.alert(
          "Error",
          "Unexpected response from server. Please try again."
        );
        return;
      }

      if (response.ok) {
        navigation.navigate("MyPlant");
      } else {
        console.error("Failed to add plant:", result.message);
        Alert.alert("Error", result.message || "Failed to add plant.");
      }
    } catch (error) {
      console.error("Error adding plant:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleLocationChange = (itemValue) => {
    if (itemValue === "addRoom") {
      setModalVisible(false);
      navigation.navigate("AddRoomPlant");
    } else {
      setLocation(itemValue);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        <Image source={{ uri: photo }} style={styles.image} />
        <View style={styles.uploadIconContainer}>
          <Icon name="image-outline" size={24} color="#fff" />
        </View>
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: "white",
          height: "100%",
          padding: 30,
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Plant Name"
          value={name}
          onChangeText={setName}
          editable={!name}
        />
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: location ? "#000" : "#aaa" }}>
            {location || "Select Location"}
          </Text>
        </TouchableOpacity>
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.pickerContainer}>
              {loading ? (
                <ActivityIndicator size="large" color="#4CAF50" />
              ) : (
                <Picker
                  selectedValue={location}
                  onValueChange={handleLocationChange}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Location" value="" />
                  {locations.map((loc, index) => (
                    <Picker.Item key={index} label={loc} value={loc} />
                  ))}
                  <Picker.Item label="Add Room ..." value="addRoom" />
                </Picker>
              )}
            </View>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        {isAdding ? (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={{ fontWeight: "bold", color: "green" }}>
              Mohon tunggu sebentar....
            </Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.addButton} onPress={handleAddPlant}>
            <Text style={styles.addButtonText}>Add Plant</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CAF50",
  },
  imageContainer: {
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 24,
    borderRadius: 50,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: 200,
    height: 200,
  },
  uploadIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 50,
    padding: 8,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
  pickerContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 16,
  },
  picker: {
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalCloseButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    margin: 16,
  },
  modalCloseButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddPlantFormScreen;
