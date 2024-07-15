// OptionScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OptionScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Buy Plant or Add Existing Plant ?</Text>
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('ShopScreen')}>
        <Text style={styles.optionButtonText}>Buy new plant</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('AddPlantScreen')}>
        <Text style={styles.optionButtonText}>Add Exist</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#fff',
  },
  optionButton: {
    width: '80%',
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButtonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default OptionScreen;