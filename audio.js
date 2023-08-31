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
    return Array.from([0,1,2,3], (i) => randomNote(i));
  }
  
function randomNote(voiceIndex) {
    let time = Math.random() * totalDuration;
    let velocity = Math.random() * 0.9 + 0.1;
    
    let noteRange = ['C', 'C#'].map( (x) => x + (voiceIndex + 1) );
    let noteIndex = Math.floor(Math.random() * noteRange.length);
    let note = new NoteValue(time, velocity, voiceIndex, noteRange, noteIndex);
    // return {'time': time, 'note': notes[noteIndex], 'voiceIndex': voiceIndex, 'velocity': velocity }
    return note;
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

class NoteValue {
    constructor(time, velocity, voiceIndex, noteRange, noteIndex) {
        this.time = time;
        this.velocity = velocity;
        this.voiceIndex = voiceIndex;
        this.noteIndex = noteIndex;
        this.noteRange = noteRange;
    }

    get note() {
        return this.noteRange[this.noteIndex];
    }

    nextNoteIndex() {
        this.noteIndex += 1;
        this.noteIndex %= this.noteRange.length;
        // print(this.noteIndex, this.note);
        sampler.triggerAttackRelease(this.note, 2.0, undefined, this.velocity);
    }

}