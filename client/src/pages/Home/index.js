import React, {useEffect} from "react";

import { useUserContext } from "../../utils/UserState";
import UserProfile from "../Profile/UserProfile/UserProfile";
import LandingModules from "../../components/LandingModules";

const Home = (props) => {

  const [state, dispatch] = useUserContext();

  useEffect(() => {
    console.log(state.user)
  });

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
