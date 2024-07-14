import React, { useContext, useState } from "react";
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
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { authContext } from "../contexts/authContext";

// mengambil lebar layar
const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logout } = useContext(authContext);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const handleLogout = () => {
    logout();
    navigation.navigate("Login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.coverContainer}>
            <Image
              source={{
                uri: "https://static.vecteezy.com/system/resources/thumbnails/006/224/670/small/go-green-concept-banner-with-lush-green-foliage-illustration-vector.jpg", // Ganti dengan URL gambar sampul yang diinginkan
              }}
              style={styles.coverImage}
            />
            <Image
              source={{
                uri: "https://cdn.idntimes.com/content-images/post/20240226/remu19971203-423414763-1419413852325257-8160633298947598858-n-a83f7868577039e47e2344a96107eea1.jpg",
              }}
              style={styles.imageProfile}
            />
          </View>
          <Text style={styles.profileName}>remu suzumori</Text>
          <Text style={styles.profileSubText}>suzumori@gmail.com</Text>
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
          }}
        >
          <TouchableOpacity onPress={handleLogout}>
            <View
              style={{
                // backgroundColor: "red",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Ionicons name="log-out-outline" size={30} color="#ff0000" />
              <Text
                style={{ fontSize: "20", fontWeight: "400", color: "black" }}
              >
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
    // backgroundColor: "pink",
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
    // backgroundColor: "blue",
    flexDirection: "row",
  },
  userItem: {
    // flexDirection: 'row',
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
    // backgroundColor: "pink",
    flexDirection: "row",
    gap: 10,
  },
});

export default ProfileScreen;
