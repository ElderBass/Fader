import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import MIDISounds from 'midi-sounds-react';

class BpmSlider extends Component {
    document.getElementById('bpm').addEventListener('input', e => {
        Tone.Transport.bpm.rampTo(+e.target.value, 0.1);
    
    });
render() {
    return (
        <form>
            <button id="startBtn" type="button">start</button>
            <button id="stopBtn" type="button">stop</button>
            <div>BPM <input id="bpm" name="slider" type="range" min="1" max="250" step="1" value="120" oninput="this.form.amountInput.value=this.value"></input></div>
            <input type="number" id="bpmValue" name="amountInput" min="1" max="250" value="120"
                oninput="this.form.slider.value=this.value" />
        </form>
    );
}
}

export default BpmSlider;
