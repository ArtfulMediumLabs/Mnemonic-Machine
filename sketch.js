function preload() {
  dingImg = loadImage('img/ding.png');
  toasterImg = loadImage('img/toaster.png');
  waffleImg = loadImage('img/waffle.png');
  leggoImg = loadImage('img/leggo.png');

  playImg = loadImage('img/play.png');
}

function setup() {
    createCanvas(1920, 1080);
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
  console.log('toggle', Tone.Transport.state);
  Tone.Transport.toggle();
  return false;
}
