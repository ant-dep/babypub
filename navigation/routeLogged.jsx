import React from "react";
import Home from "../screens/Home";
import Admin from "../screens/Admin";
import AddPub from "../screens/AddPub";
import EditPub from "../screens/EditPub";
import Logout from "../screens/Logout";
import { NavigationContainer } from "@react-navigation/native"; //container qui gère l'environnement du router et son branchement à l'application
import { createNativeStackNavigator } from "@react-navigation/native-stack"; //permet de créer des routes vers nos pages
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; //permet de créer un menu customisé, directement branché sur le router
import Ionicons from "react-native-vector-icons/Ionicons"; //librairie d'icones (comme fontawesome)
import { connect } from "react-redux";

const Stack = createBottomTabNavigator(); //déclaration du menu de pied de page.
//Stack Navigator permet à votre application de passer d'un écran à l'autre, chaque nouvel écran étant placé au-dessus d'une pile. (on peut en créer plusieurs)
//stack.screen crée le lien du menu qui va nous afficher le composant lorsque l'on clique dessus.
const Routes = (props) => {
  return (
    <NavigationContainer styles={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "ios-person-add" : "ios-person-add-outline";
            } else if (route.name === "Pubs") {
              iconName = focused ? "ios-people" : "ios-people-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "grey",
          headerShown: false,
        })}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Logout" component={Logout} />
      </Stack.Navigator>
      {props.user.infos.role === "admin" && (
        <Stack.Navigator>
          <Stack.Screen name="Admin" component={Admin} />
          <Stack.Screen name="AddPub" component={AddPub} />
          <Stack.Screen name="EditPub" component={EditPub} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const MapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

export default connect(MapStateToProps)(Routes);
