// ShopInfoScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import FormatRupiah from '../helper/FormatRupiah';

const ShopInfoScreen = () => {
  const [quantity, setQuantity] = useState(1);
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;
  // console.log(product, "<<<< product");
  const URL = process.env.EXPO_PUBLIC_API_URL;
  
  const fetchPlant = async () => {
    try {
        const token = await SecureStore.getItemAsync('access_token');
        const response = await fetch(`${URL}/plantMarket/${product._id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        // console.log(response, "<<<< response");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log(result, "<<<< ");
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

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.detailText}>Detail Item</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.priceText}>{FormatRupiah(product.price)}</Text>
          <Text style={styles.descriptionTitle}>{product.name}</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.buyButton} onPress={() => navigation.navigate('ShippingAddress')}>
        <Text style={styles.buyButtonText}>Checkout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25,
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
  detailText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 40,
    alignSelf: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: '90%',
    height: 400,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    marginHorizontal: 25,
  },
  quantityButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  quantityText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    alignItems: 'center',
    padding: 5,
  },
  priceText: {
    fontSize: 35,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  descriptionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 20,
    color: '#555',
    textAlign: 'left', // Mengubah style menjadi rata kiri
    paddingVertical: 10,
  },
  buyButton: {
    width: '75%',
    padding: 15,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 30,
    alignSelf: 'center',
  },
  buyButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShopInfoScreen;