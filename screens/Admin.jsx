import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getPubByUser, deleteOnePub } from "../api/pub";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";
import { sendNotif } from "../api/user";
import * as Notifications from "expo-notifications";
import { SafeAreaView } from "react-native-safe-area-context";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Admin = (props) => {
  const [pubs, setPubs] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    getPubByUser(user.infos.id)
      .then((response) => {
        console.log("mes pubs", response);
        setPubs(response.data.pubs);
      })
      .catch((err) => console.log(err));
  }, [props]);

  const goToEdit = (id) => {
    props.navigation.navigate("EditPub", { id: id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Admin</Text>
      {user.infos !== null && (
        <TouchableOpacity
          style={styles.buttonBlue}
          onPress={(e) => {
            let data = {
              token: user.infos.uuid,
              msg: "Oh j'envoie une notif",
            };
            console.log("NOTIF", data);

            sendNotif(data, user.infos.token)
              .then((response) => {
                console.log(response);
              })
              .catch((err) => console.log(err));
          }}
        >
          <Text style={styles.buttonText}>Envoi notif</Text>
        </TouchableOpacity>
      )}
      {pubs.length > 0 ? (
        <ScrollView style={styles.scrollContainer}>
          {pubs.map((pub) => {
            return (
              <View style={{ flex: 1, flexDirection: "row" }} key={pub.id}>
                <View style={{ flex: 3, padding: 10 }}>
                  <Text style={styles.itemTitle}>{pub.name}</Text>
                  <Text style={styles.text}>
                    {pub.address} {pub.zip} {pub.city}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={styles.buttonEdit}
                    onPress={() => {
                      goToEdit(pub.id);
                    }}
                  >
                    <Text style={styles.buttonText}>modifier</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonDelete}
                    onPress={() => {
                      deleteOnePub(pub.id, user.infos.token).then(() => {
                        getPubByUser(user.infos.token).then((response) => {
                          console.log(response);
                          setPubs(response.pubs);
                        });
                      });
                    }}
                  >
                    <Text style={styles.buttonText}>supprimer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <Text style={styles.text}>Attente des pubs</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  title: {
    color: "black",
    fontSize: 26,
    textAlign: "center",
    marginTop: hp("5%"),
  },
  scrollview: {
    width: wp("90%"),
    marginLeft: wp("5%"),
    paddingTop: 25,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    marginVertical: 10,
  },
  buttonBlue: {
    backgroundColor: "blue",
    width: wp("60%"),
    marginHorizontal: wp("20%"),
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  buttonDelete: {
    backgroundColor: "darkred",
    padding: 10,
  },
  buttonEdit: {
    backgroundColor: "darkblue",
    padding: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
  },
  text: {
    color: "black",
    fontSize: 18,
  },
});

export default Admin;
