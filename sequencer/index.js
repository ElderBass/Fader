console.clear();

const gain = new Tone.Gain(0.6);
gain.toMaster();


const $rows = document.body.querySelectorAll('div > div')
// notes = ['G5', 'E4', 'C3'];
let index = 0;

Tone.Transport.bpm.value = 120;
Tone.Transport.scheduleRepeat(repeat, '4n')
Tone.Transport.start();

const samples = [
    new Tone.Sampler(""),
    new Tone.Sampler(),
    new Tone.Sampler()
]
samples.forEach(sample => sample.connect(gain));
function repeat(time) {
    let step = index % 8;
    for (let i = 0; i < $rows.length; i++) {
        let sample = samples[i],
            note = notes[i],
            $row = $rows[i],
            $input = $row.querySelector(`input:nth-child(${step + 1})`);
        if ($input.checked) synth.triggerAttackRelease(note, '8n', time);
    }
    index++;
}

if (Tone.context.state !== 'running') {
    Tone.context.resume();
}

document.getElementById("startBtn").addEventListener(
    "click", function () {
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }
})

document.getElementById("stopBtn").addEventListener(
    "click", function () {
        Tone.Transport.stop();
    }
)

document.getElementById('bpm').addEventListener('input', e => {
    Tone.Transport.bpm.rampTo(+e.target.value, 0.1);

})
