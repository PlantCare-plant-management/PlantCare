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
} from "react-native";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";

const AddPlantFormScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const plant = route.params?.plant || {};

  const [photo, setPhoto] = useState(plant.photo || "");
  const [name, setName] = useState(plant.name || "");
  const [location, setLocation] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const URL = process.env.EXPO_PUBLIC_API_URL

  // Hardcoded userId
  const userId = "6692846d0654ff8ff684e6bc";

  const fetchLocations = async () => {
    try {
      const response = await fetch(`${URL}/locations`);
      const data = await response.json();
      setLocations(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchLocations();
    }, [])
  );

  const handleAddPlant = async () => {
    if (!location) {
      alert("Please select a location for the plant.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${URL}/plants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          name,
          location,
          photo,
        }),
      });

      const result = await response.json();
      console.log(result, "ini result handleAddPlant");
      if (response.ok) {
        navigation.navigate("MyPlant");
      } else {
        console.error("Failed to add plant:", result);
        // Handle error (show message to user, etc.)
      }
    } catch (error) {
      console.error("Error adding plant:", error);
      // Handle error (show message to user, etc.)
    } finally {
      setLoading(false);
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

  const handlePhotoUpload = () => {
    // Implement photo upload logic here
    // For example, use ImagePicker to allow users to select a photo from their device
    // After selecting the photo, set the photo URI to the `photo` state
    // setPhoto(selectedPhotoUri);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={handlePhotoUpload}
      >
        <Image
          source={{ uri: photo || "https://via.placeholder.com/300" }}
          style={styles.image}
        />
        <View style={styles.uploadIconContainer}>
          <Icon name="camera" size={24} color="#fff" />
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
          editable={!name} // Allow editing only if name is empty
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
                  {locations.map((loc) => (
                    <Picker.Item
                      key={loc._id}
                      label={loc.name}
                      value={loc.name}
                    />
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
        <TouchableOpacity style={styles.addButton} onPress={handleAddPlant}>
          <Text style={styles.addButtonText}>Add Plant</Text>
        </TouchableOpacity>
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
    marginTop: 24,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddPlantFormScreen;