const keys = new Tone.Players({
    urls: {
        0: "909hat.wav",
        1: "909clap.wav",
        2: "909kick.wav",
        3: "909snare.wav"
    },
    fadeOut: "64n",
    baseUrl: "https://slimeforest.github.io/drums-sounds/audio/909/"
}).toDestination();

document.querySelector("tone-play-toggle").addEventListener("start", () => Tone.Transport.start());
document.querySelector("tone-play-toggle").addEventListener("stop", () => Tone.Transport.stop());
document.querySelector("tone-slider").addEventListener("input", (e) => Tone.Transport.bpm.value = parseFloat(e.target.value));
document.querySelector("tone-step-sequencer").addEventListener("trigger", ({ detail }) => {
    keys.player(detail.row).start(detail.time, 0, "16t");
});