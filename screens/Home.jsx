import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import CheckBox from "react-native-check-box";
import Slider from "@react-native-community/slider";
import { getPubs, getPubWithFilters } from "../api/pub";

const Home = (props) => {
  const DEFAULT_COORD = {
    coords: {
      latitude: 48.859268,
      longitude: 2.34706,
    },
  };
  const [location, setLocation] = useState(DEFAULT_COORD);
  //states ici pour récup les values des options cochées
  const [lange, setLange] = useState(false);
  const [poussette, setPoussette] = useState(false);
  const [terrasse, setTerrasse] = useState(false);
  const [jeux, setJeux] = useState(false);
  const [distance, setDistance] = useState(1);
  const [pubs, setPubs] = useState([]);

  useEffect(async () => {
    await getGeolocAsync();
    /*await getPubs()
      .then((pubs) => {
        setPubs(pubs.pubs);
      })
      .catch((error) => {
        console.log(error);
      });*/
  }, []);

  useEffect(() => {
    console.log("useEffect", pubs);
  }, [pubs]);

  const getGeolocAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMessage("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const onSearchPub = () => {
    
    let data = {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
      lange: lange,
      poussette: poussette,
      terrasse: terrasse,
      jeux: jeux,
      distance: distance,
    };
    console.log("onSearchPub", data);
    getPubWithFilters(data)
      .then((res) => {
        console.log("COUCOU CA MARCHE", res);
        setPubs(res.pubs);
      })
      .catch((err) => {
        console.log("COUCOU ERREUR", err);
      });
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={{ flex: 2 }}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation={true}
          scrollEnabled={true}
          liteMode={false}
        >
          {pubs.length > 0 && (
            <>
              {pubs.map((pub) => {
                return (
                  <MapView.Marker
                    title={pub.name}
                    coordinate={{
                      latitude: parseFloat(pub.lat),
                      longitude: parseFloat(pub.lng),
                    }}
                    key={pub.id}
                    onPress={() => {
                      onSearchPub();
                    }}
                  >
                    <Callout>
                      <Text>{pub.name}</Text>
                      <Text>
                        {pub.address} {pub.zip} {pub.city}
                      </Text>
                      <TouchableOpacity>
                        <Text>{pub.description}</Text>
                      </TouchableOpacity>
                    </Callout>
                  </MapView.Marker>
                );
              })}
            </>
          )}
        </MapView>
      )}

      <View style={styles.commande}>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            style={styles.checkBox}
            onClick={() => {
              setLange(!lange);
            }}
            isChecked={lange}
            rightText={"Lange"}
            checkBoxColor="black"
            rightTextStyle={{ color: "black" }}
          />
          <CheckBox
            style={styles.checkBox}
            onClick={() => {
              setPoussette(!poussette);
            }}
            isChecked={poussette}
            rightText={"Poussette"}
            checkBoxColor="black"
            rightTextStyle={{ color: "black" }}
          />
        </View>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            style={styles.checkBox}
            onClick={() => {
              setTerrasse(!terrasse);
            }}
            isChecked={terrasse}
            rightText={"Terrasse"}
            checkBoxColor="black"
            rightTextStyle={{ color: "black" }}
          />
          <CheckBox
            style={styles.checkBox}
            onClick={() => {
              setJeux(!jeux);
            }}
            isChecked={jeux}
            rightText={"Jeux"}
            checkBoxColor="black"
            rightTextStyle={{ color: "black" }}
          />
        </View>
        <View style={styles.validateContainer}>
          <Slider
            style={{ width: wp("80%"), height: 40, marginLeft: wp("10%") }}
            minimumValue={1}
            maximumValue={10}
            step={1}
            minimumTrackTintColor="#321aed"
            maximumTrackTintColor="#321aed"
            thumbTintColor="#321aed"
            value={distance}
            onValueChange={(value) => {
              setDistance(value);
            }}
          />
          <Text style={styles.distance}>
            Distance de recherche : {distance} km
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onSearchPub();
            }}
          >
            <Text style={styles.text}>Rechercher</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  /*votre css perso*/
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
  distance: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 15,
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
    position: "absolute",
    bottom: 0,
    width: wp("100%"),
    height: hp("30%"),
    backgroundColor: "rgba(255, 255, 255, 0.8)",
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

export default Home;
