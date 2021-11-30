import axios from "axios";
import { config } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("token");
    if (value !== null) {
      // value previously stored
      console.log(value);
      return value;
    }
  } catch (e) {
    // error reading value
    return e;
  }
};

export const saveUser = (data) => {
  return axios
    .post(`${config.api_url}/api/v1/user/add`, data)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const loginUser = (data) => {
  return axios
    .post(`${config.api_url}/api/v1/user/login`, data)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const checkToken = async (token) => {
  return axios
    .post(`${config.api_url}/api/v1/user/checkToken`, {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getOneUser = (id) => {
  return axios
    .get(`${config.api_url}/api/v1/user/${id}`)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const sendNotif = (data, token) => {
  return axios
    .post(config.api_url + "/api/v1/notif", data, {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
