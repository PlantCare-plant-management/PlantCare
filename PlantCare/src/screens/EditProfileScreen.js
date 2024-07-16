import {
  Button,
  Dimensions,
  Image,
  Platform,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { fetchUserData } from "../func/fetchUser";

// mengambil lebar layar
const { width } = Dimensions.get("window");

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const inputAccessoryViewID = "uniqueID";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicer] = useState(false);
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
        setEmail(result.email);
        setAddress(result.address);
        setDateOfBirth(result.dateOfBirth);
        setImage(result.imgUrl);
      }
    } catch (error) {
      console.log("error di fetch edit profile", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const toggleDatePicker = () => {
    setShowPicer(!showPicker);
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month < 10 ? `0${month}` : month;
    return `${day} - ${month} -  ${year}`;
  };

  const confirmIosDate = () => {
    setDateOfBirth(formatDate(date));
    toggleDatePicker();
  };

  const onChange = ({ type }, selectDate) => {
    if (type == "set") {
      const currendDate = selectDate;
      setDate(currendDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateOfBirth(formatDate(currendDate));
      }
    } else {
      toggleDatePicker();
    }
  };

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
      formData.append("email", email);
      formData.append("password", password);
      formData.append("address", address);
      formData.append("dateOfBirth", dateOfBirth);

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
              uri: image || "https://your-default-image-url.com/default.jpg",
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
              name="mail-outline"
              size={20}
              color="#333"
            />
            <TextInput
              style={styles.input}
              inputAccessoryViewID={inputAccessoryViewID}
              onChangeText={setEmail}
              value={email}
              placeholder={"Email"}
            />
          </View>

          <View style={styles.wrapInput}>
            <Ionicons
              style={styles.searchIcon}
              name="lock-closed-outline"
              size={20}
              color="#333"
            />
            <TextInput
              style={styles.input}
              inputAccessoryViewID={inputAccessoryViewID}
              onChangeText={setPassword}
              secureTextEntry={true}
              value={password}
              placeholder={"Password"}
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

          <View style={styles.wrapInputDate}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Ionicons
                style={[styles.searchIcon]}
                name="calendar-number-outline"
                size={25}
                color="#333"
              />
              {!showPicker && (
                <Pressable onPress={toggleDatePicker}>
                  <TextInput
                    style={[styles.input, styles.dateInput]}
                    inputAccessoryViewID={inputAccessoryViewID}
                    onChangeText={setDateOfBirth}
                    value={dateOfBirth}
                    placeholder={"Select your date of birth"}
                    editable={false}
                    onPressIn={toggleDatePicker}
                  />
                </Pressable>
              )}
            </View>

            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChange}
                maximumDate={new Date("2006-1-1")}
                minimumDate={new Date()}
              />
            )}

            {showPicker && Platform.OS === "ios" && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  gap: 20,
                }}
              >
                <TouchableOpacity
                  style={[styles.button]}
                  onPress={toggleDatePicker}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "green" }]}
                  onPress={confirmIosDate}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit}>
            <Text style={{ color: "#494a49", fontWeight: "bold" }}>Submit</Text>
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
  wrapInputDate: {
    flex: 1,
    width: width - 20,
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#ddd",
    shadowOffset: {
      width: 0,
      height: 2,
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
  dateInput: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
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
