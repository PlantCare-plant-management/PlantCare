// CardAddPlant.js
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CardAddPlant = ({ plant }) => {
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
      <Image source={{ uri: plant.image }} style={styles.plantImage} />
      <View style={styles.plantInfo}>
        <Text style={styles.plantName}>{plant.name}</Text>
        <View style={styles.careContainer}>
          {plant.care.map((careItem) => (
            <Icon
              key={careItem}
              name={careIcons[careItem]}
              size={20}
              color="#4CAF50"
              style={styles.careIcon}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    marginTop: 8,
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

export default CardAddPlant;
