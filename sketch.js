let draggingIx;
let draggingOffset;
let noteImgs = [];
let playButton;

function preload() {
  sideImg = loadImage('img/side_graphic.png');
  
  dingImg = loadImage('img/ding.png');
  toasterImg = loadImage('img/toaster.png');
  waffleImg = loadImage('img/waffle.png');
  leggoImg = loadImage('img/leggo.png');

  playImg = loadImage('img/play.png');
}

function setup() {
    createCanvas(1920, 1080);
    
    menuWidth = 400;
    sequenceWidth = 1920 - menuWidth - 16;

    sequenceHeight = 869 - 229 - 16;

    partDuration = 2 * 4 * 4;
    let notes = randomNotes();
    createPart(notes);

    noteImgs = [];
    notes.forEach(function (note) {
      let left = sequenceWidth * note.time / totalDuration + menuWidth + 8;
      let top = (1 - note.velocity) * sequenceHeight + 8;
      let img = [dingImg, leggoImg, toasterImg, waffleImg][note.voiceIndex];
      let newNote = new Note(img,left,top,note);
      noteImgs.push(newNote)
    });

    playButton = new Button(playImg, 484, 864);
}


function draw() {
  background('#FFD126');

  image(sideImg, 0, 0);

  let menuColor = color('#FFFFFF');
  menuColor.setAlpha(76);
  fill(menuColor);

  noStroke();
  
  // rect(0,0,308,1080);

  // image(dingImg, 73, 44);
  // image(toasterImg, 74, 305);
  // image(waffleImg, 71, 570);
  // image(leggoImg, 63, 857);

  playButton.display();

  noteImgs.forEach( (note) => { note.display(); })

  fill('red')
  let barLength = sequenceWidth * (Tone.Transport.seconds / totalDuration);
  rect(menuWidth + 8, 1080-20, barLength, 20);
}


function mousePressed() {
  if ( playButton.inBounds(mouseX, mouseY) ) {
    updatePart();
    play();
    return;
  }

  for (let i = noteImgs.length - 1; i >= 0; i--) {
    if ( noteImgs[i].inHover(mouseX, mouseY) ) {
      // print("hover pressed", i, noteImgs[i], noteImgs[i].noteValue); 
      noteImgs[i].noteValue.nextNoteIndex();
      break;
    }
    if ( noteImgs[i].inBounds(mouseX, mouseY) ) {
      let relativePos = createVector(mouseX - noteImgs[i].x, mouseY - noteImgs[i].y);
      draggingIx = i;
      draggingOffset = relativePos;
      break;
    }
  }
}

function updatePart() {
  let notes = noteImgs.map((note) => note.noteValue ) 
  createPart(notes);
}

function play() {
  Tone.start();
  Tone.Transport.seconds = 0;
  Tone.Transport.start();
  Tone.Transport.stop("+4.0");
  return false;
}

function mouseMoved() {

  if (draggingIx >= 0) {
    noteImgs.forEach((noteImg, index) => noteImg.hover = false);
    return;
  }

  let hoverIndex = -1;
  for (let i = noteImgs.length - 1; i >= 0; i--) {
    if ( noteImgs[i].inBounds(mouseX, mouseY) ) {
      hoverIndex = i;
      break;
    }
  }
  noteImgs.forEach((element, index, arr) => arr[index].hover = index == hoverIndex);
}

function mouseReleased() {
  updatePart();
  draggingIx = draggingOffset = undefined;
}

function mouseDragged() {
  if (draggingIx >= 0) {
    noteImgs[draggingIx].x = mouseX - draggingOffset.x;
    noteImgs[draggingIx].y = mouseY - draggingOffset.y;
    noteImgs[draggingIx].updateValue();
  }
}

class Note {
  constructor(img, x, y, noteValue) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.noteValue = noteValue;
    this.hover = false;
  }

  display() {
    image(this.img, this.x, this.y);
    if (this.hover) {
      rect(this.x,this.y,40,40);
    }
  }

  updateValue() {
    // let left = sequenceWidth * note.time / totalDuration + menuWidth + 8;
    this.noteValue.time = ( this.x - (menuWidth + 8) ) / sequenceWidth * totalDuration;
    // let top = (1 - note.velocity) * sequenceHeight + 8;
    this.noteValue.velocity = (1 - (this.y - 8) / sequenceHeight);
  }

  maxX() {
    return this.x + this.img.width;
  }

  maxY() {
    return this.y + this.img.height;
  }

  inHover(x, y) {
    return ( between(x, this.x, this.x + 40) && between(y, this.y, this.y + 40) );
  }

  inBounds(x, y) {
    return ( between(x, this.x, this.maxX()) && between(y, this.y, this.maxY()) );
  }
}

class Button {
  constructor(img, x, y) {
    this.x = x;
    this.y = y;
    this.img = img;
  }

  maxX() {
    return this.x + this.img.width;
  }

  maxY() {
    return this.y + this.img.height;
  }

  inBounds(x, y) {
    return ( between(x, this.x, this.maxX()) && between(y, this.y, this.maxY()) );
  }

  display() {
    image(this.img, this.x, this.y);
  }
}

function between(x, min, max) {
  return x >= min && x <= max;
}