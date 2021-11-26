import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
// import { connect } from "react-redux";
import RouteLogged from "../navigation/routeLogged";
import RouteDeco from "../navigation/routeDeco";
// import { connectUser } from "../redux/actions/user/userAction";
import { checkToken, getData } from "../api/user";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUser } from "../redux/userSlice";

const RequireAuthData = () => {
  let dispatch = useDispatch();
  let user = useSelector(selectUser);

  useEffect(() => {
    let token = getData();

    if (user.isLogged && token) {
      checkToken(token)
        .then((res) => {
          if (res.status === 200) {
            dispatch(setUser(res.data));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  if (user.isLogged) {
    return <RouteLogged />;
  } else {
    return <RouteDeco />;
  }
};

// const mapStateToProps = (store) => {
//   return {
//     user: store.user,
//   };
// };

// const mapDispatchToProps = {
//   connectUser,
// };

export default RequireAuthData;
