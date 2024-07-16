import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";

const { width } = Dimensions.get("window");

export default function AccountInformation() {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      console.log(process.env.EXPO_PUBLIC_API_URL + `/user`, "<====");
      if (token) {
        const response = await fetch(
          process.env.EXPO_PUBLIC_API_URL + `/user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch user data");
        }
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Image
            source={{
              uri: userData.imgUrl,
            }}
            style={styles.imageProfile}
          />
          <View style={styles.profileTextContainer}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.profileName}>{userData.name}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <View style={styles.infoItemTextContainer}>
              <Ionicons name="mail-outline" size={20} color="#333" />
              <Text style={styles.menuItemText}>Email</Text>
            </View>
            <Text style={styles.infoText}>{userData.email}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.infoItem}>
            <View style={styles.infoItemTextContainer}>
              <Ionicons name="calendar-outline" size={20} color="#333" />
              <Text style={styles.menuItemText}>Birthday</Text>
            </View>
            <Text style={styles.infoText}>{userData.dateOfBirth}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.infoItem}>
            <View style={styles.infoItemTextContainer}>
              <Ionicons name="location-outline" size={20} color="#333" />
              <Text style={styles.menuItemText}>Address</Text>
            </View>
            <Text style={styles.infoText}>{userData.address}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F7F9FC",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: width * 0.9,
  },
  imageProfile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileTextContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  infoContainer: {
    width: width * 0.9,
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoItem: {
    marginVertical: 10,
  },
  infoItemTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#666",
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
  },
});
