import React, { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const authContext = createContext(null);

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [emailLogin, setEmailLogin] = useState("");

  const checkLogin = async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      const email = await SecureStore.getItemAsync("email");
      setIsSignedIn(!!token);
      setEmailLogin(email ? JSON.parse(email) : null);
    } catch (error) {
      console.error("Error checking login status", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(
        "https://768a-125-163-218-199.ngrok-free.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const { access_token, email, id } = await response.json();
        console.log(id, "<=== id di contexts");
        await SecureStore.setItemAsync("access_token", access_token);
        await SecureStore.setItemAsync("email", JSON.stringify(email));
        await SecureStore.setItemAsync("user_id", id); // Store the user ID
        setIsSignedIn(true);
        setEmailLogin(email);
      } else {
        console.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("email");
    await SecureStore.deleteItemAsync("user_id");
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
        login,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
