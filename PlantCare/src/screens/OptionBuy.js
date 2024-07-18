import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export default OptionBuy = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>
      <Image
            source={{ uri: "https://res.cloudinary.com/dszhu92hc/image/upload/v1721200320/aset5-01_aubo2p.png" }}
            style={styles.image}
          />
      <Text style={styles.header}>Do you already have a Starter Plant Pack?</Text>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate("Order History")}
      >
        <Text style={styles.optionButtonText}>Yes, I already have a Starter Plant Pack. Click to start planting</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate("Shop")}
      >
        <Text style={styles.optionButtonText}>No, I want to buy one</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#4caf50",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: "5%",
    left: "5%",
    padding: 10,
    zIndex: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  optionButton: {
    width: "90%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  optionButtonText: {
    fontSize: 18,
    color: "#4caf50",
    textAlign: "center",
  },
  image: {
    width: "90%",
    height: "30%",
    borderRadius: 75,
    marginBottom: 20,
  },
});
