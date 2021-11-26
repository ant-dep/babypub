import { CONNECT_USER, LOGOUT_USER } from "../actions/user/actions-types";

//on initialise une objet avec deux propriété infos (objet vide) et isLogged qui est false
const initialState = {
  infos: {},
  isLogged: false,
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case CONNECT_USER:
      return { infos: action.payload, isLogged: true };

    case LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
  return state;
}
