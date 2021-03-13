import React, { useContext, createContext, useReducer } from "react";
// Don't forget to import all of your actions!
import { ADD_USER, ADD_CONNECTION, LOGIN_USER, UPDATE_USER, LOGOUT_USER, GET_ARTIST } from "./action.js";

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
  case UPDATE_USER:
    return {
      ...state,
      user: action.user,
      hasConnections: true,
    }
    case GET_ARTIST:
    return {
      ...state,
      targetId: action.id
    }
    case ADD_CONNECTION:
      return {
        ...state,
        hasConnections: true,
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
      isSignedUp: false,
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
    targetId: "",
    hasConnections: false,
  });

  return <Provider value={[state, dispatch]} {...props}/>;
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
