import React, { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export const authContext = createContext(null);

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usernameLogin, setUsernameLogin] = useState('');

  const checkLogin = async () => {
    try {
      const token = await SecureStore.getItemAsync('access_token');
      const username = await SecureStore.getItemAsync('username');
      setIsSignedIn(!!token);
      setUsernameLogin(username || null);
    } catch (error) {
      console.error('Error checking login status', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    // Dummy login check
    if (email === 'user@mail.com' && password === '12345') {
      await SecureStore.setItemAsync('access_token', 'dummy-token');
      await SecureStore.setItemAsync('username', 'user@mail.com');
      setIsSignedIn(true);
      setUsernameLogin('user@mail.com');
    } else {
      console.error('Invalid credentials');
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('username');
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
        usernameLogin,
        setUsernameLogin,
        login,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
