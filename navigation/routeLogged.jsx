import React from "react";
import Home from "../screens/Home";
import Admin from "../screens/Admin";
import AddPub from "../screens/AddPub";
import EditPub from "../screens/EditPub";
import Logout from "../screens/Logout";
import { NavigationContainer } from "@react-navigation/native"; //container qui gère l'environnement du router et son branchement à l'application
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; //permet de créer un menu customisé, directement branché sur le router
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons"; //librairie d'icones (comme fontawesome)

const Stack = createBottomTabNavigator(); //déclaration du menu de pied de page.
//Stack Navigator permet à votre application de passer d'un écran à l'autre, chaque nouvel écran étant placé au-dessus d'une pile. (on peut en créer plusieurs)
//stack.screen crée le lien du menu qui va nous afficher le composant lorsque l'on clique dessus.
const HomeStack = createStackNavigator();
const AdminStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
}

function AdminStackScreen() {
  return (
    <AdminStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminStack.Screen name="Admin" component={Admin} />
      <AdminStack.Screen name="EditPub" component={EditPub} />
    </AdminStack.Navigator>
  );
}

const RouteLogged = () => {
  return (
    <NavigationContainer styles={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "ios-person-add" : "ios-person-add-outline";
            }
            if (route.name === "Logout") {
              iconName = focused ? "ios-exit" : "ios-exit-outline";
            }

            if (route.name === "AddPub") {
              iconName = focused ? "ios-add-outline" : "ios-add-circle-outline";
            }

            if (route.name === "Admin") {
              iconName = focused ? "md-book" : "ios-book-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "grey",
          headerShown: false,
        })}
      >
        <Stack.Screen
          name="Home"
          component={HomeStackScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="AddPub"
          component={AddPub}
          options={{ title: "AddPub" }}
        />
        <Stack.Screen
          name="Admin"
          component={AdminStackScreen}
          options={{ title: "Admin" }}
        />
        <Stack.Screen
          name="Logout"
          component={Logout}
          options={{ title: "Logout" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouteLogged;
