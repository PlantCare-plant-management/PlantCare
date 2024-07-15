import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ShippingAddressScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const handleSaveAddress = () => {
    // Logic untuk menyimpan alamat pengiriman
    console.log("Alamat disimpan:", { name, address, city, postalCode, country });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Shipping Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          multiline={true}
          numberOfLines={4}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="Postal Code"
          value={postalCode}
          onChangeText={setPostalCode}
        />
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />
        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('Payment')}>
          <Text style={styles.saveButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  scrollContainer: {
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50, // Menggeser tombol back ke bawah agar lebih proporsional
    left: 16,
    zIndex: 1,
    padding: 10, // Menambahkan padding
    borderRadius: 10, // Menambahkan border radius
  },
  backButtonText: {
    fontSize: 30,
    marginLeft: 10,
    color: '#000000', // Mengubah warna teks menjadi putih
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
    color: "#000000",
  },
  input: {
    height: 50,
    borderColor: "#388E3C",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 15,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#388E3C",
  },
  saveButton: {
    backgroundColor: "#388E3C",
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ShippingAddressScreen;