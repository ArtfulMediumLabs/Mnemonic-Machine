// const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").toDestination();
// Tone.loaded().then(() => {
// 	player.start();
// });

const synth = new Tone.Synth().toDestination();

function createPart(values) {
    part = new Tone.Part(((time, value) => {
        synth.triggerAttackRelease(value.note, "8n", time, value.velocity);
    }), values);
    
    part.loopStart = "0:0:0";
    part.loopEnd = "2:0:0";
    part.loop = true;
    part.start(0);
}

function randomNotes() {
    let count = 3 + Math.floor(Math.random() * 4);
    return Array.from({length: count}, randomNote);
  }
  
function randomNote() {
    let velocity = Math.random() * 0.9 + 0.1;

    let sixteenths = Math.floor(Math.random() * partDuration);
    let inSixteenths = sixteenths;
    let measures = Math.floor(sixteenths / 16);
    sixteenths %= 16;
    let quarters = Math.floor(sixteenths / 4);
    sixteenths %= 4;
    let time = measures + ":" + quarters + ":" + sixteenths;

    let notes = ['C2', 'C3', 'C4', 'C5']
    let index = Math.floor(Math.random() * notes.length);

    return {'time': time, 'sixteenths': inSixteenths, 'note': notes[index], 'noteIndex': index, 'velocity': velocity }
}