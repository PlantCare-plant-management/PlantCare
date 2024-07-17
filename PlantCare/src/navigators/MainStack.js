import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import MyPlantScreen from "../screens/MyPlantScreen";
import PlantInfoScreen from "../screens/PlantInfoScreen";
import AddPlantScreen from "../screens/AddPlantScreen";
import AddPlantFormScreen from "../screens/AddPlantFormScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import PreferenceScreen from "../screens/PreferenceScreen";
import SplashScreen from "../screens/SplashScreen";

import { authContext } from "../contexts/authContext";
import AddRoomPlantsScreen from "../screens/AddRoomPlantsScreen";
import ShopScreen from "../screens/ShopScreen";
import OptionScreen from "../screens/OptionScreen";
import CameraScreen from "../screens/CameraScreen";
import ShopInfoScreen from "../screens/ShopInfoScreen";
import ShippingAddressScreen from "../screens/ShippingAddress";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import NotificationSetting from "../screens/NotificationSetting";
import FaqScreen from "../screens/FaqScreen";
import OptionBuy from "../screens/OptionBuy";
import AccountInformation from "../screens/AccountInformation";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import TutorialScreen from "../screens/TutorialScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  const { logout } = useContext(authContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "MyPlant") {
            iconName = "leaf";
            // } else if (route.name === "AddPlant") {
            //   iconName = "add-circle";
          } else if (route.name === "Shop") {
            iconName = "cart";
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
              onPress={() => navigation.navigate("OptionScreen")}
              style={{ marginRight: 16 }}
            >
              <Ionicons name="add-circle" size={30} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      {/* <Tab.Screen name="AddPlant" component={AddPlantScreen} /> */}
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Order History")}
              style={{ marginRight: 16 }}
            >
              <MaterialIcons name="history" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={logout}
              style={{
                marginRight: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Feather name="log-out" size={18} color="#000" />
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 14,
                  color: "#0d0f1b",
                  fontWeight: "bold",
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          ),
        })}
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
              name="LoginScreen"
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
              options={({ navigation }) => ({
                headerShown: true,
                title: "Plant Info",
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="AddPlantForm"
              component={AddPlantFormScreen}
              options={({ navigation }) => ({
                headerShown: true,
                title: "Add Plant",
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="AddRoomPlant"
              component={AddRoomPlantsScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="OptionScreen"
              component={OptionScreen}
              options={({ navigation }) => ({
                headerShown: true,
                title: "",
                headerLeft: () => (
                  <View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                ),
              })}
            />
            <Stack.Screen
              name="OptionBuy"
              component={OptionBuy}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ShopScreen"
              component={ShopScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TutorialScreen"
              component={TutorialScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="AddPlantScreen"
              component={AddPlantScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CameraScreen"
              component={CameraScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ShippingAddress"
              component={ShippingAddressScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ShopInfoScreen"
              component={ShopInfoScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Order History"
              component={OrderHistoryScreen}
              options={{ headerShown: true }}
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
              name="AccountInformation"
              component={AccountInformation}
              options={({ navigation }) => ({
                headerShown: true,
                title: "Account Information",
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
