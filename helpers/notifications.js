import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import axios from "axios";
import { config } from "../config";

export const registerForPushNotificationsAsync = async (id) => {
  console.log("ça part de la ");
  //Si le phone supporte les notifs
  if (Constants.isDevice) {
    //on va vérifier dans les permissions si il a accepté les notifs
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    //résultat du status de permission
    let finalStatus = existingStatus;
    //si il n'est pas accepté
    if (existingStatus !== "granted") {
      console.log("status not granted");
      //on demande si il veut recevoir les push notifications
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    //si il n'a pas été accepté
    if (finalStatus !== "granted") {
      console.log("pas de final status");
      alert("Failed to get push token for push notification!");
      return;
    }
    //recupération d'un token spécial de push notif
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("l uuid token", token);
    //mise à jour de la bdd de l'utilisateur
    let data = {
      uuid: token,
      id: id,
    };
    //on enregistre le token de pushnotif
    axios
      .put(config.api_url + "/api/v1/user/updateUuid", data)
      .then((res) => {})
      .catch((err) => {
        console.log("err", err);
      });
  } else {
    //push notifs non tolérés par le phone
    alert("Must use physical device for Push Notifications");
  }
};
