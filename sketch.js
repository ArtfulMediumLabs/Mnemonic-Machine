function preload() {
  dingImg = loadImage('img/ding.png');
  toasterImg = loadImage('img/toaster.png');
  waffleImg = loadImage('img/waffle.png');
  leggoImg = loadImage('img/leggo.png');

  playImg = loadImage('img/play.png');
}

function setup() {
    createCanvas(1920, 1080);
    notes = randomNotes();
    createPart(notes);
    console.log(notes);
}


function draw() {
  background('#FFD126');

  let menuColor = color('#FFFFFF');
  menuColor.setAlpha(76);
  fill(menuColor);

  noStroke();
  
  rect(0,0,308,1080);

  image(dingImg, 73, 44);
  image(toasterImg, 74, 305);
  image(waffleImg, 71, 570);
  image(leggoImg, 63, 857);

  image(playImg, 344, 869);
}

function mousePressed() {
  Tone.start();
  // console.log('toggle', Tone.Transport.state);
  Tone.Transport.toggle();
  return false;
}

function randomNotes() {
  let count = 3 + Math.floor(Math.random() * 4);
  return Array.from({length: count}, randomNote);
}

function randomNote() {
  let velocity = Math.random();
  
  let partDuration = 2 * 4 * 4;

  let sixteenths = Math.floor(Math.random() * partDuration);
  let inSixteenths = sixteenths;
  let measures = Math.floor(sixteenths / 16);
  sixteenths %= 16;
  let quarters = Math.floor(sixteenths / 4);
  sixteenths %= 4;
  let time = measures + ":" + quarters + ":" + sixteenths;

  let notes = ['C2', 'C3', 'C4', 'C5']
  let index = Math.floor(Math.random() * notes.length);

  return {'time': time, 'sixteenths': inSixteenths, 'note': notes[index], 'velocity': velocity }
}
