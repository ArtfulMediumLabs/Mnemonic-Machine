let draggingIx;
let draggingOffset;
let notes;
let noteImgs = [];

function preload() {
  dingImg = loadImage('img/ding.png');
  toasterImg = loadImage('img/toaster.png');
  waffleImg = loadImage('img/waffle.png');
  leggoImg = loadImage('img/leggo.png');

  playImg = loadImage('img/play.png');
}

function setup() {
    createCanvas(1920, 1080);
    
    menuWidth = 308;
    sequenceWidth = 1920 - menuWidth - 16;

    sequenceHeight = 869 - 229 - 16;

    partDuration = 2 * 4 * 4;
    notes = randomNotes();
    createPart(notes);

    noteImgs = [];
    notes.forEach(function (note) {
      let left = (sequenceWidth / partDuration) * note.sixteenths + menuWidth + 8;
      let top = (1 - note.velocity) * sequenceHeight + 8;
      let img = [dingImg, toasterImg, waffleImg, leggoImg][note.noteIndex];
      let newNote = new Note(left,top,img);
      noteImgs.push(newNote)
    });
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

  noteImgs.forEach( (note) => { note.display(); })

  fill('red')
  let barLength = sequenceWidth * part.progress;
  rect(menuWidth + 8, 1080-20, barLength, 20);
}

// function mousePressed() {
//   Tone.start();
//   // console.log('toggle', Tone.Transport.state);
//   Tone.Transport.toggle();
//   return false;
// }

function mousePressed() {
  // Hit test in reverse order so that the top most element gets hit first
  for (let i = noteImgs.length - 1; i >= 0; i--) {
    print(mouseX, mouseY, i, noteImgs[i].x, noteImgs[i].y)
    if (mouseX >= noteImgs[i].x && mouseX <= noteImgs[i].x + noteImgs[i].img.width &&
      mouseY >= noteImgs[i].y && mouseY <= noteImgs[i].y + noteImgs[i].img.height) {
      let relativePos = createVector(mouseX - noteImgs[i].x, mouseY - noteImgs[i].y);
      draggingIx = i;
      draggingOffset = relativePos;
      break;
    }
  }
}

function mouseReleased() {
  draggingIx = draggingOffset = undefined;
}

function mouseDragged() {
  if (draggingIx >= 0) {
    noteImgs[draggingIx].x = mouseX - draggingOffset.x;
    noteImgs[draggingIx].y = mouseY - draggingOffset.y;
  }
}

class Note {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
  }

  display() {
    // print(this.x, this.y, this.url);
    image(this.img, this.x, this.y);
  }
}