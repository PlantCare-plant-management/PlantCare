import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { authContext } from '../contexts/authContext';

export default function SplashScreen({ navigation }) {
  const { isSignedIn, loading } = useContext(authContext);

  useEffect(() => {
    if (!loading) {
      navigation.replace(isSignedIn ? 'Main' : 'LoginScreen');
    }
  }, [loading, isSignedIn, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Plant Management App</Text>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
