console.clear();

const synths = [
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth()

];

synths[0].oscillator.type = 'triangle';
synths[1].oscillator.type = 'sine';
synths[2].oscillator.type = 'sawtooth';

const gain = new Tone.Gain(0.6);
gain.toMaster();

synths.forEach(synth => synth.connect(gain));

const $rows = document.body.querySelectorAll('div > div')
    notes = ['G5', 'E4', 'C3'];
let index = 0;
Tone.Transport.bpm.value = 500;
Tone.Transport.scheduleRepeat(repeat, '4n')
Tone.Transport.start();

// let bpm = Tone.Time(0.5).toFrequency();

function repeat(time) {
    // console.log("bpm is " + bpm);
    let step = index % 8;
    console.log(time);
    for (let i = 0; i < $rows.length; i++){
        // console.log(time);
        let synth = synths[i],
            note = notes[i],
            $row = $rows[i],
            $input = $row.querySelector(`input:nth-child(${step +1 })`);
        if ($input.checked) synth.triggerAttackRelease(note, '8n', time);
    }
    index++;
}

if (Tone.context.state !== 'running') {
    Tone.context.resume();
}

document.documentElement.addEventListener(
    "mousedown", function(){
      mouse_IsDown = true;
      if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }})