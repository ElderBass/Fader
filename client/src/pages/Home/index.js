import React, { useEffect } from "react";
import { useUserContext } from "../../utils/UserState";
import UserProfile from "../Profile/UserProfile/UserProfile";
import LandingModules from "../../components/LandingModules";
import { IS_LOGGED_IN } from "../../utils/action";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Home = (props, { history }) => {
  console.log(history);
  const [state, dispatch] = useUserContext();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log("found user = ", foundUser);
      dispatch({
        type: IS_LOGGED_IN,
        user: foundUser,
        token: foundUser.accessToken,
      });
    }
  }, []);

  return (
    <div>
      <Navbar />
      {state.isLoggedIn ? (
        <UserProfile />
      ) : (
        <div className="homeContainer">
          {/* really we'll want the landing component to appear here */}
          <LandingModules />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
