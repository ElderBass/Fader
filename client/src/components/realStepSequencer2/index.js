import React, { useState, useEffect, useRef } from 'react';
import MIDISounds from 'midi-sounds-react';
// import "./style.css"

const TestSequencer2 = (props) => {

    const [ drumState2, setDrumState2 ] = useState({
        drumSnare: 15
        , drumBass: 5
        , drumHiHat: 35
        , drumClap: 24
        , tracks: [
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
            , [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
            , [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
            , [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
        ],

    data: [],
    beats: [],
    bpm: 120,
    })

    const midiSounds = useRef();

    useEffect(() => {
        console.log("midi sounds in useEffect = ", midiSounds)
        setDrumState2({
            ...drumState2,
            initialized: false
        })
    }, []);


    const onSelectDrumSnare = (e) => {
        var list = e.target;
        var n = list.options[list.selectedIndex].getAttribute("value");
        midiSounds.current.cacheDrum(n);
        //var me = this;
        midiSounds.current.player.loader.waitLoad(function () {
            setDrumState2({
                ...drumState2,
                drumSnare: n
            });
            fillBeat();
        });
    }
    
    const onSelectDrumBass = (e) => {
        var list = e.target;
        var n = list.options[list.selectedIndex].getAttribute("value");
        midiSounds.current.cacheDrum(n);
        //var me = this;
        midiSounds.current.player.loader.waitLoad(function () {
            setDrumState2({
                ...drumState2,
                drumBass: n
            });
            fillBeat();
        });
    }
    const onSelectDrumHiHat = (e) => {
        var list = e.target;
        var n = list.options[list.selectedIndex].getAttribute("value");
        midiSounds.current.cacheDrum(n);
        //var me = this;
        midiSounds.current.player.loader.waitLoad(function () {
            setDrumState2({
                ...drumState2,
                drumHiHat: n
            });
            fillBeat();
        });
    }
    const onSelectDrumClap = (e) => {
        var list = e.target;
        var n = list.options[list.selectedIndex].getAttribute("value");
        midiSounds.current.cacheDrum(n);
        //var me = this;
        midiSounds.current.player.loader.waitLoad(function () {
            setDrumState2({
                ...drumState2,
                drumClap: n
            });
            fillBeat();
        });
    }
    const createSelectItems = () => {
        if (midiSounds.current) {
            // if (!(items)) {
                let items = [];
                for (let i = 0; i < midiSounds.current.player.loader.drumKeys().length; i++) {
                    items.push(<option key={i} value={i}>{'' + (i + 0) + '. ' + midiSounds.current.player.loader.drumInfo(i).title}</option>);
                }
            // }
            return items;
        }
    }
    const fillBeat = () => {
        let beats = [];
        for (var i = 0; i < 16; i++) {
            var drums = [];
            if (drumState2.tracks[0][i]) { drums.push(drumState2.drumBass); }
            if (drumState2.tracks[1][i]) { drums.push(drumState2.drumSnare); }
            if (drumState2.tracks[2][i]) { drums.push(drumState2.drumClap); }
            if (drumState2.tracks[3][i]) { drums.push(drumState2.drumHiHat); }
            var beat = [drums, []];
        
            beats[i] = beat
    }
    console.log("whole beats array = ", beats)
    setDrumState2({
        ...drumState2,
        beats: beats
})
}
    const playLoop = () => {
        console.log("drumstate2 beats = ", drumState2.beats, drumState2.bpm);

        // fillBeat();
        midiSounds.current.startPlayLoop(drumState2.beats, drumState2.bpm, 1 / 16);
    };

    const stopLoop = () => {
        midiSounds.current.stopPlayLoop();
    };

    const toggleDrum = (track, step) => {

        var a = drumState2.tracks;
        a[track][step] = !a[track][step];
        setDrumState2({ 
            ...drumState2,
            tracks: a 
        });
        fillBeat();
        console.log("after fill beat in toggle drum = ", drumState2.beats)
    }

    const handleBPMChange = (e) => {
        let bpm = e.target.value;
        setDrumState2({ 
            ...drumState2,
            bpm: bpm 
        })
    }
        return (
            <div className="App">
                <form>
                    <div>BPM 
                    <input id="bpm" name="slider" type="range" min="1" max="250" step="1" 
                    value={drumState2.bpm} onChange={handleBPMChange}></input>
                    <input type="number" id="bpmValue" name="amountInput" min="1" max="250" value={drumState2.bpm}
                        onChange={handleBPMChange} /></div>
                </form>
                <table align='center'>
                    <tbody>
                        <tr>
                            <td><select value={drumState2.drumBass} onChange={() => onSelectDrumBass}>{createSelectItems()}</select></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[0][0]} onChange={(e) => toggleDrum(0, 0)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[0][1]} onChange={(e) => toggleDrum(0, 1)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[0][2]} onChange={(e) => toggleDrum(0, 2)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[0][3]} onChange={(e) => toggleDrum(0, 3)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[0][4]} onChange={(e) => toggleDrum(0, 4)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[0][5]} onChange={(e) => toggleDrum(0, 5)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[0][6]} onChange={(e) => toggleDrum(0, 6)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[0][7]} onChange={(e) => toggleDrum(0, 7)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[0][8]} onChange={(e) => toggleDrum(0, 8)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[0][9]} onChange={(e) => toggleDrum(0, 9)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[0][10]} onChange={(e) => toggleDrum(0, 10)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[0][11]} onChange={(e) => toggleDrum(0, 11)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[0][12]} onChange={(e) => toggleDrum(0, 12)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[0][13]} onChange={(e) => toggleDrum(0, 13)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[0][14]} onChange={(e) => toggleDrum(0, 14)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[0][15]} onChange={(e) => toggleDrum(0, 15)} /></td>
                        </tr>
                        <tr>
                            <td><select value={drumState2.drumSnare} onChange={() => onSelectDrumSnare}>{createSelectItems()}</select></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[1][0]} onChange={(e) => toggleDrum(1, 0)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[1][1]} onChange={(e) => toggleDrum(1, 1)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[1][2]} onChange={(e) => toggleDrum(1, 2)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[1][3]} onChange={(e) => toggleDrum(1, 3)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[1][4]} onChange={(e) => toggleDrum(1, 4)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[1][5]} onChange={(e) => toggleDrum(1, 5)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[1][6]} onChange={(e) => toggleDrum(1, 6)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[1][7]} onChange={(e) => toggleDrum(1, 7)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[1][8]} onChange={(e) => toggleDrum(1, 8)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[1][9]} onChange={(e) => toggleDrum(1, 9)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[1][10]} onChange={(e) => toggleDrum(1, 10)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[1][11]} onChange={(e) => toggleDrum(1, 11)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[1][12]} onChange={(e) => toggleDrum(1, 12)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[1][13]} onChange={(e) => toggleDrum(1, 13)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[1][14]} onChange={(e) => toggleDrum(1, 14)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[1][15]} onChange={(e) => toggleDrum(1, 15)} /></td>
                        </tr>
                        <tr>
                            <td><select value={drumState2.drumClap} onChange={() => onSelectDrumClap}>{createSelectItems()}</select></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[2][0]} onChange={(e) => toggleDrum(2, 0)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[2][1]} onChange={(e) => toggleDrum(2, 1)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[2][2]} onChange={(e) => toggleDrum(2, 2)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[2][3]} onChange={(e) => toggleDrum(2, 3)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[2][4]} onChange={(e) => toggleDrum(2, 4)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[2][5]} onChange={(e) => toggleDrum(2, 5)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[2][6]} onChange={(e) => toggleDrum(2, 6)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[2][7]} onChange={(e) => toggleDrum(2, 7)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[2][8]} onChange={(e) => toggleDrum(2, 8)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[2][9]} onChange={(e) => toggleDrum(2, 9)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[2][10]} onChange={(e) => toggleDrum(2, 10)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[2][11]} onChange={(e) => toggleDrum(2, 11)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[2][12]} onChange={(e) => toggleDrum(2, 12)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[2][13]} onChange={(e) => toggleDrum(2, 13)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[2][14]} onChange={(e) => toggleDrum(2, 14)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[2][15]} onChange={(e) => toggleDrum(2, 15)} /></td>
                        </tr>
                        <tr>
                            <td><select value={drumState2.drumHiHat} onChange={()=> onSelectDrumHiHat}>{createSelectItems()}</select></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[3][0]} onChange={(e) => toggleDrum(3, 0)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[3][1]} onChange={(e) => toggleDrum(3, 1)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[3][2]} onChange={(e) => toggleDrum(3, 2)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[3][3]} onChange={(e) => toggleDrum(3, 3)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[3][4]} onChange={(e) => toggleDrum(3, 4)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[3][5]} onChange={(e) => toggleDrum(3, 5)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[3][6]} onChange={(e) => toggleDrum(3, 6)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[3][7]} onChange={(e) => toggleDrum(3, 7)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[3][8]} onChange={(e) => toggleDrum(3, 8)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[3][9]} onChange={(e) => toggleDrum(3, 9)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[3][10]} onChange={(e) => toggleDrum(3, 10)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[3][11]} onChange={(e) => toggleDrum(3, 11)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[3][12]} onChange={(e) => toggleDrum(3, 12)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[3][13]} onChange={(e) => toggleDrum(3, 13)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[3][14]} onChange={(e) => toggleDrum(3, 14)} /></td>
                            <td><input type="checkbox" defaultChecked={drumState2.tracks[3][15]} onChange={(e) => toggleDrum(3, 15)} /></td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    <button onClick={playLoop}>Play</button>
                    <button onClick={stopLoop}>Stop</button>
                </p>
                <MIDISounds ref={midiSounds} appElementName="root"
                    drums={[drumState2.drumSnare
                        , drumState2.drumBass
                        , drumState2.drumHiHat
                        , drumState2.drumClap
                    ]}
                />
                <hr />
            </div>
        );
}

export default TestSequencer2;