let bottomImg, topImg;
let buffer; 

let w = window.innerWidth;
let h = window.innerHeight;

function preload() {
  bottomImg = loadImage('alejandro-3-1.png');           
  topImg = loadImage('alejandro_outline_1.png');        
}

function setup() {
  createCanvas(w, h);


  buffer = createGraphics(w, h);
  buffer.image(bottomImg, 0, 0, w, h);


  image(topImg, 0, 0, w, h);

  noCursor();
  cursor('/assets/brush.png', 20, -10);
}

function mouseDragged() {

  copy(buffer, mouseX, mouseY, 40, 40, mouseX, mouseY, 40, 40);
}

function windowResized() {
  w = windowWidth;
  h = windowHeight;
  resizeCanvas(w, h);

 
  buffer = createGraphics(w, h);
  buffer.image(bottomImg, 0, 0, w, h);

  image(topImg, 0, 0, w, h);
}
