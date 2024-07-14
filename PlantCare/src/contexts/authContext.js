import React, { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export const authContext = createContext(null);

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [emailLogin, setEmailLogin] = useState('');

  const checkLogin = async () => {
    try {
      const token = await SecureStore.getItemAsync('access_token');
      const email = await SecureStore.getItemAsync('email');
      setIsSignedIn(!!token);
      setemailLogin(email || null);
    } catch (error) {
      console.error('Error checking login status', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('email');
    setIsSignedIn(false);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <authContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
        loading,
        emailLogin,
        setEmailLogin,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
