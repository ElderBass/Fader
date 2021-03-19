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
        <Link to="/" >
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
                    <Link to="/" id="routerLink">
                      <span className="profileLink">
                        {state.user.stageName}
                      </span>
                    </Link>
                  </p>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/logout"><p className="logoutLink">LOG OUT</p> </Link>
                </Nav.Link>
              </>
            ) : (
              <Nav.Link>
                <Link to="/login"><p className="loginLink">LOG IN</p></Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );

}

export default NavTabs;
