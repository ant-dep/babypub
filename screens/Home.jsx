import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import CheckBox from "react-native-check-box";
import Slider from "@react-native-community/slider";
import { getAllPubs, getPubWithFilters } from "../api/pub";

const Home = (props) => {
  const DEFAULT_COORD = {
    coords: {
      latitude: 48.859268,
      longitude: 2.34706,
    },
  };
  const [location, setLocation] = useState(DEFAULT_COORD);
  //states ici pour récup les values des options cochées
  const [isOpen, setIsOpen] = useState(false);
  const [lange, setLange] = useState(false);
  const [poussette, setPoussette] = useState(false);
  const [terrasse, setTerrasse] = useState(false);
  const [jeux, setJeux] = useState(false);
  const [distance, setDistance] = useState(1);
  const [pubs, setPubs] = useState([]);

  useEffect(() => {}, []);

  const getGeolocAsync = async () => {};

  const onSearchPub = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#42e5ff",
  },
  /*votre css perso*/
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  scrollContainer: {
    width: wp("100%"),
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    width: wp("60%"),
    height: 40,
    marginBottom: 15,
    marginLeft: wp("20%"),
    paddingLeft: wp("5%"),
  },
  button: {
    backgroundColor: "#321aed",
    width: wp("40%"),
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: wp("30%"),
    marginTop: 10,
  },
  buttonText: {
    color: "white",
  },
  commande: {
    flex: 1,
  },
  checkBoxContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: wp("10%"),
  },
  checkBox: {
    flex: 1,
  },
  validateContainer: {
    flex: 3,
  },
});

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};
export default Home;
