import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Entypo } from "react-native-vector-icons";

const CardRecom = ({ data, renderIcon }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        {renderIcon(data.title.toLowerCase())}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subtitle}>{data.subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#4CAF50",
    height: 150,
    width: 140,
    borderRadius: 20,
    marginRight: 15,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  iconContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#388E3C",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#FFFFFF",
  },
});

export default CardRecom;