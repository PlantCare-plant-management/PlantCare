// AddRoomPlantsScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddRoomPlantsScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch rooms data from server
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          "https://8909-110-139-51-213.ngrok-free.app/locations"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRooms(data.map((item) => item.name));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const addRoom = async () => {
    if (newRoom.trim()) {
      try {
        setSaving(true);
        const response = await fetch(
          "https://8909-110-139-51-213.ngrok-free.app/locations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newRoom }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const savedRoom = await response.json();
        setRooms([...rooms, savedRoom.name]);
        setNewRoom("");
        setSaving(false);
        navigation.navigate("AddPlantForm");
      } catch (error) {
        console.error("Failed to save room:", error);
        setSaving(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Management Room</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <ScrollView style={styles.scrollView}>
          {rooms.map((room, index) => (
            <TextInput
              key={index}
              style={styles.input}
              defaultValue={room}
              editable={false}
            />
          ))}
          <TextInput
            style={styles.input}
            placeholder="Add Your Room ..."
            value={newRoom}
            onChangeText={setNewRoom}
          />
          <TouchableOpacity style={styles.addButton} onPress={addRoom}>
            <Text style={styles.addButtonText}>
              {saving ? "Adding room..." : "Add Room"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: "#000",
  },
});

export default AddRoomPlantsScreen;
