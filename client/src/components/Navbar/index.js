import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../../assets/images/faderLogo.png";
import { useUserContext } from "../../utils/UserState";
import "./Navbar.css";

function NavTabs() {
  const [state, dispatch] = useUserContext();

  return (
    <div className="NavTabs">
      <Navbar>
        <Link to="/">
          <Navbar.Brand>
            <img
              src={logo}
              style={{ height: "50px" }}
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ms-auto" id="navButtons">
              {state.isLoggedIn ? (
                <>
                  <Nav.Link>
                    <p style={{ color: "#7D7D7D" }}>
                      Welcome,{" "}
                      <span style={{ color: "#C12A75" }}>
                        {state.user.stageName}
                      </span>
                    </p>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/logout">LOG OUT </Link>
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link>
                  <Link to="/login">LOG IN</Link>
                </Nav.Link>
              )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );

  // We'll go into the Hooks API later, for now, we are just using some code
  // from the react-router docs (https://reacttraining.com/react-router/web/api/Hooks/uselocation)
  // This allows the component to check the route any time the user uses a link to navigate.
  // const location = useLocation();

  //need to just make a style.css for this component
  // const styles = {
  //   navbar: {
  //       backgroundColor: "#191919"
  //   },
  //   fader: {
  //       color: "#C12A75",
  //       fontSize: "24px"
  //   },
  //   login: {
  //       color: "#C12A75"
  //   }
  // };

  // return (
  //   <nav className="navbar navbar-expand-lg navbar-dark" style={styles.navbar} >
  //     <div className="container-fluid">
  //       <Link style={styles.fader} className="navbar-brand" to="/">
  //         fader
  //       </Link>
  //       <button
  //         className="navbar-toggler"
  //         type="button"
  //         data-bs-toggle="collapse"
  //         data-bs-target="#navbarSupportedContent"
  //         aria-controls="navbarSupportedContent"
  //         aria-expanded="false"
  //         aria-label="Toggle navigation"
  //       >
  //         <span className="navbar-toggler-icon"></span>
  //       </button>

  //       <div className="collapse navbar-collapse" id="navbarSupportedContent">
  //         <ul className="navbar-nav me-auto mb-2 mb-lg-0">

  //         </ul>
  //         <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
  //           <li className="nav-item">
  //             <button
  //               className="btn btn-default"
  //               data-bs-toggle="modal"
  //               data-bs-target="#loginModal"
  //               style={styles.login}
  //             >
  //               Login
  //             </button>
  //           </li>

  //           {/* <li className="nav-item"><span class="nav-link" id="welcome-msg">Welcome, User</span></li>
  //                           <li className="nav-item" id="jumpToMyProfile"><Link className="nav-link"
  //                                   style="color: rgb(255, 255, 255); font-size: 18px;" href="/profile">My
  //                                   Profile</Link></li> */}
  //           {/* <li className="nav-item" id="logoutLink"><Link className="nav-link"
  //                                   style="color: white; font-size: 18px;" to="/logout">Logout</Link></li> */}
  //         </ul>
  //       </div>
  //     </div>
  //   </nav>
  // );
}

export default NavTabs;
