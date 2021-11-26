import React from "react";
import RequireAuthData from "./helpers/requireAuthData";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <RequireAuthData />
    </Provider>
  );
}
