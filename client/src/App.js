import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Browse from "./pages/BrowseArtists/BrowseArtists";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <SignupForm />
        <LoginForm />
        <div className="mainContainer">
          <Route exact path="/" component={Home} />
          <Route path="/artists" component={Browse} />
          {/* <Route exact path="/drumpad" component={Drumpad} />
        <Route exact path="/profile" component={UserProfile} />
        <Route path="/artists" component={AllArtists} /> */}
        </div>
        <Footer/>
      </Router>

    </>
  );
}

export default App;
