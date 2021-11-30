import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RequireAuthData from "./helpers/requireAuthData";
import { Provider } from "react-redux";
import store from "./slices/store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === "IOS" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        >
          <RequireAuthData />
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </Provider>
  );
}
