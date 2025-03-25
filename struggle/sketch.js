let points = []; // Store points where lines will be drawn
let img;  // Declare an image variable

function setup() {
  createCanvas(1000, 1000, WEBGL);
  angleMode(DEGREES);
  strokeWeight(1);
  noFill();
  stroke(32, 8, 64);

  // Load the image
  img = loadImage('struggle.png'); // Replace with your image URL or path
  
  // Set initial camera position inside the sphere
  let camX = 0;
  let camY = 0;
  let camZ = -200;  // Camera inside the sphere (negative to look outward)
  camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0); // Look towards the center of the sphere
}

function draw() {
  background('#FDB335');

  // Allow user to control the camera with orbitControl
  orbitControl();  // This will allow user rotation

  points = []; // Clear points array

  // Set the texture mode to repeat the image (tiled)
  textureMode(NORMAL);  // Use normalized texture coordinates
  push();
  texture(img);  // Apply the image as a texture

  // Create a sphere and scale the texture so it's tiled twice
  sphere(400);  // Create a sphere with the texture
  pop();

  // Generate points on the sphere's surface and store their positions
  let rows = 12;  // Number of rings of points
  let cols = 12;  // Number of points per ring
  let radius = 400;

  for (let zAngle = 0; zAngle < 180; zAngle += 180 / rows) {
    for (let xAngle = 0; xAngle < 360; xAngle += 360 / cols) {
      let x = radius * sin(zAngle) * cos(xAngle);
      let y = radius * sin(zAngle) * sin(xAngle);
      let z = radius * cos(zAngle);

      points.push(createVector(x, y, z));
    }
  }

  // Draw lines connecting the points
  stroke(255,0,0);
  for (let i = 0; i < points.length; i++) {
    // Connect points in the same row
    if ((i + 1) % cols !== 0) {
      line(
        points[i].x, points[i].y, points[i].z,
        points[i + 1].x, points[i + 1].y, points[i + 1].z
      );
    }

    // Connect points in the same column (wrap around for last row)
    if (i + cols < points.length) {
      line(
        points[i].x, points[i].y, points[i].z,
        points[i + cols].x, points[i + cols].y, points[i + cols].z
      );
    }

    // Optional: Add diagonal lines to create more connections
    if (i + cols + 1 < points.length) {
      line(
        points[i].x, points[i].y, points[i].z,
        points[i + cols + 1].x, points[i + cols + 1].y, points[i + cols + 1].z
      );
    }
  }
}


