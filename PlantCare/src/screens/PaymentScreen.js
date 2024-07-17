import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const PaymentScreen = ({ route, navigation }) => {
  const { transactionToken } = route.params;
  const [loading, setLoading] = useState(true);

  const handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (!url) return;

    // Cek apakah URL mengandung parameter yang menunjukkan pembayaran berhasil
    if (url.includes('payment/success')) {
      navigation.navigate('PaymentSuccess'); // Navigasi ke layar sukses pembayaran
    } else if (url.includes('payment/failed')) {
      navigation.navigate('PaymentFailed'); // Navigasi ke layar gagal pembayaran
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ position: 'absolute', top: '50%', left: '50%' }}
        />
      )}
      <WebView
        source={{ uri: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${transactionToken}` }}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleWebViewNavigationStateChange}
      />
    </View>
  );
};

export default PaymentScreen;
