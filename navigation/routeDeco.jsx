import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Register from "../screens/Register";
import Login from "../screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createBottomTabNavigator();

const RouteDeco = (props) => {
  return (
    <NavigationContainer styles={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Login") {
              iconName = focused ? "ios-body" : "ios-man";
            } else if (route.name === "Register") {
              iconName = focused ? "ios-person-add" : "ios-person-add-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "grey",
          headerShown: false,
        })}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouteDeco;
