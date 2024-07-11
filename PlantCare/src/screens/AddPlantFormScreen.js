import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddPlantFormScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { plant } = route.params;

  const [photo, setPhoto] = useState('');
  const [name, setName] = useState(plant.name || '');
  const [location, setLocation] = useState('');

  const handleAddPlant = () => {
    // Handle adding plant logic here
    navigation.navigate('MyPlant');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fill in the Information</Text>
      <TouchableOpacity style={styles.imageContainer} onPress={() => {}}>
        <Image source={{ uri: photo || "https://via.placeholder.com/300" }} style={styles.image} />
        <View style={styles.uploadIconContainer}>
          <Icon name="camera" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Plant Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddPlant}>
        <Text style={styles.addButtonText}>Add Plant</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: 200,
    height: 200,
  },
  uploadIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 50,
    padding: 8,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddPlantFormScreen;
