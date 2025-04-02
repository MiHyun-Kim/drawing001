let cubePositions = []; // Store cube positions
let img;  // Declare an image variable

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  strokeWeight(2);
  noFill();
  stroke(32, 8, 64);

  // Load the image
  img = loadImage('struggle.png'); // Replace with your image URL or path
}

function draw() {
  background('#FDB335');
  orbitControl();

  cubePositions = []; // Clear and recalculate positions

  // Draw the sphere with the image inside
  push();
  texture(img);  // Apply the image as a texture
  sphere(200);  // Create a sphere with the texture
  pop();

  

  // Draw fewer lines by connecting cubes that are adjacent in the grid
  stroke(255,0,0);
  for (let i = 0; i < cubePositions.length; i++) {
    if ((i + 1) % 12 !== 0) { // Avoid connecting cubes in the same row
      line(
        cubePositions[i].x, cubePositions[i].y, cubePositions[i].z,
        cubePositions[i + 1].x, cubePositions[i + 1].y, cubePositions[i + 1].z
      );
    }
    if (i + 12 < cubePositions.length) {
      line(
        cubePositions[i].x, cubePositions[i].y, cubePositions[i].z,
        cubePositions[i + 12].x, cubePositions[i + 12].y, cubePositions[i + 12].z
      );
    }
  }
}



