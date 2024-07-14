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
  const [editId, setEditId] = useState(null); // State untuk menyimpan ID ruangan yang sedang diedit
  const navigation = useNavigation();
  const URL = "https://632e-125-167-35-211.ngrok-free.app";

  // Fungsi untuk mengambil daftar ruangan dari server saat komponen dimount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${URL}/locations`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Fungsi untuk menambahkan ruangan baru
  const addRoom = async () => {
    if (newRoom.trim()) {
      try {
        setSaving(true);
        const response = await fetch(`${URL}/locations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newRoom }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const savedRoom = await response.json();
        setRooms([...rooms, savedRoom]);
        setNewRoom("");
        setSaving(false);
        navigation.navigate("AddPlantForm");
      } catch (error) {
        console.error("Failed to save room:", error);
        setSaving(false);
      }
    }
  };

  // Fungsi untuk mengedit ruangan
  const editRoom = async (id) => {
    console.log(id, "ini id");
    try {
      setSaving(true);
      const response = await fetch(`${URL}/locations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: rooms.find((room) => room._id === id).name,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedRoom = await response.json();
      const updatedRooms = rooms.map((room) =>
        room._id === id ? { ...room, name: updatedRoom.name } : room
      );
      setRooms(updatedRooms);
      setEditId(null); // Reset ID yang sedang diedit
      setSaving(false);
    } catch (error) {
      console.error(`Failed to edit room: ${error}`);
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Management Room</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <ScrollView style={styles.scrollView}>
          {rooms.map((room) => (
            <View key={room._id} style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={room.name}
                onChangeText={(text) => {
                  const updatedRooms = rooms.map((r) =>
                    r._id === room._id ? { ...r, name: text } : r
                  );
                  setRooms(updatedRooms);
                }}
                editable={editId === room._id}
              />
              {editId !== room._id ? (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setEditId(room._id)}
                >
                  <Text>Edit</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => editRoom(room._id)}
                >
                  <Text>Save</Text>
                </TouchableOpacity>
              )}
            </View>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 10,
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
