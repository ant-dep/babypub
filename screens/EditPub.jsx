import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { getCoords, getOnePub, editOnePub } from "../api/pub";
import { selectUser } from "../slices/userSlice";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";

const EditPub = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [lange, setLange] = useState(false);
  const [poussette, setPoussette] = useState(false);
  const [terrasse, setTerrasse] = useState(false);
  const [jeux, setJeux] = useState(false);

  const user = useSelector(selectUser);

  useEffect(() => {
    getOnePub(props.route.params.id)
      .then((res) => {
        console.log("pub", res);
        setName(res.data.pub.name);
        setDescription(res.data.pub.description);
        setAddress(res.data.pub.address);
        setZip(res.data.pub.zip.toString());
        setCity(res.data.pub.city);
        setLange(res.data.pub.lange);
        setPoussette(res.data.pub.poussette);
        setTerrasse(res.data.pub.terrasse);
        setJeux(res.data.pub.jeux);
      })
      .catch((err) => {
        console.log("can't get pub", err);
      });
  }),
    [user];
  console.log("zip", zip);

  const onSubmitForm = () => {
    //appel de la fonction getCoords en lui envoyant les argument addresse et zip
    getCoords(address, zip)
      .then((res) => {
        console.log(res);
        //tu récupère les coordonées retournées par la réponse
        let lat = res.features[0].geometry.coordinates[1];
        let lng = res.features[0].geometry.coordinates[0];
        console.log(lat);
        console.log(lng);
        //tu crées un gros objet data qu'on enverra vers le back (req.body) name,description,address, zip, city, lange,poussette, terrasse, jeux, user_id, lat, lng
        let data = {
          name: name,
          description: description,
          address: address,
          zip: zip,
          city: city,
          lange: lange,
          poussette: poussette,
          terrasse: terrasse,
          jeux: jeux,
          user_id: user.infos.id,
          lat: lat,
          lng: lng,
        };
        //appel de la fonction ajax qui enregistre le pub dans l'api_back
        savePub(data, user.infos.token)
          .then((response) => {
            console.log(response);
            props.navigation.navigate("Home");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.title}>Ajouter un bar</Text>
          <TextInput
            style={styles.input}
            type="text"
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />
          <TextInput
            style={styles.textarea}
            type="text"
            value={description}
            numberOfLines={5}
            multiline={true}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
          <TextInput
            style={styles.input}
            type="text"
            value={address}
            onChangeText={(text) => {
              setAddress(text);
            }}
          />
          <TextInput
            style={styles.input}
            type="text"
            value={zip}
            keyboardType="numeric"
            maxLength={5}
            onChangeText={(text) => {
              setZip(text);
            }}
          />
          <TextInput
            style={styles.input}
            type="text"
            value={city}
            onChangeText={(text) => {
              setCity(text);
            }}
          />

          <BouncyCheckbox
            size={25}
            fillColor="red"
            unfillColor="#FFFFFF"
            text="Lange"
            iconStyle={{ borderColor: "red" }}
            textStyle={{ fontFamily: "Arial" }}
            style={styles.checkBox}
            onPress={() => {
              setLange(!lange);
            }}
          />

          <BouncyCheckbox
            size={25}
            fillColor="red"
            unfillColor="#FFFFFF"
            text="Poussette"
            iconStyle={{ borderColor: "red" }}
            textStyle={{ fontFamily: "Arial" }}
            style={styles.checkBox}
            onPress={() => {
              setPoussette(!poussette);
            }}
          />

          <BouncyCheckbox
            size={25}
            fillColor="red"
            unfillColor="#FFFFFF"
            text="Terrasse"
            iconStyle={{ borderColor: "red" }}
            textStyle={{ fontFamily: "Arial" }}
            style={styles.checkBox}
            onPress={() => {
              setTerrasse(!terrasse);
            }}
          />

          <BouncyCheckbox
            size={25}
            fillColor="red"
            unfillColor="#FFFFFF"
            text="Jeux"
            iconStyle={{ borderColor: "red" }}
            textStyle={{ fontFamily: "Arial" }}
            style={styles.checkBox}
            onPress={() => {
              setJeux(!jeux);
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onSubmitForm();
            }}
          >
            <Text style={styles.buttonText}>Enregistrer</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 40,
    color: "black",
  },
  scrollContainer: {
    width: wp("100%"),
    textAlign: "center",
    paddingVertical: hp("5%"),
  },
  input: {
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    width: wp("60%"),
    height: 40,
    marginBottom: 15,
    marginLeft: wp("20%"),
    paddingLeft: wp("5%"),
  },
  textarea: {
    backgroundColor: "white",
    width: wp("60%"),
    height: 120,
    borderRadius: 10,
    marginBottom: 15,
    marginLeft: wp("20%"),
    paddingLeft: wp("5%"),
  },
  checkBox: {
    flex: 1,
    paddingLeft: wp("20%"),
    paddingBottom: 10,
  },
  button: {
    backgroundColor: "#321aed",
    width: wp("40%"),
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: wp("30%"),
    marginTop: 20,
  },
  buttonText: {
    color: "white",
  },
});

export default EditPub;
