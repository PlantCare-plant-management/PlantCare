import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

const PaymentScreen = ({ route }) => {
  const { orderId, amount, customerDetails } = route.params;
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSnapToken = async () => {
      try {
        const apiUrl = Constants.manifest?.extra?.apiUrl || process.env.EXPO_PUBLIC_API_URL;
        console.log(apiUrl);
        const response = await fetch(`${apiUrl}/create-transaction`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ orderId, amount, customerDetails })
        });
        const data = await response.json();
        if (data.snapToken) {
          setPaymentUrl(`https://app.midtrans.com/snap/v2/vtweb/${data.snapToken}`);
        } else {
          console.error('Failed to get snap token:', data);
        }
      } catch (error) {
        console.error('Error fetching snap token:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSnapToken();
  }, [orderId, amount, customerDetails]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#388E3C" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Proceed to Payment</Text>
      {paymentUrl ? (
        <WebView
          source={{ uri: paymentUrl }}
          startInLoadingState={true}
          renderLoading={() => <ActivityIndicator size="large" color="#388E3C" />}
        />
      ) : (
        <Text>Error loading payment page</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PaymentScreen;
