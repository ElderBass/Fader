import React, { useState, useEffect, useRef } from "react";
import { useUserContext } from "../../utils/UserState";
import MIDISounds from "midi-sounds-react";
import { CURRENT_MIX } from "../../utils/action.js";
import AddMixForm from "./AddMixForm";
import API from "../../utils/API";
import "./RealStepSequencer.css";


const TestSequencer = (props) => {
  const [state, dispatch] = useUserContext();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [drumState, setDrumState] = useState({
    kick1: 0,
    kick2: 8,
    kick3: 9,
    snare1: 15,
    snare2: 18,
    snare3: 19,
    misc1: 55,
    misc2: 36,
    misc3: 20,
    misc4: 21,
    misc5: 82,
    misc6: 171,
    tracks: state.currentMix,

    data: [],
    beats: [],
    bpm: 120,
  });

  const midiSounds = useRef();

  useEffect(() => {
      console.log("current mix inside sequencer use effect = ", state.currentMix);
      let beats = [];
    for (var i = 0; i < 16; i++) {
      var drums = [];
      if (state.currentMix[0][i]) {
        drums.push(drumState.misc6);
      }
      if (state.currentMix[1][i]) {
        drums.push(drumState.misc5);
      }
      if (state.currentMix[2][i]) {
        drums.push(drumState.misc4);
      }
      if (state.currentMix[3][i]) {
        drums.push(drumState.misc3);
      }
      if (state.currentMix[4][i]) {
        drums.push(drumState.misc2);
      }
      if (state.currentMix[5][i]) {
        drums.push(drumState.misc1);
      }
      if (state.currentMix[6][i]) {
        drums.push(drumState.snare3);
      }
      if (state.currentMix[7][i]) {
        drums.push(drumState.snare2);
      }
      if (state.currentMix[8][i]) {
        drums.push(drumState.snare1);
      }
      if (state.currentMix[9][i]) {
        drums.push(drumState.kick3);
      }
      if (state.currentMix[10][i]) {
        drums.push(drumState.kick2);
      }
      if (state.currentMix[11][i]) {
        drums.push(drumState.kick1);
      }
      var beat = [drums, []];

      beats[i] = beat;
    }
      setDrumState({
        ...drumState,
        initialized: true,
        beats: beats,
        tracks: state.currentMix,
      });
      console.log("beats in use effect = ", drumState.beats);
  }, [state.currentMix, drumState.tracks]);

  //make function to check if current checkbox map matches the new currentMix map

  const onSelectDrumSnare = (e) => {
    var list = e.target;
    var n = list.options[list.selectedIndex].getAttribute("value");
    midiSounds.current.cacheDrum(n);
    //var me = this;
    midiSounds.current.player.loader.waitLoad(function () {
      setDrumState({
        ...drumState,
        drumSnare: n,
      });
      fillBeat();
    });
  };

  const onSelectDrumBass = (e) => {
    var list = e.target;
    var n = list.options[list.selectedIndex].getAttribute("value");
    midiSounds.current.cacheDrum(n);
    //var me = this;
    midiSounds.current.player.loader.waitLoad(function () {
      setDrumState({
        ...drumState,
        drumBass: n,
      });
      fillBeat();
    });
  };
  const onSelectDrumHiHat = (e) => {
    var list = e.target;
    var n = list.options[list.selectedIndex].getAttribute("value");
    midiSounds.current.cacheDrum(n);
    //var me = this;
    midiSounds.current.player.loader.waitLoad(function () {
      setDrumState({
        ...drumState,
        drumHiHat: n,
      });
      fillBeat();
    });
  };
  const onSelectDrumClap = (e) => {
    var list = e.target;
    var n = list.options[list.selectedIndex].getAttribute("value");
    midiSounds.current.cacheDrum(n);
    //var me = this;
    midiSounds.current.player.loader.waitLoad(function () {
      setDrumState({
        ...drumState,
        drumClap: n,
      });
      fillBeat();
    });
  };
  const createSelectItems = () => {
    if (midiSounds.current) {
      // if (!(items)) {
      let items = [];
      for (
        let i = 0;
        i < midiSounds.current.player.loader.drumKeys().length;
        i++
      ) {
        items.push(
          <option key={i} value={i}>
            {"" +
              (i + 0) +
              ". " +
              midiSounds.current.player.loader.drumInfo(i).title}
          </option>
        );
      }
      return items;
    }
  };
  const fillBeat = () => {
    let beats = [];
    for (var i = 0; i < 16; i++) {
      var drums = [];
      if (drumState.tracks[0][i]) {
        drums.push(drumState.misc6);
      }
      if (drumState.tracks[1][i]) {
        drums.push(drumState.misc5);
      }
      if (drumState.tracks[2][i]) {
        drums.push(drumState.misc4);
      }
      if (drumState.tracks[3][i]) {
        drums.push(drumState.misc3);
      }
      if (drumState.tracks[4][i]) {
        drums.push(drumState.misc2);
      }
      if (drumState.tracks[5][i]) {
        drums.push(drumState.misc1);
      }
      if (drumState.tracks[6][i]) {
        drums.push(drumState.snare3);
      }
      if (drumState.tracks[7][i]) {
        drums.push(drumState.snare2);
      }
      if (drumState.tracks[8][i]) {
        drums.push(drumState.snare1);
      }
      if (drumState.tracks[9][i]) {
        drums.push(drumState.kick3);
      }
      if (drumState.tracks[10][i]) {
        drums.push(drumState.kick2);
      }
      if (drumState.tracks[11][i]) {
        drums.push(drumState.kick1);
      }
      var beat = [drums, []];

      beats[i] = beat;
    }

    setDrumState({
      ...drumState,
      beats: beats,
    });
  };
  const playLoop = () => {
    console.log("playing, tracks", drumState.tracks);
    console.log("playing, beats", drumState.beats);
    fillBeat();
    midiSounds.current.startPlayLoop(drumState.beats, drumState.bpm, 1 / 16);
  };

  const stopLoop = () => {
    midiSounds.current.stopPlayLoop();
  };

  const toggleDrum = (track, step) => {
    var a = drumState.tracks;
    a[track][step] = !a[track][step];
    setDrumState({
      ...drumState,
      tracks: a,
    });
    fillBeat();
  };

  const handleBPMChange = (e) => {
    let bpm = e.target.value;
    setDrumState({
      ...drumState,
      bpm: bpm,
    });
  };

  const handleSaveMix = (e) => {
    e.preventDefault();
    let body = {
        name: e.target.mixName.value,
        mixArr: drumState.tracks,
        userId: state.user._id,
    };
    console.log("body inside handle save mix = ", body);
    API.addMix(body)
      .then((result) => {
        console.log("result inside add Mix = ", result.data);
        dispatch({
          type: CURRENT_MIX,
          mix: result.data.mixArr,
        });
      })
      .catch((err) => console.log(err));
    setShow(false);
  };

  const resetTable = () => {
      let currentMix = [
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ]
      ];
      dispatch({
          type: CURRENT_MIX,
          mix: currentMix
      })
  }

  return (
    <div className="App">
      <form>
        {/* <button id="startBtn" type="button">start</button>
                    <button id="stopBtn" type="button">stop</button> */}
        <div id="bpmValue">
          BPM
          <input
            id="bpm"
            name="slider"
            type="range"
            min="1"
            max="250"
            step="1"
            value={drumState.bpm}
            onChange={handleBPMChange}
          ></input>
        <input
          type="number"
          id="bpmValue"
          name="amountInput"
          min="1"
          max="250"
          value={drumState.bpm}
          onChange={handleBPMChange}
        />
        </div>
      </form>
      <table align="center">
        <tbody>
          <tr>
            <td>
              <select id="soundList"
                value={drumState.misc6}
                onChange={() => onSelectDrumBass}
              >
                {createSelectItems()}
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[0][0]}
                defaultChecked={drumState.tracks[0][0]}
                onChange={(e) => toggleDrum(0, 0)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[0][1]}
                defaultChecked={drumState.tracks[0][1]}
                onChange={(e) => toggleDrum(0, 1)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[0][2]}
                defaultChecked={drumState.tracks[0][2]}
                onChange={(e) => toggleDrum(0, 2)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[0][3]}
                defaultChecked={drumState.tracks[0][3]}
                onChange={(e) => toggleDrum(0, 3)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[0][4]}
                defaultChecked={drumState.tracks[0][4]}
                onChange={(e) => toggleDrum(0, 4)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[0][5]}
                defaultChecked={drumState.tracks[0][5]}
                onChange={(e) => toggleDrum(0, 5)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[0][6]}
                defaultChecked={drumState.tracks[0][6]}
                onChange={(e) => toggleDrum(0, 6)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[0][7]}
                defaultChecked={drumState.tracks[0][7]}
                onChange={(e) => toggleDrum(0, 7)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[0][8]}
                defaultChecked={drumState.tracks[0][8]}
                onChange={(e) => toggleDrum(0, 8)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[0][9]}
                defaultChecked={drumState.tracks[0][9]}
                onChange={(e) => toggleDrum(0, 9)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[0][10]}
                defaultChecked={drumState.tracks[0][10]}
                onChange={(e) => toggleDrum(0, 10)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[0][11]}
                defaultChecked={drumState.tracks[0][11]}
                onChange={(e) => toggleDrum(0, 11)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[0][12]}
                defaultChecked={drumState.tracks[0][12]}
                onChange={(e) => toggleDrum(0, 12)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[0][13]}
                defaultChecked={drumState.tracks[0][13]}
                onChange={(e) => toggleDrum(0, 13)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[0][14]}
                defaultChecked={drumState.tracks[0][14]}
                onChange={(e) => toggleDrum(0, 14)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[0][15]}
                defaultChecked={drumState.tracks[0][15]}
                onChange={(e) => toggleDrum(0, 15)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <select id="soundList"
                value={drumState.misc5}
                onChange={() => onSelectDrumSnare}
              >
                {createSelectItems()}
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[1][0]}
                defaultChecked={drumState.tracks[1][0]}
                onChange={(e) => toggleDrum(1, 0)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[1][1]}
                defaultChecked={drumState.tracks[1][1]}
                onChange={(e) => toggleDrum(1, 1)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[1][2]}
                defaultChecked={drumState.tracks[1][2]}
                onChange={(e) => toggleDrum(1, 2)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[1][3]}
                defaultChecked={drumState.tracks[1][3]}
                onChange={(e) => toggleDrum(1, 3)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[1][4]}
                defaultChecked={drumState.tracks[1][4]}
                onChange={(e) => toggleDrum(1, 4)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[1][5]}
                defaultChecked={drumState.tracks[1][5]}
                onChange={(e) => toggleDrum(1, 5)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[1][6]}
                defaultChecked={drumState.tracks[1][6]}
                onChange={(e) => toggleDrum(1, 6)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[1][7]}
                defaultChecked={drumState.tracks[1][7]}
                onChange={(e) => toggleDrum(1, 7)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[1][8]}
                defaultChecked={drumState.tracks[1][8]}
                onChange={(e) => toggleDrum(1, 8)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[1][9]}
                defaultChecked={drumState.tracks[1][9]}
                onChange={(e) => toggleDrum(1, 9)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[1][10]}
                defaultChecked={drumState.tracks[1][10]}
                onChange={(e) => toggleDrum(1, 10)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[1][11]}
                defaultChecked={drumState.tracks[1][11]}
                onChange={(e) => toggleDrum(1, 11)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[1][12]}
                defaultChecked={drumState.tracks[1][12]}
                onChange={(e) => toggleDrum(1, 12)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[1][13]}
                defaultChecked={drumState.tracks[1][13]}
                onChange={(e) => toggleDrum(1, 13)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[1][14]}
                defaultChecked={drumState.tracks[1][14]}
                onChange={(e) => toggleDrum(1, 14)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[1][15]}
                defaultChecked={drumState.tracks[1][15]}
                onChange={(e) => toggleDrum(1, 15)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <select id="soundList"
                value={drumState.misc4}
                onChange={() => onSelectDrumClap}
              >
                {createSelectItems()}
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[2][0]}
                defaultChecked={drumState.tracks[2][0]}
                onChange={(e) => toggleDrum(2, 0)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[2][1]}
                defaultChecked={drumState.tracks[2][1]}
                onChange={(e) => toggleDrum(2, 1)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[2][2]}
                defaultChecked={drumState.tracks[2][2]}
                onChange={(e) => toggleDrum(2, 2)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[2][3]}
                defaultChecked={drumState.tracks[2][3]}
                onChange={(e) => toggleDrum(2, 3)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[2][4]}
                defaultChecked={drumState.tracks[2][4]}
                onChange={(e) => toggleDrum(2, 4)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[2][5]}
                defaultChecked={drumState.tracks[2][5]}
                onChange={(e) => toggleDrum(2, 5)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[2][6]}
                defaultChecked={drumState.tracks[2][6]}
                onChange={(e) => toggleDrum(2, 6)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[2][7]}
                defaultChecked={drumState.tracks[2][7]}
                onChange={(e) => toggleDrum(2, 7)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[2][8]}
                defaultChecked={drumState.tracks[2][8]}
                onChange={(e) => toggleDrum(2, 8)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[2][9]}
                defaultChecked={drumState.tracks[2][9]}
                onChange={(e) => toggleDrum(2, 9)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[2][10]}
                defaultChecked={drumState.tracks[2][10]}
                onChange={(e) => toggleDrum(2, 10)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[2][11]}
                defaultChecked={drumState.tracks[2][11]}
                onChange={(e) => toggleDrum(2, 11)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[2][12]}
                defaultChecked={drumState.tracks[2][12]}
                onChange={(e) => toggleDrum(2, 12)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[2][13]}
                defaultChecked={drumState.tracks[2][13]}
                onChange={(e) => toggleDrum(2, 13)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[2][14]}
                defaultChecked={drumState.tracks[2][14]}
                onChange={(e) => toggleDrum(2, 14)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[2][15]}
                defaultChecked={drumState.tracks[2][15]}
                onChange={(e) => toggleDrum(2, 15)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <select id="soundList"
                value={drumState.misc3}
                onChange={() => onSelectDrumHiHat}
              >
                {createSelectItems()}
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[3][0]}
                defaultChecked={drumState.tracks[3][0]}
                onChange={(e) => toggleDrum(3, 0)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[3][1]}
                defaultChecked={drumState.tracks[3][1]}
                onChange={(e) => toggleDrum(3, 1)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[3][2]}
                defaultChecked={drumState.tracks[3][2]}
                onChange={(e) => toggleDrum(3, 2)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[3][3]}
                defaultChecked={drumState.tracks[3][3]}
                onChange={(e) => toggleDrum(3, 3)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[3][4]}
                defaultChecked={drumState.tracks[3][4]}
                onChange={(e) => toggleDrum(3, 4)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[3][5]}
                defaultChecked={drumState.tracks[3][5]}
                onChange={(e) => toggleDrum(3, 5)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[3][6]}
                defaultChecked={drumState.tracks[3][6]}
                onChange={(e) => toggleDrum(3, 6)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[3][7]}
                defaultChecked={drumState.tracks[3][7]}
                onChange={(e) => toggleDrum(3, 7)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[3][8]}
                defaultChecked={drumState.tracks[3][8]}
                onChange={(e) => toggleDrum(3, 8)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[3][9]}
                defaultChecked={drumState.tracks[3][9]}
                onChange={(e) => toggleDrum(3, 9)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[3][10]}
                defaultChecked={drumState.tracks[3][10]}
                onChange={(e) => toggleDrum(3, 10)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[3][11]}
                defaultChecked={drumState.tracks[3][11]}
                onChange={(e) => toggleDrum(3, 11)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[3][12]}
                defaultChecked={drumState.tracks[3][12]}
                onChange={(e) => toggleDrum(3, 12)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[3][13]}
                defaultChecked={drumState.tracks[3][13]}
                onChange={(e) => toggleDrum(3, 13)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[3][14]}
                defaultChecked={drumState.tracks[3][14]}
                onChange={(e) => toggleDrum(3, 14)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[3][15]}
                defaultChecked={drumState.tracks[3][15]}
                onChange={(e) => toggleDrum(3, 15)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <select id="soundList"
                value={drumState.misc2}
                onChange={() => onSelectDrumBass}
              >
                {createSelectItems()}
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[4][0]}
                defaultChecked={drumState.tracks[4][0]}
                onChange={(e) => toggleDrum(4, 0)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[4][1]}
                defaultChecked={drumState.tracks[4][1]}
                onChange={(e) => toggleDrum(4, 1)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[4][2]}
                defaultChecked={drumState.tracks[4][2]}
                onChange={(e) => toggleDrum(4, 2)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[4][3]}
                defaultChecked={drumState.tracks[4][3]}
                onChange={(e) => toggleDrum(4, 3)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[4][4]}
                defaultChecked={drumState.tracks[4][4]}
                onChange={(e) => toggleDrum(4, 4)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[4][5]}
                defaultChecked={drumState.tracks[4][5]}
                onChange={(e) => toggleDrum(4, 5)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[4][6]}
                defaultChecked={drumState.tracks[4][6]}
                onChange={(e) => toggleDrum(4, 6)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[4][7]}
                defaultChecked={drumState.tracks[4][7]}
                onChange={(e) => toggleDrum(4, 7)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[4][8]}
                defaultChecked={drumState.tracks[4][8]}
                onChange={(e) => toggleDrum(4, 8)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[4][9]}
                defaultChecked={drumState.tracks[4][9]}
                onChange={(e) => toggleDrum(4, 9)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[4][10]}
                defaultChecked={drumState.tracks[4][10]}
                onChange={(e) => toggleDrum(4, 10)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[4][11]}
                defaultChecked={drumState.tracks[4][11]}
                onChange={(e) => toggleDrum(4, 11)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[4][12]}
                defaultChecked={drumState.tracks[4][12]}
                onChange={(e) => toggleDrum(4, 12)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[4][13]}
                defaultChecked={drumState.tracks[4][13]}
                onChange={(e) => toggleDrum(4, 13)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[4][14]}
                defaultChecked={drumState.tracks[4][14]}
                onChange={(e) => toggleDrum(4, 14)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[4][15]}
                defaultChecked={drumState.tracks[4][15]}
                onChange={(e) => toggleDrum(4, 15)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <select id="soundList"
                value={drumState.misc1}
                onChange={() => onSelectDrumBass}
              >
                {createSelectItems()}
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[5][0]}
                defaultChecked={drumState.tracks[5][0]}
                onChange={(e) => toggleDrum(5, 0)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[5][1]}
                defaultChecked={drumState.tracks[5][1]}
                onChange={(e) => toggleDrum(5, 1)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[5][2]}
                defaultChecked={drumState.tracks[5][2]}
                onChange={(e) => toggleDrum(5, 2)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[5][3]}
                defaultChecked={drumState.tracks[5][3]}
                onChange={(e) => toggleDrum(5, 3)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[5][4]}
                defaultChecked={drumState.tracks[5][4]}
                onChange={(e) => toggleDrum(5, 4)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[5][5]}
                defaultChecked={drumState.tracks[5][5]}
                onChange={(e) => toggleDrum(5, 5)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[5][6]}
                defaultChecked={drumState.tracks[5][6]}
                onChange={(e) => toggleDrum(5, 6)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[5][7]}
                defaultChecked={drumState.tracks[5][7]}
                onChange={(e) => toggleDrum(5, 7)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[5][8]}
                defaultChecked={drumState.tracks[5][8]}
                onChange={(e) => toggleDrum(5, 8)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[5][9]}
                defaultChecked={drumState.tracks[5][9]}
                onChange={(e) => toggleDrum(5, 9)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[5][10]}
                defaultChecked={drumState.tracks[5][10]}
                onChange={(e) => toggleDrum(5, 10)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[5][11]}
                defaultChecked={drumState.tracks[5][11]}
                onChange={(e) => toggleDrum(5, 11)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[5][12]}
                defaultChecked={drumState.tracks[5][12]}
                onChange={(e) => toggleDrum(5, 12)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[5][13]}
                defaultChecked={drumState.tracks[5][13]}
                onChange={(e) => toggleDrum(5, 13)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[5][14]}
                defaultChecked={drumState.tracks[5][14]}
                onChange={(e) => toggleDrum(5, 14)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[5][15]}
                defaultChecked={drumState.tracks[5][15]}
                onChange={(e) => toggleDrum(5, 15)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <select id="soundList"
                value={drumState.snare3}
                onChange={() => onSelectDrumBass}
              >
                {createSelectItems()}
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[6][0]}
                defaultChecked={drumState.tracks[6][0]}
                onChange={(e) => toggleDrum(6, 0)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[6][1]}
                defaultChecked={drumState.tracks[6][1]}
                onChange={(e) => toggleDrum(6, 1)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[6][2]}
                defaultChecked={drumState.tracks[6][2]}
                onChange={(e) => toggleDrum(6, 2)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[6][3]}
                defaultChecked={drumState.tracks[6][3]}
                onChange={(e) => toggleDrum(6, 3)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[6][4]}
                defaultChecked={drumState.tracks[6][4]}
                onChange={(e) => toggleDrum(6, 4)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[6][5]}
                defaultChecked={drumState.tracks[6][5]}
                onChange={(e) => toggleDrum(6, 5)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[6][6]}
                defaultChecked={drumState.tracks[6][6]}
                onChange={(e) => toggleDrum(6, 6)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[6][7]}
                defaultChecked={drumState.tracks[6][7]}
                onChange={(e) => toggleDrum(6, 7)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[6][8]}
                defaultChecked={drumState.tracks[6][8]}
                onChange={(e) => toggleDrum(6, 8)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[6][9]}
                defaultChecked={drumState.tracks[6][9]}
                onChange={(e) => toggleDrum(6, 9)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[6][10]}
                defaultChecked={drumState.tracks[6][10]}
                onChange={(e) => toggleDrum(6, 10)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[6][11]}
                defaultChecked={drumState.tracks[6][11]}
                onChange={(e) => toggleDrum(6, 11)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[6][12]}
                defaultChecked={drumState.tracks[6][12]}
                onChange={(e) => toggleDrum(6, 12)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[6][13]}
                defaultChecked={drumState.tracks[6][13]}
                onChange={(e) => toggleDrum(6, 13)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[6][14]}
                defaultChecked={drumState.tracks[6][14]}
                onChange={(e) => toggleDrum(6, 14)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[6][15]}
                defaultChecked={drumState.tracks[6][15]}
                onChange={(e) => toggleDrum(6, 15)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <select id="soundList"
                value={drumState.snare2}
                onChange={() => onSelectDrumBass}
              >
                {createSelectItems()}
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[7][0]}
                defaultChecked={drumState.tracks[7][0]}
                onChange={(e) => toggleDrum(7, 0)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[7][1]}
                defaultChecked={drumState.tracks[7][1]}
                onChange={(e) => toggleDrum(7, 1)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[7][2]}
                defaultChecked={drumState.tracks[7][2]}
                onChange={(e) => toggleDrum(7, 2)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[7][3]}
                defaultChecked={drumState.tracks[7][3]}
                onChange={(e) => toggleDrum(7, 3)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[7][4]}
                defaultChecked={drumState.tracks[7][4]}
                onChange={(e) => toggleDrum(7, 4)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[7][5]}
                defaultChecked={drumState.tracks[7][5]}
                onChange={(e) => toggleDrum(7, 5)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[7][6]}
                defaultChecked={drumState.tracks[7][6]}
                onChange={(e) => toggleDrum(7, 6)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[7][7]}
                defaultChecked={drumState.tracks[7][7]}
                onChange={(e) => toggleDrum(7, 7)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[7][8]}
                defaultChecked={drumState.tracks[7][8]}
                onChange={(e) => toggleDrum(7, 8)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[7][9]}
                defaultChecked={drumState.tracks[7][9]}
                onChange={(e) => toggleDrum(7, 9)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[7][10]}
                defaultChecked={drumState.tracks[7][10]}
                onChange={(e) => toggleDrum(7, 10)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[7][11]}
                defaultChecked={drumState.tracks[7][11]}
                onChange={(e) => toggleDrum(7, 11)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[7][12]}
                defaultChecked={drumState.tracks[7][12]}
                onChange={(e) => toggleDrum(7, 12)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[7][13]}
                defaultChecked={drumState.tracks[7][13]}
                onChange={(e) => toggleDrum(7, 13)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[7][14]}
                defaultChecked={drumState.tracks[7][14]}
                onChange={(e) => toggleDrum(7, 14)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[7][15]}
                defaultChecked={drumState.tracks[7][15]}
                onChange={(e) => toggleDrum(7, 15)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <select id="soundList"
                value={drumState.snare1}
                onChange={() => onSelectDrumBass}
              >
                {createSelectItems()}
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[8][0]}
                defaultChecked={drumState.tracks[8][0]}
                onChange={(e) => toggleDrum(8, 0)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[8][1]}
                defaultChecked={drumState.tracks[8][1]}
                onChange={(e) => toggleDrum(8, 1)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[8][2]}
                defaultChecked={drumState.tracks[8][2]}
                onChange={(e) => toggleDrum(8, 2)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[8][3]}
                defaultChecked={drumState.tracks[8][3]}
                onChange={(e) => toggleDrum(8, 3)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[8][4]}
                defaultChecked={drumState.tracks[8][4]}
                onChange={(e) => toggleDrum(8, 4)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[8][5]}
                defaultChecked={drumState.tracks[8][5]}
                onChange={(e) => toggleDrum(8, 5)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[8][6]}
                defaultChecked={drumState.tracks[8][6]}
                onChange={(e) => toggleDrum(8, 6)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[8][7]}
                defaultChecked={drumState.tracks[8][7]}
                onChange={(e) => toggleDrum(8, 7)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[8][8]}
                defaultChecked={drumState.tracks[8][8]}
                onChange={(e) => toggleDrum(8, 8)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[8][9]}
                defaultChecked={drumState.tracks[8][9]}
                onChange={(e) => toggleDrum(8, 9)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[8][10]}
                defaultChecked={drumState.tracks[8][10]}
                onChange={(e) => toggleDrum(8, 10)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[8][11]}
                defaultChecked={drumState.tracks[8][11]}
                onChange={(e) => toggleDrum(8, 11)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[8][12]}
                defaultChecked={drumState.tracks[8][12]}
                onChange={(e) => toggleDrum(8, 12)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[8][13]}
                defaultChecked={drumState.tracks[8][13]}
                onChange={(e) => toggleDrum(8, 13)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[8][14]}
                defaultChecked={drumState.tracks[8][14]}
                onChange={(e) => toggleDrum(8, 14)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[8][15]}
                defaultChecked={drumState.tracks[8][15]}
                onChange={(e) => toggleDrum(8, 15)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <select id="soundList"
                value={drumState.kick3}
                onChange={() => onSelectDrumBass}
              >
                {createSelectItems()}
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[9][0]}
                defaultChecked={drumState.tracks[9][0]}
                onChange={(e) => toggleDrum(9, 0)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[9][1]}
                defaultChecked={drumState.tracks[9][1]}
                onChange={(e) => toggleDrum(9, 1)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[9][2]}
                defaultChecked={drumState.tracks[9][2]}
                onChange={(e) => toggleDrum(9, 2)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[9][3]}
                defaultChecked={drumState.tracks[9][3]}
                onChange={(e) => toggleDrum(9, 3)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[9][4]}
                defaultChecked={drumState.tracks[9][4]}
                onChange={(e) => toggleDrum(9, 4)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[9][5]}
                defaultChecked={drumState.tracks[9][5]}
                onChange={(e) => toggleDrum(9, 5)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[9][6]}
                defaultChecked={drumState.tracks[9][6]}
                onChange={(e) => toggleDrum(9, 6)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[9][7]}
                defaultChecked={drumState.tracks[9][7]}
                onChange={(e) => toggleDrum(9, 7)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[9][8]}
                defaultChecked={drumState.tracks[9][8]}
                onChange={(e) => toggleDrum(9, 8)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[9][9]}
                defaultChecked={drumState.tracks[9][9]}
                onChange={(e) => toggleDrum(9, 9)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[9][10]}
                defaultChecked={drumState.tracks[9][10]}
                onChange={(e) => toggleDrum(9, 10)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[9][11]}
                defaultChecked={drumState.tracks[9][11]}
                onChange={(e) => toggleDrum(9, 11)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[9][12]}
                defaultChecked={drumState.tracks[9][12]}
                onChange={(e) => toggleDrum(9, 12)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[9][13]}
                defaultChecked={drumState.tracks[9][13]}
                onChange={(e) => toggleDrum(9, 13)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[9][14]}
                defaultChecked={drumState.tracks[9][14]}
                onChange={(e) => toggleDrum(9, 14)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[9][15]}
                defaultChecked={drumState.tracks[9][15]}
                onChange={(e) => toggleDrum(9, 15)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <select id="soundList"
                value={drumState.kick2}
                onChange={() => onSelectDrumBass}
              >
                {createSelectItems()}
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[10][0]}
                defaultChecked={drumState.tracks[10][0]}
                onChange={(e) => toggleDrum(10, 0)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[10][1]}
                defaultChecked={drumState.tracks[10][1]}
                onChange={(e) => toggleDrum(10, 1)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[10][2]}
                defaultChecked={drumState.tracks[10][2]}
                onChange={(e) => toggleDrum(10, 2)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[10][3]}
                defaultChecked={drumState.tracks[10][3]}
                onChange={(e) => toggleDrum(10, 3)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[10][4]}
                defaultChecked={drumState.tracks[10][4]}
                onChange={(e) => toggleDrum(10, 4)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[10][5]}
                defaultChecked={drumState.tracks[10][5]}
                onChange={(e) => toggleDrum(10, 5)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[10][6]}
                defaultChecked={drumState.tracks[10][6]}
                onChange={(e) => toggleDrum(10, 6)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[10][7]}
                defaultChecked={drumState.tracks[10][7]}
                onChange={(e) => toggleDrum(10, 7)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[10][8]}
                defaultChecked={drumState.tracks[10][8]}
                onChange={(e) => toggleDrum(10, 8)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[10][9]}
                defaultChecked={drumState.tracks[10][9]}
                onChange={(e) => toggleDrum(10, 9)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[10][10]}
                defaultChecked={drumState.tracks[10][10]}
                onChange={(e) => toggleDrum(10, 10)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[10][11]}
                defaultChecked={drumState.tracks[10][11]}
                onChange={(e) => toggleDrum(10, 11)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[10][12]}
                defaultChecked={drumState.tracks[10][12]}
                onChange={(e) => toggleDrum(10, 12)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[10][13]}
                defaultChecked={drumState.tracks[10][13]}
                onChange={(e) => toggleDrum(10, 13)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[10][14]}
                defaultChecked={drumState.tracks[10][14]}
                onChange={(e) => toggleDrum(10, 14)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[10][15]}
                defaultChecked={drumState.tracks[10][15]}
                onChange={(e) => toggleDrum(10, 15)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <select id="soundList"
                value={drumState.kick1}
                onChange={() => onSelectDrumBass}
              >
                {createSelectItems()}
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[11][0]}
                defaultChecked={drumState.tracks[11][0]}
                onChange={(e) => toggleDrum(11, 0)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[11][1]}
                defaultChecked={drumState.tracks[11][1]}
                onChange={(e) => toggleDrum(11, 1)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[11][2]}
                defaultChecked={drumState.tracks[11][2]}
                onChange={(e) => toggleDrum(11, 2)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[11][3]}
                defaultChecked={drumState.tracks[11][3]}
                onChange={(e) => toggleDrum(11, 3)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[11][4]}
                defaultChecked={drumState.tracks[11][4]}
                onChange={(e) => toggleDrum(11, 4)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[11][5]}
                defaultChecked={drumState.tracks[11][5]}
                onChange={(e) => toggleDrum(11, 5)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[11][6]}
                defaultChecked={drumState.tracks[11][6]}
                onChange={(e) => toggleDrum(11, 6)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[11][7]}
                defaultChecked={drumState.tracks[11][7]}
                onChange={(e) => toggleDrum(11, 7)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[11][8]}
                defaultChecked={drumState.tracks[11][8]}
                onChange={(e) => toggleDrum(11, 8)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[11][9]}
                defaultChecked={drumState.tracks[11][9]}
                onChange={(e) => toggleDrum(11, 9)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[11][10]}
                defaultChecked={drumState.tracks[11][10]}
                onChange={(e) => toggleDrum(11, 10)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[11][11]}
                defaultChecked={drumState.tracks[11][11]}
                onChange={(e) => toggleDrum(11, 11)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[11][12]}
                defaultChecked={drumState.tracks[11][12]}
                onChange={(e) => toggleDrum(11, 12)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[11][13]}
                defaultChecked={drumState.tracks[11][13]}
                onChange={(e) => toggleDrum(11, 13)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[11][14]}
                defaultChecked={drumState.tracks[11][14]}
                onChange={(e) => toggleDrum(11, 14)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="checkboxCSS"
                checked={drumState.tracks[11][15]}
                defaultChecked={drumState.tracks[11][15]}
                onChange={(e) => toggleDrum(11, 15)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <p>
 features/dank-sequencer-css
        <button id="playPause" onClick={playLoop}>Play</button>
        <button id="playPause" onClick={stopLoop}>Stop</button>
        {state.isLoggedIn ? <button id="playPause" onClick={handleShow}>Save</button> : null}
      </p>
      <AddMixForm
        show={show}
        handleClose={handleClose}
        addMix={handleSaveMix}
      />
      <MIDISounds
        ref={midiSounds}
        appElementName="root"
        drums={[
          drumState.misc6,
          drumState.misc5,
          drumState.misc4,
          drumState.misc3,
          drumState.misc2,
          drumState.misc1,
          drumState.snare3,
          drumState.snare2,
          drumState.snare1,
          drumState.kick3,
          drumState.kick2,
          drumState.kick1,
        ]}
      />
      <hr />
    </div>
  );
};


export default TestSequencer;
