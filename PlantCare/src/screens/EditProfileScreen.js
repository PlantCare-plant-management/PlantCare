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
} from "react-native";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

// date time picker
import DateTimePicker from "@react-native-community/datetimepicker";

// mengambil lebar layar
const { width } = Dimensions.get("window");

export default function EditProfileScreen() {
  const inputAccessoryViewID = "uniqueID";
  const initialText = "";
  const [text, setText] = useState(initialText);

  // *  set tanggal
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicer] = useState(false);

  const toggleDatePicker = () => {
    setShowPicer(!showPicker);
  };

  //   format date
  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;

    return `${day} - ${month} -  ${year}`;
  };

  //   confirm ios platform
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView>
        <View style={styles.wrapPhoto}>
          <Image
            style={styles.imageProfile}
            source={{
              uri: "https://cdn.idntimes.com/content-images/post/20240226/remu19971203-423414763-1419413852325257-8160633298947598858-n-a83f7868577039e47e2344a96107eea1.jpg",
            }}
          />
          <TouchableOpacity>
            <Text style={{ fontSize: 20 }}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* input */}
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
              onChangeText={setText}
              value={text}
              placeholder={"Name"}
            />
          </View>

          {/* Email */}
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
              onChangeText={setText}
              value={text}
              placeholder={"Email"}
            />
          </View>

          {/* Password */}
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
              onChangeText={setText}
              secureTextEntry={true}
              value={text}
              placeholder={"Password"}
            />
          </View>

          {/* Address */}
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
              onChangeText={setText}
              value={text}
              placeholder={"Address"}
            />
          </View>

          {/* Date/tanggal */}
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
                {/* cancel input */}
                <TouchableOpacity
                  style={[styles.button]}
                  onPress={toggleDatePicker}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

                {/* confirm */}

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "green" }]}
                  onPress={confirmIosDate}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.buttonSubmit}
            onPress={() => {
              console.log("hello world");
            }}
          >
            <Text style={{ color: "#494a49", fontWeight: "bold" }}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      {/* end input */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // backgroundColor: "green",
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
