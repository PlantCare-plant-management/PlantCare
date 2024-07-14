import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
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
import ShopScreen from "../screens/ShopScreen";
import OptionScreen from "../screens/OptionScreen";
import { TouchableOpacity } from "react-native";

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
          } else if (route.name === 'Shop') {
            iconName = 'cart';
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
      <Tab.Screen
          name="MyPlant"
          component={MyPlantScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("AddPlant")} // You can replace this with navigation.navigate("YourTargetScreen")
                style={{ marginRight: 16 }}
              >
                <Ionicons name="add-circle" size={30} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
      <Tab.Screen name="AddPlant" component={AddPlantScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
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
              name="OptionScreen"
              component={OptionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ShopScreen"
              component={ShopScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddPlantScreen"
              component={AddPlantScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}