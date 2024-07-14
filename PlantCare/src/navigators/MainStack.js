import React, { useContext } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import MyPlantScreen from "../screens/MyPlantScreen";
import PlantInfoScreen from "../screens/PlantInfoScreen";
import AddPlantScreen from "../screens/AddPlantScreen";
import AddPlantFormScreen from "../screens/AddPlantFormScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import PreferenceScreen from "../screens/PreferenceScreen";
import SplashScreen from "../screens/SplashScreen";

import { authContext } from "../contexts/authContext";
import AddRoomPlantsScreen from "../screens/AddRoomPlantsScreen";
import FaqScreen from "../screens/FaqScreen";
import { Text, TouchableOpacity } from "react-native";
import NotificationSetting from "../screens/NotificationSetting";
import { View } from "react-native";
import EditProfileScreen from "../screens/EditProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "MyPlant") {
            iconName = "leaf";
          } else if (route.name === "AddPlant") {
            iconName = "add-circle";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          display: "flex",
        },
      })}
    >
      <Tab.Screen name="MyPlant" component={MyPlantScreen} />
      <Tab.Screen name="AddPlant" component={AddPlantScreen} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function MainStack() {
  const { isSignedIn, loading } = useContext(authContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        {!loading && !isSignedIn ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Preference"
              component={PreferenceScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PlantInfo"
              component={PlantInfoScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="AddPlantForm"
              component={AddPlantFormScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="AddRoomPlant"
              component={AddRoomPlantsScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Faq"
              component={FaqScreen}
              options={({ navigation }) => ({
                headerShown: true,
                title: "",
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Ionicons name="arrow-back" size={24} color="black" />
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        Profile
                      </Text>
                    </View>
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={({ navigation }) => ({
                headerShown: true,
                title: "",
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Ionicons name="arrow-back" size={24} color="black" />
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        Profile
                      </Text>
                    </View>
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="notification"
              component={NotificationSetting}
              options={({ navigation }) => ({
                headerShown: true,
                title: "Notification Setting",
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                  </TouchableOpacity>
                ),
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
