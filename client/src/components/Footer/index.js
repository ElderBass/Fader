import React from "react";
import {Link} from "react-router-dom";
import "./style.css"

function Footer() {


    return(
    <footer className="footer" id="quilavaFooter">

        <Link to="/">Home</Link>
        <p>Fader&#174; 2021</p>
    </footer>
    )
}

export default Footer;