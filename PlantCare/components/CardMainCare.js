import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function CardMainCare() {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.iconContainer}>
          <Entypo name="water" size={40} color="white" />
        </View>
        <Text style={styles.text}>Watering</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  iconContainer: {
    height: 80,
    width: 80,
    backgroundColor: "green",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    marginTop: 5,
  },
});
