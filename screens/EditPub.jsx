import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  CheckBox,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getCoords, getOnePub, editOnePub } from "../api/pub";

const EditPub = () => {
  const onSubmitForm = async () => {};

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Ajouter un bar</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#42e5ff",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
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
  textarea: {
    backgroundColor: "white",
    width: wp("60%"),
    height: 120,
    marginBottom: 15,
    marginLeft: wp("20%"),
    paddingLeft: wp("5%"),
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  checkBox: {
    // alignSelf: "left",
    // marginBottom: 15,
    marginLeft: wp("20%"),
    marginRight: wp("4%"),
  },
  checkBoxText: {
    color: "white",
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
