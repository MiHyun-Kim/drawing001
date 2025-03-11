// Define the global variables: bottomImg and topImg.
let bottomImg, topImg;

var w = window.innerWidth;
var h = window.innerHeight;  


function preload() {
  // Preload the images from the canvas's assets directory.
  // The bottomImg is the photograph with color,
  // and the topImg is the black-and-white photograph.
  bottomImg = loadImage('color.jpg');
  topImg = loadImage('outline.png');
}
function setup() {
  describe(
    'Black-and-white photograph of a parrot. The cursor, when dragged across the canvas, adds color to the photograph.'
  );

canvas=createCanvas(w,h);

  // Hide the cursor and replace it with a picture of
  // a paintbrush.
  noCursor();
  cursor('/assets/brush.png', 20, -10);

  // Load the top image (the black-and-white image).
  image(topImg, 0, 0);
  background(0, 0);
}
function mouseMoved() {
  // Using the copy() function, copy the bottom image
  // on top of the top image when you drag your cursor
  // across the canvas.
  copy(bottomImg, mouseX, mouseY, 40, 40, mouseX, mouseY, 40, 40);
}