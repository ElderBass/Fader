import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

function stepSequencer() {


    return (
        <tone-example label="Step Sequencer">
            <tone-loader></tone-loader>
            <div id="content">
                <tone-play-toggle></tone-play-toggle>
                <tone-slider label="tempo" units="bpm" min="60" max="240" value="120"></tone-slider>
                <tone-step-sequencer id="test"></tone-step-sequencer>
            </div>
        </tone-example>
    )
}

export default stepSequencer;