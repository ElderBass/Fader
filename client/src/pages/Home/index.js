import React, { useEffect } from "react";
import { useUserContext } from "../../utils/UserState";
import UserProfile from "../Profile/UserProfile/UserProfile";
import LandingModules from "../../components/LandingModules";
import { IS_LOGGED_IN } from "../../utils/action";
import "./style.css"


const Home = (props, { history }) => {
  const [state, dispatch] = useUserContext();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      dispatch({
        type: IS_LOGGED_IN,
        user: foundUser,
        token: foundUser.accessToken,
      });
    }
  }, []);

  return (
    <div>
      {state.isLoggedIn ? (
        <UserProfile />
      ) : (
        <div className="homeContainer">
          {/* really we'll want the landing component to appear here */}
          <LandingModules />
        </div>
      )}
    </div>
  );
};

export default Home;
