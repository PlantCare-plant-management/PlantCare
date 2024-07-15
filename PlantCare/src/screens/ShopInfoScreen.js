// ShopInfoScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const starterPackDescriptions = {
  '1': 'Starter Pack 1 includes:\n- Pot\n- Soil\n- Seeds\n- Watering Can\n- Gardening Tools',
  '2': 'Starter Pack 2 includes:\n- Pot\n- Soil\n- Seeds\n- Fertilizer\n- Gardening Tools',
  '3': 'Starter Pack 3 includes:\n- Pot\n- Soil\n- Seeds\n- Gloves\n- Gardening Tools',
  '4': 'Starter Pack 4 includes:\n- Pot\n- Soil\n- Seeds\n- Spray Bottle\n- Gardening Tools',
  '5': 'Starter Pack 5 includes:\n- Pot\n- Soil\n- Seeds\n- Plant Markers\n- Gardening Tools',
  '6': 'Starter Pack 6 includes:\n- Pot\n- Soil\n- Seeds\n- Mini Greenhouse\n- Gardening Tools',
  '7': 'Starter Pack 7 includes:\n- Pot\n- Soil\n- Seeds\n- Plant Food\n- Gardening Tools',
  '8': 'Starter Pack 8 includes:\n- Pot\n- Soil\n- Seeds\n- Pest Control Spray\n- Gardening Tools',
  '9': 'Starter Pack 9 includes:\n- Pot\n- Soil\n- Seeds\n- Mulch\n- Gardening Tools',
  '10': 'Starter Pack 10 includes:\n- Pot\n- Soil\n- Seeds\n- Pruning Shears\n- Gardening Tools',
  '11': 'Starter Pack 11 includes:\n- Pot\n- Soil\n- Seeds\n- Plant Stand\n- Gardening Tools',
  '12': 'Starter Pack 12 includes:\n- Pot\n- Soil\n- Seeds\n- Gardening Book\n- Gardening Tools',
};

const ShopInfoScreen = () => {
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

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
          <Text style={styles.priceText}>Rp{product.price}</Text>
          <Text style={styles.descriptionTitle}>{product.name}</Text>
          <Text style={styles.descriptionText}>{starterPackDescriptions[product.id]}</Text>
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
  detailText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 40, // Menggeser posisi teks Detail Item
    alignSelf: 'center', // Menempatkan di tengah bagian atas layar
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start', // Mengubah justifyContent menjadi flex-start
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: '90%', // Memperbesar lebar gambar agar lebih proporsional
    height: 400, // Memperbesar tinggi gambar agar lebih proporsional
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
    textAlign: 'center',
    paddingVertical: 15,
  },
  buyButton: {
    width: '75%',
    padding: 15,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 30,
    alignSelf: 'center', // Menempatkan tombol di tengah bawah layar
  },
  buyButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navButton: {
    padding: 10,
  },
  navButtonText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ShopInfoScreen;