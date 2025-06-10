let points = []; 
let img;  

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  strokeWeight(1);
  noFill();
  stroke(32, 8, 64);

  img = loadImage('struggle.png'); 
  
 
  let camX = 0;
  let camY = 0;
  let camZ = -200;  
  camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0); 
}

function draw() {
  background('#FDB335');

  orbitControl();  

  points = []; 

  textureMode(NORMAL); 
  push();
  texture(img); 

  sphere(400);  
  pop();

  let rows = 12;  
  let cols = 12;  
  let radius = 400;

  for (let zAngle = 0; zAngle < 180; zAngle += 180 / rows) {
    for (let xAngle = 0; xAngle < 360; xAngle += 360 / cols) {
      let x = radius * sin(zAngle) * cos(xAngle);
      let y = radius * sin(zAngle) * sin(xAngle);
      let z = radius * cos(zAngle);

      points.push(createVector(x, y, z));
    }
  }

  stroke(255,0,0);
  for (let i = 0; i < points.length; i++) {
    if ((i + 1) % cols !== 0) {
      line(
        points[i].x, points[i].y, points[i].z,
        points[i + 1].x, points[i + 1].y, points[i + 1].z
      );
    }

    if (i + cols < points.length) {
      line(
        points[i].x, points[i].y, points[i].z,
        points[i + cols].x, points[i + cols].y, points[i + cols].z
      );
    }
    if (i + cols + 1 < points.length) {
      line(
        points[i].x, points[i].y, points[i].z,
        points[i + cols + 1].x, points[i + cols + 1].y, points[i + cols + 1].z
      );
    }
  }
}


