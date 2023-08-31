// const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").toDestination();
// Tone.loaded().then(() => {
// 	player.start();
// });

//const synth = new Tone.Synth().toDestination();


const sampler = new Tone.Sampler({
	urls: {
		"C1": "bss_eggo_ding_1.wav",
        "C#1": "bss_eggo_ding_2.wav",
        "C2": "bss_eggo_leggo_1.wav",
        "C#2": "bss_eggo_leggo_2.wav",
        "C3": "bss_eggo_toaster_1.wav",
        "C#3": "bss_eggo_toaster_2.wav",
        "C4": "bss_eggo_waffle_1.wav",
        "C#4": "bss_eggo_waffle_2.wav"
	},
	release: 1,
	baseUrl: "./audio/",
}).toDestination();

const totalDuration = 4.0;

function createPart(values) {
    if (typeof part !== "undefined") { 
        part.dispose()
    }
    part = new Tone.Part(((time, value) => {
        sampler.triggerAttackRelease(value.note, 2.0, time, value.velocity)
    }), values);
    
    part.loopStart = 0;
    part.loopEnd = totalDuration;
    part.loop = true;
    part.start(0);
}

function randomNotes() {
    let count = 3 + Math.floor(Math.random() * 4);
    return Array.from([0,1,2,3], (i) => randomNote(i));
  }
  
function randomNote(noteIndex) {
    let velocity = Math.random() * 0.9 + 0.1;
    let time = Math.random() * totalDuration;

    let notes = ['C1', 'C2', 'C3', 'C4']
    return {'time': time, 'note': notes[noteIndex], 'noteIndex': noteIndex, 'velocity': velocity }
}

function randomTimeinMeasures() {
    let sixteenths = Math.floor(Math.random() * partDuration);
    let inSixteenths = sixteenths;
    let measures = Math.floor(sixteenths / 16);
    sixteenths %= 16;
    let quarters = Math.floor(sixteenths / 4);
    sixteenths %= 4;
    let time = measures + ":" + quarters + ":" + sixteenths;

    return {time, inSixteenths}
}