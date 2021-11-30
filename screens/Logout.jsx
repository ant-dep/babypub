import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setLogout } from "../slices/userSlice";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    await AsyncStorage.removeItem("token");
    dispatch(setLogout(null));
    console.log("logout");
  }, []);

  return (
    <View>
      <Text>Logout</Text>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({});
