import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const ShippingAddressScreen = ({ route }) => {
  const navigation = useNavigation();
  const { product, quantity } = route.params; // Ambil product dan quantity dari route params
  const [user, setUser] = useState({ name: '', address: [] });
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [plant, setPlant] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = await SecureStore.getItemAsync('access_token');

      if (token) {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          if (Array.isArray(data.address)) {
            setAddresses(data.address);
          }
        } else {
          console.error('Failed to fetch user data');
        }
      }
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleAddressChange = (index, field, value) => {
    const newAddresses = [...addresses];
    newAddresses[index][field] = value;
    setAddresses(newAddresses);
  };

  const handleAddAddress = () => {
    const newAddress = { address: '', city: '', postalCode: '', country: '' };
    setAddresses([...addresses, newAddress]);
    setEditingAddressIndex(addresses.length);
  };

  const handleSaveAddress = async () => {
    try {
      const token = await SecureStore.getItemAsync('access_token');

      if (token) {
        const validAddresses = addresses.filter(
          (address) =>
            address.address !== '' &&
            address.city !== '' &&
            address.postalCode !== '' &&
            address.country !== ''
        );

        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/address`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ address: validAddresses }),
        });

        if (response.ok) {
          console.log('Addresses saved to MongoDB:', { validAddresses });
          setAddresses(validAddresses);
          setEditingAddressIndex(null);
        } else {
          const errorData = await response.text();
          console.error('Failed to save addresses:', errorData);
        }
      }
    } catch (error) {
      console.error('Error saving address', error);
    }
  };

  const handleSelectAddress = (index) => {
    setSelectedAddressIndex(index);
    setEditingAddressIndex(null); // Reset editing address when selecting an address
  };

  const handleEditAddress = (index) => {
    setEditingAddressIndex(index);
  };

  const fetchPlant = async () => {
    try {
      const token = await SecureStore.getItemAsync('access_token');
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/plantMarket/${product._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setPlant(result);
    } catch (error) {
      console.error("Error fetching plant:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlant();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const amount = plant ? plant.price * plant.quantity : 0; // Pastikan plant dan quantity tersedia

  const handleProceedToPayment = async () => {
    if (selectedAddressIndex !== null) {
      try {
        const token = await SecureStore.getItemAsync('access_token');
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            plantMarketId: product._id,
            quantity: quantity,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          navigation.navigate('PaymentScreen', {
            transactionToken: data.transactionToken,
            amount: product.price * quantity, // Pastikan ini benar
            customerDetails: {
              name: user.name,
              email: user.email,
              address: addresses[selectedAddressIndex], // Pastikan ini benar
            },
          });
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please select an address');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Shipping Address</Text>
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={user.name}
          onChangeText={(name) => setUser({ ...user, name })}
          editable={false} // Membuat input nama tidak bisa diedit
        />
        <Text style={styles.text}>Select Address</Text>
        {addresses.length === 0 ? (
          <View style={styles.noAddressContainer}>
            <Text style={styles.noAddressText}>Don't have address?</Text>
          </View>
        ) : (
          addresses.map((address, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.addressCard,
                selectedAddressIndex === index && styles.selectedAddressCard,
              ]}
              onPress={() => handleSelectAddress(index)}
              onLongPress={() => handleEditAddress(index)} // Use long press to edit address
            >
              <Text style={styles.addressText}>
                {address.address}, {address.city}, {address.postalCode}, {address.country}
              </Text>
            </TouchableOpacity>
          ))
        )}
        {editingAddressIndex !== null && (
          <View style={styles.addressContainer}>
            <Text style={styles.text}>Address</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Address"
              value={addresses[editingAddressIndex].address}
              onChangeText={(value) => handleAddressChange(editingAddressIndex, 'address', value)}
              multiline={true}
              numberOfLines={4}
            />
            <Text style={styles.text}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="City"
              value={addresses[editingAddressIndex].city}
              onChangeText={(value) => handleAddressChange(editingAddressIndex, 'city', value)}
            />
            <Text style={styles.text}>Postal Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Postal Code"
              value={addresses[editingAddressIndex].postalCode}
              onChangeText={(value) => handleAddressChange(editingAddressIndex, 'postalCode', value)}
            />
            <Text style={styles.text}>Country</Text>
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={addresses[editingAddressIndex].country}
              onChangeText={(value) => handleAddressChange(editingAddressIndex, 'country', value)}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleSaveAddress}>
              <Text style={styles.addButtonText}>Save Address</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
          <Text style={styles.addButtonText}>Add Address</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleProceedToPayment}
        >
          <Text style={styles.saveButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  scrollContainer: {
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    zIndex: 1,
    padding: 10,
    borderRadius: 10,
  },
  backButtonText: {
    fontSize: 30,
    marginLeft: 10,
    color: '#000000',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 50,
    textAlign: 'center',
    color: '#000000',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 5,
    color: '#000000',
  },
  addressContainer: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: '#388E3C',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#388E3C',
  },
  addButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noAddressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  noAddressText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  addressCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#388E3C',
    borderRadius: 15,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
  },
  selectedAddressCard: {
    backgroundColor: '#e0f7e0',
    borderColor: '#2e7d32',
  },
  addressText: {
    fontSize: 16,
    color: '#388E3C',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShippingAddressScreen;
