import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupForm from "./components/SignupForm";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Browse from "./pages/BrowseArtists/BrowseArtists";
import { UserProvider } from "./utils/UserState";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <Navbar />


          <div className="mainContainer">
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignupForm} />
            <Route exact path="/login" component={Login} />
            <Route path="/artists" component={Browse} />
            {/* <Route exact path="/drumpad" component={Drumpad} />
        <Route exact path="/profile" component={UserProfile} /> */}
          </div>
          <Footer />
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
