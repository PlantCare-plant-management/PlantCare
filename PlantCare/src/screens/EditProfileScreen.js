import {
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { fetchUserData } from "../func/fetchUser";

// mengambil lebar layar
const { width } = Dimensions.get("window");

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const inputAccessoryViewID = "uniqueID";
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);

  // state data user buat image
  const [userData, setUserData] = useState(null);
  console.log(userData, "<==== data user");

  const fetchUser = async () => {
    try {
      const result = await fetchUserData();
      if (result) {
        setUserData(result);
        setName(result.name);
        setUsername(result.username);
        setAddress(result.address);
        setImage(result.imgUrl);
      }
    } catch (error) {
      console.log("error di fetch edit profile", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("address", address);

      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append("imgUrl", {
          uri: image,
          type: blob.type,
          name: "profile.jpg",
        });
      }

      const token = await SecureStore.getItemAsync("access_token");

      const response = await fetch(
        process.env.EXPO_PUBLIC_API_URL + `/user/edit`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const text = await response.text();
      console.log("Response text:", text);

      if (response.ok) {
        const result = JSON.parse(text);
        console.log(result);

        navigation.goBack();
      } else {
        console.error("Error:", text);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView>
        <View style={styles.wrapPhoto}>
          <Image
            style={styles.imageProfile}
            source={{
              uri:
                image ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            }}
          />
          <TouchableOpacity
            onPress={pickImage}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Text style={{ fontSize: 20, paddingLeft: 20 }}>Change Photo</Text>
            <Ionicons
              style={styles.searchIcon}
              name="create-outline"
              size={20}
              color="#333"
            />
          </TouchableOpacity>
        </View>

        <ScrollView keyboardDismissMode="interactive">
          <View style={styles.wrapInput}>
            <Ionicons
              style={styles.searchIcon}
              name="person-outline"
              size={20}
              color="#333"
            />
            <TextInput
              style={styles.input}
              inputAccessoryViewID={inputAccessoryViewID}
              onChangeText={setName}
              value={name}
              placeholder={"Name"}
            />
          </View>

          <View style={styles.wrapInput}>
            <Ionicons
              style={styles.searchIcon}
              name="person-outline"
              size={20}
              color="#333"
            />
            <TextInput
              style={styles.input}
              inputAccessoryViewID={inputAccessoryViewID}
              onChangeText={setUsername}
              value={username}
              placeholder={"Username"}
            />
          </View>

          <View style={styles.wrapInput}>
            <Ionicons
              style={styles.searchIcon}
              name="home-outline"
              size={20}
              color="#333"
            />
            <TextInput
              style={styles.input}
              inputAccessoryViewID={inputAccessoryViewID}
              onChangeText={setAddress}
              value={address}
              placeholder={"Address"}
            />
          </View>

          <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit}>
            <Text
              style={{ color: "#494a49", fontWeight: "bold", color: "white" }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  wrapPhoto: {
    alignItems: "center",
    marginTop: -10,
  },
  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  wrapInput: {
    flex: 1,
    width: width - 20,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
    color: "#424242",
    borderRadius: 10,
  },
  buttonSubmit: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
    height: 40,
    marginTop: 15,
    backgroundColor: "#42f548",
  },
  button: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    height: 30,
    borderRadius: 7,
    backgroundColor: "red",
  },
  buttonText: {
    color: "#fff",
  },
  searchIcon: {
    padding: 10,
  },
});
