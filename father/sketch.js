let bottomImg, topImg;
let buffer; // offscreen canvas to hold the color image

let w = window.innerWidth;
let h = window.innerHeight;

function preload() {
  bottomImg = loadImage('alejandro-3-1.png');            // Full-color image
  topImg = loadImage('alejandro_outline_1.png');         // Black-and-white image
}

function setup() {
  createCanvas(w, h);

  // Create offscreen buffer to hold bottom image
  buffer = createGraphics(w, h);
  buffer.image(bottomImg, 0, 0, w, h); // draw color image to buffer

  // Draw the black-and-white image on top
  image(topImg, 0, 0, w, h);

  noCursor();
  cursor('/assets/brush.png', 20, -10);
}

function mouseDragged() {
  // Copy from buffer (color image) onto canvas where the mouse is
  copy(buffer, mouseX, mouseY, 40, 40, mouseX, mouseY, 40, 40);
}

function windowResized() {
  w = windowWidth;
  h = windowHeight;
  resizeCanvas(w, h);

  // Recreate buffer and redraw everything
  buffer = createGraphics(w, h);
  buffer.image(bottomImg, 0, 0, w, h);

  image(topImg, 0, 0, w, h);
}
