import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { authContext } from "../contexts/authContext";
import * as SecureStore from "expo-secure-store";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logout } = useContext(authContext);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");

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
          <View style={styles.coverContainer}>
            <Image
              source={{
                uri: "https://static.vecteezy.com/system/resources/thumbnails/006/224/670/small/go-green-concept-banner-with-lush-green-foliage-illustration-vector.jpg",
              }}
              style={styles.coverImage}
            />
            <Image
              source={{
                uri: userData.imgUrl,
              }}
              style={styles.imageProfile}
            />
          </View>
          <Text style={styles.profileName}>{userData.name}</Text>
          <Text style={styles.profileSubText}>{userData.email}</Text>
        </View>

        <View style={styles.WrapMenu}>
          <View style={styles.userInfo}>
            <View style={styles.userItem}>
              <Text style={styles.itemLabel}>Level</Text>
              <Text style={styles.itemValue}>Beginner</Text>
            </View>

            <View style={styles.userItem}>
              <Text style={styles.itemLabel}>Plant</Text>
              <Text style={styles.itemValue}>10</Text>
            </View>
          </View>
          <View style={styles.menuItem}>
            <View style={styles.wrapText}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#333"
              />
              <Text style={styles.menuItemText}>Account Information</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#333" />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            <View style={styles.menuItem}>
              <View style={styles.wrapText}>
                <Ionicons name="create-outline" size={20} color="#333" />
                <Text style={styles.menuItemText}>Edit Profile</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color="#333" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("notification")}>
            <View style={styles.menuItem}>
              <View style={styles.wrapText}>
                <Ionicons name="notifications-outline" size={20} color="#333" />
                <Text style={styles.menuItemText}>Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Faq")}>
            <View style={styles.menuItem}>
              <View style={styles.wrapText}>
                <Ionicons name="help-circle-outline" size={20} color="#333" />
                <Text style={styles.menuItemText}>FAQ</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color="#333" />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <TouchableOpacity onPress={logout}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Ionicons name="log-out-outline" size={30} color="#ff0000" />
              <Text style={{ fontSize: 20, fontWeight: "400", color: "black" }}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF5F5",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
    marginTop: 10,
  },
  coverContainer: {
    alignItems: "center",
    position: "relative",
  },
  coverImage: {
    width: width,
    height: 150,
    position: "absolute",
    top: 0,
    zIndex: -1,
  },
  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 75,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileSubText: {
    fontSize: 14,
    color: "#666",
  },
  userInfo: {
    flexDirection: "row",
  },
  userItem: {
    marginBottom: 10,
    borderRadius: 10,
    width: "45%",
    margin: "auto",
    backgroundColor: "white",
    padding: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  itemLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  WrapMenu: {
    flex: 1,
    gap: 3,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    margin: "auto",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
  },
  wrapText: {
    flexDirection: "row",
    gap: 10,
  },
});

export default ProfileScreen;
