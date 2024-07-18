// OptionScreen.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const OptionScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <StatusBar barStyle="dark-content" /> */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/dszhu92hc/image/upload/v1721199975/aset7-01_mop5ey.png",
            }}
            style={styles.image}
          />
          <Text style={styles.header}>
            Get Started with a New Plant Pack or Add an Existing Plant
          </Text>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate("OptionBuy")}
          >
            <Ionicons name="leaf" size={24} color="#2e7d32" />
            <Text style={styles.optionButtonText}>Get Plant Pack</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate("AddPlantScreen")}
          >
            <Ionicons name="add-circle" size={24} color="#2e7d32" />
            <Text style={styles.optionButtonText}>Add Existing Plant</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: "#2e7d32",
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
  },
  topBar: {
    marginTop: 10,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    marginTop: "10%",
    marginLeft: "3%",
    padding: 10,
    zIndex: 10,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: "90%",
    height: "50%",
    borderRadius: 75,
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  optionButtonText: {
    fontSize: 18,
    color: "#2e7d32",
    fontWeight: "600",
    marginLeft: 10,
  },
});

export default OptionScreen;
