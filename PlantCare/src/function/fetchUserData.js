import * as SecureStore from "expo-secure-store";

export const fetchUserData = async () => {
  try {
    const token = await SecureStore.getItemAsync("access_token");
    console.log(process.env.EXPO_PUBLIC_API_URL + `/user`, "<====");
    if (token) {
      const response = await fetch(process.env.EXPO_PUBLIC_API_URL + `/user`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch user data");
      }
    }
  } catch (error) {
    console.error("Error fetching user data", error);
  }
};
