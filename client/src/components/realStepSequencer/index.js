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
    drumSnare: 0,
    drumBass: 5,
    drumHiHat: 35,
    drumClap: 24,
    drumMisc1: 55,
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
        drums.push(drumState.drumMisc1);
      }
      if (state.currentMix[1][i]) {
        drums.push(drumState.drumSnare);
      }
      if (state.currentMix[2][i]) {
        drums.push(drumState.drumClap);
      }
      if (state.currentMix[3][i]) {
        drums.push(drumState.drumHiHat);
      }
      if (state.currentMix[4][i]) {
        drums.push(drumState.drumHiHat);
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
        drums.push(drumState.drumMisc1);
      }
      if (drumState.tracks[1][i]) {
        drums.push(drumState.drumSnare);
      }
      if (drumState.tracks[2][i]) {
        drums.push(drumState.drumClap);
      }
      if (drumState.tracks[3][i]) {
        drums.push(drumState.drumHiHat);
      }
      if (drumState.tracks[4][i]) {
        drums.push(drumState.drumHiHat);
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
    console.log("drumstate new sound = ", drumState.drumMisc1)
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
        <div>
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
        </div>
        <input
          type="number"
          id="bpmValue"
          name="amountInput"
          min="1"
          max="250"
          value={drumState.bpm}
          onChange={handleBPMChange}
        />
      </form>
      <table align="center">
        <tbody>
          <tr>
            <td>
              <select
                value={drumState.drumMisc1}
                onChange={() => onSelectDrumBass}
              >
                {createSelectItems()}
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[0][0]}
                defaultChecked={drumState.tracks[0][0]}
                onChange={(e) => toggleDrum(0, 0)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[0][1]}
                defaultChecked={drumState.tracks[0][1]}
                onChange={(e) => toggleDrum(0, 1)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[0][2]}
                defaultChecked={drumState.tracks[0][2]}
                onChange={(e) => toggleDrum(0, 2)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[0][3]}
                defaultChecked={drumState.tracks[0][3]}
                onChange={(e) => toggleDrum(0, 3)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[0][4]}
                defaultChecked={drumState.tracks[0][4]}
                onChange={(e) => toggleDrum(0, 4)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[0][5]}
                defaultChecked={drumState.tracks[0][5]}
                onChange={(e) => toggleDrum(0, 5)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[0][6]}
                defaultChecked={drumState.tracks[0][6]}
                onChange={(e) => toggleDrum(0, 6)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[0][7]}
                defaultChecked={drumState.tracks[0][7]}
                onChange={(e) => toggleDrum(0, 7)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[0][8]}
                defaultChecked={drumState.tracks[0][8]}
                onChange={(e) => toggleDrum(0, 8)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[0][9]}
                defaultChecked={drumState.tracks[0][9]}
                onChange={(e) => toggleDrum(0, 9)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[0][10]}
                defaultChecked={drumState.tracks[0][10]}
                onChange={(e) => toggleDrum(0, 10)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[0][11]}
                defaultChecked={drumState.tracks[0][11]}
                onChange={(e) => toggleDrum(0, 11)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[0][12]}
                defaultChecked={drumState.tracks[0][12]}
                onChange={(e) => toggleDrum(0, 12)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[0][13]}
                defaultChecked={drumState.tracks[0][13]}
                onChange={(e) => toggleDrum(0, 13)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[0][14]}
                defaultChecked={drumState.tracks[0][14]}
                onChange={(e) => toggleDrum(0, 14)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[0][15]}
                defaultChecked={drumState.tracks[0][15]}
                onChange={(e) => toggleDrum(0, 15)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <select
                value={drumState.drumSnare}
                onChange={() => onSelectDrumSnare}
              >
                {createSelectItems()}
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[1][0]}
                defaultChecked={drumState.tracks[1][0]}
                onChange={(e) => toggleDrum(1, 0)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[1][1]}
                defaultChecked={drumState.tracks[1][1]}
                onChange={(e) => toggleDrum(1, 1)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[1][2]}
                defaultChecked={drumState.tracks[1][2]}
                onChange={(e) => toggleDrum(1, 2)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[1][3]}
                defaultChecked={drumState.tracks[1][3]}
                onChange={(e) => toggleDrum(1, 3)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[1][4]}
                defaultChecked={drumState.tracks[1][4]}
                onChange={(e) => toggleDrum(1, 4)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[1][5]}
                defaultChecked={drumState.tracks[1][5]}
                onChange={(e) => toggleDrum(1, 5)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[1][6]}
                defaultChecked={drumState.tracks[1][6]}
                onChange={(e) => toggleDrum(1, 6)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[1][7]}
                defaultChecked={drumState.tracks[1][7]}
                onChange={(e) => toggleDrum(1, 7)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[1][8]}
                defaultChecked={drumState.tracks[1][8]}
                onChange={(e) => toggleDrum(1, 8)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[1][9]}
                defaultChecked={drumState.tracks[1][9]}
                onChange={(e) => toggleDrum(1, 9)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[1][10]}
                defaultChecked={drumState.tracks[1][10]}
                onChange={(e) => toggleDrum(1, 10)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[1][11]}
                defaultChecked={drumState.tracks[1][11]}
                onChange={(e) => toggleDrum(1, 11)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[1][12]}
                defaultChecked={drumState.tracks[1][12]}
                onChange={(e) => toggleDrum(1, 12)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[1][13]}
                defaultChecked={drumState.tracks[1][13]}
                onChange={(e) => toggleDrum(1, 13)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[1][14]}
                defaultChecked={drumState.tracks[1][14]}
                onChange={(e) => toggleDrum(1, 14)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[1][15]}
                defaultChecked={drumState.tracks[1][15]}
                onChange={(e) => toggleDrum(1, 15)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <select
                value={drumState.drumClap}
                onChange={() => onSelectDrumClap}
              >
                {createSelectItems()}
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[2][0]}
                defaultChecked={drumState.tracks[2][0]}
                onChange={(e) => toggleDrum(2, 0)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[2][1]}
                defaultChecked={drumState.tracks[2][1]}
                onChange={(e) => toggleDrum(2, 1)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[2][2]}
                defaultChecked={drumState.tracks[2][2]}
                onChange={(e) => toggleDrum(2, 2)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[2][3]}
                defaultChecked={drumState.tracks[2][3]}
                onChange={(e) => toggleDrum(2, 3)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[2][4]}
                defaultChecked={drumState.tracks[2][4]}
                onChange={(e) => toggleDrum(2, 4)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[2][5]}
                defaultChecked={drumState.tracks[2][5]}
                onChange={(e) => toggleDrum(2, 5)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[2][6]}
                defaultChecked={drumState.tracks[2][6]}
                onChange={(e) => toggleDrum(2, 6)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[2][7]}
                defaultChecked={drumState.tracks[2][7]}
                onChange={(e) => toggleDrum(2, 7)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[2][8]}
                defaultChecked={drumState.tracks[2][8]}
                onChange={(e) => toggleDrum(2, 8)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[2][9]}
                defaultChecked={drumState.tracks[2][9]}
                onChange={(e) => toggleDrum(2, 9)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[2][10]}
                defaultChecked={drumState.tracks[2][10]}
                onChange={(e) => toggleDrum(2, 10)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[2][11]}
                defaultChecked={drumState.tracks[2][11]}
                onChange={(e) => toggleDrum(2, 11)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[2][12]}
                defaultChecked={drumState.tracks[2][12]}
                onChange={(e) => toggleDrum(2, 12)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[2][13]}
                defaultChecked={drumState.tracks[2][13]}
                onChange={(e) => toggleDrum(2, 13)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[2][14]}
                defaultChecked={drumState.tracks[2][14]}
                onChange={(e) => toggleDrum(2, 14)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[2][15]}
                defaultChecked={drumState.tracks[2][15]}
                onChange={(e) => toggleDrum(2, 15)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <select
                value={drumState.drumHiHat}
                onChange={() => onSelectDrumHiHat}
              >
                {createSelectItems()}
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[3][0]}
                defaultChecked={drumState.tracks[3][0]}
                onChange={(e) => toggleDrum(3, 0)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[3][1]}
                defaultChecked={drumState.tracks[3][1]}
                onChange={(e) => toggleDrum(3, 1)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[3][2]}
                defaultChecked={drumState.tracks[3][2]}
                onChange={(e) => toggleDrum(3, 2)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[3][3]}
                defaultChecked={drumState.tracks[3][3]}
                onChange={(e) => toggleDrum(3, 3)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[3][4]}
                defaultChecked={drumState.tracks[3][4]}
                onChange={(e) => toggleDrum(3, 4)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[3][5]}
                defaultChecked={drumState.tracks[3][5]}
                onChange={(e) => toggleDrum(3, 5)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[3][6]}
                defaultChecked={drumState.tracks[3][6]}
                onChange={(e) => toggleDrum(3, 6)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[3][7]}
                defaultChecked={drumState.tracks[3][7]}
                onChange={(e) => toggleDrum(3, 7)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[3][8]}
                defaultChecked={drumState.tracks[3][8]}
                onChange={(e) => toggleDrum(3, 8)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[3][9]}
                defaultChecked={drumState.tracks[3][9]}
                onChange={(e) => toggleDrum(3, 9)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[3][10]}
                defaultChecked={drumState.tracks[3][10]}
                onChange={(e) => toggleDrum(3, 10)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[3][11]}
                defaultChecked={drumState.tracks[3][11]}
                onChange={(e) => toggleDrum(3, 11)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[3][12]}
                defaultChecked={drumState.tracks[3][12]}
                onChange={(e) => toggleDrum(3, 12)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[3][13]}
                defaultChecked={drumState.tracks[3][13]}
                onChange={(e) => toggleDrum(3, 13)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[3][14]}
                defaultChecked={drumState.tracks[3][14]}
                onChange={(e) => toggleDrum(3, 14)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[3][15]}
                defaultChecked={drumState.tracks[3][15]}
                onChange={(e) => toggleDrum(3, 15)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <select
                value={drumState.drumBass}
                onChange={() => onSelectDrumBass}
              >
                {createSelectItems()}
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[4][0]}
                defaultChecked={drumState.tracks[4][0]}
                onChange={(e) => toggleDrum(4, 0)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[4][1]}
                defaultChecked={drumState.tracks[4][1]}
                onChange={(e) => toggleDrum(4, 1)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[4][2]}
                defaultChecked={drumState.tracks[4][2]}
                onChange={(e) => toggleDrum(4, 2)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[4][3]}
                defaultChecked={drumState.tracks[4][3]}
                onChange={(e) => toggleDrum(4, 3)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[4][4]}
                defaultChecked={drumState.tracks[4][4]}
                onChange={(e) => toggleDrum(4, 4)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[4][5]}
                defaultChecked={drumState.tracks[4][5]}
                onChange={(e) => toggleDrum(4, 5)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[4][6]}
                defaultChecked={drumState.tracks[4][6]}
                onChange={(e) => toggleDrum(4, 6)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[4][7]}
                defaultChecked={drumState.tracks[4][7]}
                onChange={(e) => toggleDrum(4, 7)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[4][8]}
                defaultChecked={drumState.tracks[4][8]}
                onChange={(e) => toggleDrum(4, 8)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[4][9]}
                defaultChecked={drumState.tracks[4][9]}
                onChange={(e) => toggleDrum(4, 9)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[4][10]}
                defaultChecked={drumState.tracks[4][10]}
                onChange={(e) => toggleDrum(4, 10)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[4][11]}
                defaultChecked={drumState.tracks[4][11]}
                onChange={(e) => toggleDrum(4, 11)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[4][12]}
                defaultChecked={drumState.tracks[4][12]}
                onChange={(e) => toggleDrum(4, 12)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[4][13]}
                defaultChecked={drumState.tracks[4][13]}
                onChange={(e) => toggleDrum(4, 13)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[4][14]}
                defaultChecked={drumState.tracks[4][14]}
                onChange={(e) => toggleDrum(4, 14)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={drumState.tracks[4][15]}
                defaultChecked={drumState.tracks[4][15]}
                onChange={(e) => toggleDrum(4, 15)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <button onClick={playLoop}>Play</button>
        <button onClick={stopLoop}>Stop</button>
        {state.isLoggedIn ? <button onClick={handleShow}>Save</button> : null}
        <button onClick={resetTable}>Clear</button>
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
          drumState.drumSnare,
          drumState.drumBass,
          drumState.drumHiHat,
          drumState.drumClap,
        ]}
      />
      <hr />
    </div>
  );
};


export default TestSequencer;
