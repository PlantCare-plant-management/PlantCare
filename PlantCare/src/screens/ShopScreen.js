// ShopScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const products = [
    { id: '1', name: 'Starter Pack 1', price: 17000, image: 'https://www.ruparupa.com/blog/wp-content/uploads/2020/09/Screen-Shot-2020-09-01-at-12.40.38.png' },
    { id: '2', name: 'Starter Pack 2', price: 17000, image: 'https://www.ruparupa.com/blog/wp-content/uploads/2020/09/Screen-Shot-2020-09-01-at-13.04.28.png' },
    { id: '3', name: 'Starter Pack 3', price: 17000, image: 'https://www.ruparupa.com/blog/wp-content/uploads/2020/09/Screen-Shot-2020-09-01-at-13.20.41.png' },
    { id: '4', name: 'Starter Pack 4', price: 17000, image: 'https://www.ruparupa.com/blog/wp-content/uploads/2020/09/Screen-Shot-2020-09-01-at-15.43.22.png' },
    { id: '5', name: 'Starter Pack 5', price: 17000, image: 'https://www.99.co/id/panduan/wp-content/uploads/2023/09/16200808/Monstera-adansonii.jpg' },
    { id: '6', name: 'Starter Pack 6', price: 17000, image: 'https://www.ruparupa.com/blog/wp-content/uploads/2020/09/Screen-Shot-2020-09-01-at-15.53.14.png' },
    { id: '7', name: 'Starter Pack 7', price: 17000, image: 'https://www.ruparupa.com/blog/wp-content/uploads/2020/09/Screen-Shot-2020-09-01-at-16.03.01.png' },
    { id: '8', name: 'Starter Pack 8', price: 17000, image: 'https://www.ruparupa.com/blog/wp-content/uploads/2020/09/Screen-Shot-2020-09-01-at-12.40.38.png' },
    { id: '9', name: 'Starter Pack 9', price: 17000, image: 'https://www.ruparupa.com/blog/wp-content/uploads/2020/09/Screen-Shot-2020-09-01-at-12.40.38.png' },
    { id: '10', name: 'Starter Pack 10', price: 17000, image: 'https://www.ruparupa.com/blog/wp-content/uploads/2020/09/Screen-Shot-2020-09-01-at-12.40.38.png' },
    { id: '11', name: 'Starter Pack 11', price: 17000, image: 'https://www.ruparupa.com/blog/wp-content/uploads/2020/09/Screen-Shot-2020-09-01-at-12.40.38.png' },
    { id: '12', name: 'Starter Pack 12', price: 17000, image: 'https://www.ruparupa.com/blog/wp-content/uploads/2020/09/Screen-Shot-2020-09-01-at-12.40.38.png' },
    // Add more products as needed
];

const ShopScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderProduct = ({ item }) => (
        <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>Rp. {item.price}</Text>
            <TouchableOpacity 
                style={styles.shopButton} 
                onPress={() => navigation.navigate('ShopInfoScreen', { product: item })}
            >
                <Text style={styles.shopButtonText}>Buy</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>{"<"}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Plant Market</Text>
            </View>
            <TextInput
                style={styles.searchBar}
                placeholder="Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredProducts}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.productList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 50, // Menambahkan padding top untuk menggeser header ke bawah
        backgroundColor: '#fff',
        
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        fontSize: 24,
        color: '#000',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10, // Menambahkan margin kiri untuk mendekatkan dengan tombol back
    },
    searchBar: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        marginBottom: 16,
    },
    productList: {
        paddingBottom: 16,
    },
    productContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        margin: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
    },
    productImage: {
        width: '100%',
        height: 175,
        objectFit: 'cover',
        marginBottom: 10,
        borderRadius: 15
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 14,
        marginBottom: 8,
    },
    shopButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#4caf50',
        borderRadius: 10,
    },
    shopButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
});

export default ShopScreen;