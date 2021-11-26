import { configureStore } from "@reduxjs/toolkit";
// import { applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
import userReducer from "./userSlice";

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
const store = configureStore({
  reducer: {
    user: userReducer,
  }, //composedEnhancer
});

export default store;
