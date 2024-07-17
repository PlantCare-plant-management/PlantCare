import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PaymentFailedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Payment Failed!</Text>
      {/* Tambahkan pesan atau alasan mengapa pembayaran gagal */}
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
    color: '#D32F2F',
    marginBottom: 20,
  },
  // Tambahkan style tambahan sesuai kebutuhan
});

export default PaymentFailedScreen;
