import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavTabs() {
  // We'll go into the Hooks API later, for now, we are just using some code
  // from the react-router docs (https://reacttraining.com/react-router/web/api/Hooks/uselocation)
  // This allows the component to check the route any time the user uses a link to navigate.
 // const location = useLocation();

  //need to just make a style.css for this component
  const styles = {
    navbar: {
        backgroundColor: "#242582"
    },
    fader: {
        color: "#F64C72",
        fontSize: "24px"
    },
    navLink: {
        color: "rgb(255, 255, 255)",
        fontSize: "18px"
    },
    signup: {
        backgroundColor: "#F64C72",
    },
    login: {
        backgroundColor: "#F64C72",
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={styles.navbar} >
      <div className="container-fluid">
        <Link style={styles.fader} className="navbar-brand" to="/">
          Fader
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link"
                style={styles.navLink}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/drumpad"
                style={styles.navLink}
              >
                Enter Studio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={styles.navLink}
                to="/artists"
                id="browseAll"
              >
                Browse Artists
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#signUpModal"
                className="btn btn-default"
                style={styles.signup}
              >
                Signup
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-default"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
                style={styles.login}
              >
                Login
              </button>
            </li>

            {/* <li className="nav-item"><span class="nav-link" id="welcome-msg">Welcome, User</span></li>
                            <li className="nav-item" id="jumpToMyProfile"><Link className="nav-link"
                                    style="color: rgb(255, 255, 255); font-size: 18px;" href="/profile">My
                                    Profile</Link></li> */}
            {/* <li className="nav-item" id="logoutLink"><Link className="nav-link"
                                    style="color: white; font-size: 18px;" to="/logout">Logout</Link></li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavTabs;
