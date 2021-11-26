import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { loginUser } from "../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { connectUser } from "../redux/actions/user/userAction";
// import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const login = async () => {
    setError(false);
    let datas = {
      email: email,
      password: password,
    };
    if (email !== "" && password !== "") {
      let res = await loginUser(datas);
      if (res.status === 200) {
        let storage = await AsyncStorage.setItem("token", res.data.token);
        let user = res.data.user;
        user.token = res.data.token;
        // props.connectUser(user);
        dispatch(setUser(user));
      } else {
        setError({ error: true, message: "can't log user" });
      }
    } else {
      setError({
        error: true,
        message: "Veuillez completez les champs",
      });
    }
  };

  return (
    <View>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault(), login();
        }}
      >
        {error.error && <p>{error.message}</p>}
        <View>
          <TextInput
            onChangeText={(value) => {
              setEmail(value);
            }}
            type="email"
            placeholder="email"
          />
          <TextInput
            onChangeText={(value) => {
              setPassword(value);
            }}
            secureTextEntry={true}
            placeholder="Password"
          />
        </View>
        <button type="submit">Register</button>
      </form>
    </View>
  );
};

// const mapStateToProps = (store) => {
//   return {
//     user: store.user,
//   };
// };

// const mapDispatchToProps = {
//   connectUser,
// };

export default Login;

const styles = StyleSheet.create({});
