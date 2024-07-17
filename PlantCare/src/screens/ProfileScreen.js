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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { authContext } from "../contexts/authContext";
import * as SecureStore from "expo-secure-store";

const defaultUserData = {
  name: "user",
  email: "user@mail.com",
  imgUrl:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logout } = useContext(authContext);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(defaultUserData.imgUrl);
  const [isFetch, setisFetch] = useState(true);
  // console.log(isFetch, "<=== fetch?");

  const fetchUserData = async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      if (token) {
        const response = await fetch(
          process.env.EXPO_PUBLIC_API_URL + `/user`,
          {
            method: "GET",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setProfileImage(data.imgUrl || defaultUserData.imgUrl);
          setisFetch(false);
        } else {
          console.error("Failed to fetch user data");
          setUserData(defaultUserData);
          setisFetch(true);
        }
      }
    } catch (error) {
      console.error("Error fetching user data", error);
      setUserData(defaultUserData);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

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
              uri: profileImage,
            }}
            style={styles.imageProfile}
            onError={() => setProfileImage(defaultUserData.imgUrl)}
          />
          <Text style={styles.profileName}>{userData.name}</Text>
          <Text style={styles.profileSubText}>{userData.email}</Text>
        </View>

        <View style={styles.WrapMenu}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AccountInformation")}
          >
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
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile")}
            disabled={isFetch}
          >
            <View style={styles.menuItem}>
              <View style={styles.wrapText}>
                <Ionicons name="create-outline" size={20} color="#333" />
                <Text
                  style={[
                    styles.menuItemText,
                    {
                      textDecorationLine: setisFetch ? "none" : "line-through",
                    },
                  ]}
                >
                  Edit Profile
                </Text>
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
