import React, {useEffect} from "react";

import { useUserContext } from "../../utils/UserState";
import Profile from "../Profile/Profile";
import LandingModules from "../../components/LandingModules";

const Home = (props) => {

  const [state, dispatch] = useUserContext();

  useEffect(() => {
    console.log(state.user)
  }, []);

  return (
    <div>
      {state.isLoggedIn ? (
        <Profile />
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
