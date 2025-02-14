import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainStack from './src/navigators/MainStack';
import { AuthProvider } from './src/contexts/authContext';

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <View style={styles.container}>
          <MainStack />
          <StatusBar style="auto" />
        </View>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
