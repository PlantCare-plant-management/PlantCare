import {
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { fetchUserData } from "../function/fetchUserData";
import CustomModal from "../components/CustomModal";

const { width } = Dimensions.get("window");

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const inputAccessoryViewID = "uniqueID";
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");

  const [userData, setUserData] = useState(null);

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
      console.log("Error fetching user data:", error);
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

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
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

      if (response.ok) {
        const result = JSON.parse(text);
        console.log(result);
        navigation.goBack();
      } else {
        const data = await response.json();
        setModalType("error");
        setModalMessage(data.message);
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setModalType("error");
      setModalMessage(error.message);
      setModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
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
            style={styles.changePhotoButton}
          >
            <Ionicons
              name="create-outline"
              size={20}
              color="#4caf50"
              style={styles.iconChangePhoto}
            />
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.wrapInput}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#4caf50"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              inputAccessoryViewID={inputAccessoryViewID}
              onChangeText={setName}
              value={name}
              placeholder="Name"
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.wrapInput}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#4caf50"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              inputAccessoryViewID={inputAccessoryViewID}
              onChangeText={setUsername}
              value={username}
              placeholder="Username"
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.wrapInput}>
            <Ionicons
              name="home-outline"
              size={20}
              color="#4caf50"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              inputAccessoryViewID={inputAccessoryViewID}
              onChangeText={setAddress}
              value={address}
              placeholder="Address"
              placeholderTextColor="#888"
            />
          </View>

          {isLoading ? (
            <ActivityIndicator
              style={styles.loading}
              size="large"
              color="#4caf50"
            />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
        <CustomModal
        visible={modalVisible}
        message={modalMessage}
        type={modalType}
        onClose={handleCloseModal}
      />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapPhoto: {
    alignItems: "center",
    marginVertical: 20,
  },
  imageProfile: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#4caf50",
  },
  changePhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  changePhotoText: {
    fontSize: 18,
    color: "#4caf50",
    paddingLeft: 5,
  },
  iconChangePhoto: {
    paddingRight: 5,
  },
  form: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  wrapInput: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: "#333",
  },
  icon: {
    paddingRight: 10,
  },
  button: {
    backgroundColor: "#4caf50",
    borderRadius: 10,
    width: width - 32,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loading: {
    marginTop: 20,
  },
});
