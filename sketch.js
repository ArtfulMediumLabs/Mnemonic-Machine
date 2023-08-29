function setup() {
    createCanvas(1024, 768);
  }
  
  function draw() {
    background('#FFD126');

    let menuColor = color('#FFFFFF');
    menuColor.setAlpha(76);
    fill(menuColor);

    noStroke();

    rect(0,0,164,768);
  }