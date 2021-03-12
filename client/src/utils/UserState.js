import React, { useContext, createContext, useReducer } from "react";
// Don't forget to import all of your actions!
import { ADD_USER, LOGIN_USER, LOGOUT_USER } from "./action.js";

const UserContext = createContext();
const { Provider } = UserContext;

const reducer = (state, action) => {
  switch (action.type) {
  
  case ADD_USER:
    return {
      ...state,
      user: action.user,
      isSignedUp: true,
    }

  case LOGIN_USER:
    console.log("action.user in global state =",action.user);
    return {
      ...state,
      user: action.user,
      userToken: action.user.accessToken,
      isLoggedIn: true,
    }
    case LOGOUT_USER:
    return {
      ...state,
      user: {},
      userToken: "",
      isLoggedIn: false,
    }
  default:
    return state;
  }
};

const UserProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: {},
    userToken: "",
    isLoggedIn: false,
    isSignedUp: false,
  });

  return <Provider value={[state, dispatch]} {...props}/>;
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
