import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { saveUser } from "../api/user";

const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(false);

  const register = async () => {
    setError(false);
    let datas = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      zip: zip,
      city: city,
      phone: phone,
      password: password,
    };
    if (password !== "" && password === confirmPassword) {
      console.log(datas);
      let res = await saveUser(datas);
      if (res.status === 200) {
        props.navigation.navigate("Login");
      } else {
        setError({ error: true, message: "can't save user" });
      }
    } else {
      setError({
        error: true,
        message: "Les mots de passe ne correspondent pas",
      });
    }
  };

  return (
    <View>
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault(), register();
        }}
      >
        {error.error && <p>{error.message}</p>}
        <View>
          <TextInput
            onChangeText={(value) => {
              setFirstName(value);
            }}
            type="text"
            placeholder="first name"
          />
          <TextInput
            onChangeText={(value) => {
              setLastName(value);
            }}
            type="text"
            placeholder="last name"
          />
          <TextInput
            onChangeText={(value) => {
              setEmail(value);
            }}
            type="email"
            placeholder="email"
          />
          <TextInput
            onChangeText={(value) => {
              setAddress(value);
            }}
            type="text"
            placeholder="address"
          />
          <TextInput
            onChangeText={(value) => {
              setZip(value);
            }}
            type="text"
            placeholder="zip code"
          />
          <TextInput
            onChangeText={(value) => {
              setCity(value);
            }}
            type="text"
            placeholder="city"
          />
          <TextInput
            onChangeText={(value) => {
              setPhone(value);
            }}
            type="text"
            placeholder="phone"
          />
        </View>
        <View>
          <TextInput
            onChangeText={(value) => {
              setPassword(value);
            }}
            secureTextEntry={true}
            placeholder="Password"
          />
          <TextInput
            onChangeText={(value) => {
              setConfirmPassword(value);
            }}
            secureTextEntry={true}
            placeholder="Confirm Password"
          />
        </View>
        <button type="submit">Register</button>
      </form>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
