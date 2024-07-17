import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PaymentSuccessScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Payment Successful!</Text>
      {/* Tambahkan elemen tambahan sesuai kebutuhan */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 20,
  },
  // Tambahkan style tambahan sesuai kebutuhan
});

export default PaymentSuccessScreen;
