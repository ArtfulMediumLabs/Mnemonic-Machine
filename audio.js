// const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").toDestination();
// Tone.loaded().then(() => {
// 	player.start();
// });

const synth = new Tone.Synth().toDestination();

function createPart(values) {
    let part = new Tone.Part(((time, value) => {
        synth.triggerAttackRelease(value.note, "8n", time, value.velocity);
    }), values);
    
    part.loopStart = "0:0:0";
    part.loopEnd = "2:0:0";
    part.loop = true;
    part.start(0);
}