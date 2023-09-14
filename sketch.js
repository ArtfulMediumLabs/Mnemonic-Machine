let draggingIx;
let draggingOffset;
let noteImgs = [];
let playButton;
let randomButton;
let helpButton;
let saveButton;

let backgroundImg;

function preload() {
  if (typeof config.backgroundImage !== "undefined") { 
    backgroundImg = loadImage('img/' + config.backgroundImage)
  }

  sideImg = loadImage('img/side_graphic.png');
  
  //config.images.forEach( (image) => { loadImage('img/' + image) } );
  imgRefs = config.images.map( (imageName) => { return loadImage('img/' + imageName) } );

  changeImg = loadImage('img/change.png');

  playImg = loadImage('img/play.png');
  randomImg = loadImage('img/random.png');
  helpImg = loadImage('img/help.png');
  saveImg = loadImage('img/save.png');
}

function setup() {
    createCanvas(1920, 1080);
    
    menuWidth = 400;
    sequenceWidth = 1920 - menuWidth - 16;

    sequenceHeight = 869 - 229 - 16;

    partDuration = 2 * 4 * 4;

    url = new URL(window.location.href);
    shouldLoadURL = url.searchParams.has('v0')

    let notes;
    if (shouldLoadURL) {
      notes = decodeURL();
    } else {
      notes = randomNotes(config.voiceTotal);
    }

    createNoteImgs(notes);
    createPart(notes);

    playButton = new Button(playImg, 484, 864);
    randomButton = new Button(randomImg, 840, 864);
    helpButton = new Button(helpImg, 1206, 864);
    saveButton = new Button(saveImg, 1572, 864);
}

function createNoteImgs(notes) {
  noteImgs = []
  notes.forEach(function (note) {
    let left = sequenceWidth * note.time / totalDuration + menuWidth + 8;
    let top = (1 - note.velocity) * sequenceHeight + 8;
    let img = imgRefs[note.voiceIndex];
    let newNote = new Note(img,left,top,note);
    noteImgs.push(newNote)
  });
}


function draw() {
  background(backgroundImg ?? config.backgroundColor ?? 'gray');

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
  randomButton.display();
  helpButton.display();
  saveButton.display();

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

  if ( randomButton.inBounds(mouseX, mouseY) ) {
    let notes = randomNotes(config.voiceTotal);
    createPart(notes);
    createNoteImgs(notes);
    return;
  }

  if ( helpButton.inBounds(mouseX, mouseY) ) {
    let url = encodeURL();
    modalTinyNoFooter.setContent('<img id="help" src="img/help_modal.png">');
    modalTinyNoFooter.open();
    return;
  }

  if ( saveButton.inBounds(mouseX, mouseY) ) {
    let url = encodeURL();
    document.getElementById('link').innerHTML = url;
    modalTinyNoFooter.setContent(document.querySelector('.modal-content').innerHTML);
    // modalTinyNoFooter.setContent(`<h2>Copy this link to share your creation:</h2><p>${url}</p>`);
    modalTinyNoFooter.open();
    return;
  }

  for (let i = noteImgs.length - 1; i >= 0; i--) {
    if ( noteImgs[i].inHover(mouseX, mouseY) ) {
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
      image(changeImg,this.x,this.y);
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
    return ( between(x, this.x, this.x + 44) && between(y, this.y, this.y + 44) );
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

function decodeURL() {
  urlParams = new URLSearchParams(window.location.search);
  let notes = [];
  for (var i = 0; i < config.voiceTotal; i++) {
    let v = parseInt(urlParams.get("v" + i))
    let n = parseInt(urlParams.get("n" + i))
    let a = parseFloat(urlParams.get("a" + i))
    let t = parseFloat(urlParams.get("t" + i))
    
    let note = new NoteValue(t, a, v, n)
    notes.push(note);
  }

  return notes;
}

function encodeURL() {
  let params = {};
  noteImgs.forEach( (noteImg, index) => {
    let noteValue = noteImg.noteValue;
    params['v' + index] = noteValue.voiceIndex;
    params['n' + index] = noteValue.noteIndex;
    params['a' + index] = noteValue.velocity.toFixed(2);;
    params['t' + index] = noteValue.time.toFixed(2);;
  });
  const searchParrams = new URLSearchParams(params);
  const new_url = new URL(`${document.location.origin}${document.location.pathname}?${searchParrams.toString()}`)
  return new_url;
}
