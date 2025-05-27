let shapes = [];
let cols, rows;
let cellSize = 60;
let margin = 40;
let spacing = 10; // space between shapes and cell edges

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); // static layout
  rectMode(CENTER);
  angleMode(RADIANS);

  let availableWidth = width - 2 * margin;
  let availableHeight = height - 2 * margin;
  
  generateShapes();
}

function draw() {
  background('#DE91F9');
  for (let s of shapes) {
    push();
    translate(s.x, s.y);
    rotate(s.angle);
    let size = s.size;
    noFill();
    stroke('#008200');
    strokeWeight(1.5);

    if (s.type === 'rect') {
      rect(0, 0, size, size);
    } else if (s.type === 'circle') {
      ellipse(0, 0, size, size);
    } else if (s.type === 'triangle') {
      translate(-size / 2, -size / 2);
      triangle(0, 0, size, 0, 0, size);
    } else if (s.type === 'arc') {
      translate(-size / 2, -size / 2);
      arc(0, 0, size * 2, size * 2, 0, HALF_PI, PIE);
    }

    pop();
  }
}

function mousePressed() {
  generateShapes();
  redraw();
}

function generateShapes() {
  shapes = [];

  cols = floor((800 - 2 * margin) / cellSize); // fixed grid width
  rows = floor((600 - 2 * margin) / cellSize); // fixed grid height

  let gridWidth = cols * cellSize;
  let gridHeight = rows * cellSize;

  // Center grid in the canvas
  let offsetX = (width - gridWidth) / 2;
  let offsetY = (height - gridHeight) / 2;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = offsetX + i * cellSize + cellSize / 2;
      let y = offsetY + j * cellSize + cellSize / 2 - 50;
      let maxShapeSize = cellSize - spacing * 2;

      shapes.push({
        x: x,
        y: y,
        size: random(maxShapeSize * 0.5, maxShapeSize),
        angle: floor(random(4)) * HALF_PI,
        type: random(['rect', 'circle', 'triangle', 'arc'])
      });
    }
  }
}

