import React, { useState } from 'react';
import { View, ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const PaymentScreen = ({ route, navigation }) => {
  const { transactionToken } = route.params;
  const [loading, setLoading] = useState(true);
  const [showWebView, setShowWebView] = useState(true);

  const handleWebViewNavigationStateChange = (navState) => {
    const { url } = navState;
    if (!url) return;

    if (url.includes('status_code=200')) {
      setShowWebView(false);
      navigation.navigate('PaymentSuccess'); 
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop: 20 }}>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -50 }, { translateY: -50 }] }}
          />
        )}
        {showWebView && (
          <WebView
            source={{ uri: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${transactionToken}` }}
            onLoadEnd={() => setLoading(false)}
            onNavigationStateChange={handleWebViewNavigationStateChange}
            startInLoadingState={true}
            renderLoading={() => (
              <ActivityIndicator size="large" color="rgb(249 115 22)" style={styles.loadingOverlay} />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default PaymentScreen;
