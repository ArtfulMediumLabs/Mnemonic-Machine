// const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").toDestination();
// Tone.loaded().then(() => {
// 	player.start();
// });

const synth = new Tone.Synth().toDestination();
const part = new Tone.Part(((time, note) => {
	// the notes given as the second element in the array
	// will be passed in as the second argument
	synth.triggerAttackRelease(note, "8n", time);
}), [[0, "C2"], ["0:2", "C3"], ["0:3:2", "G2"]]);
part.loop = true;
part.start(0);