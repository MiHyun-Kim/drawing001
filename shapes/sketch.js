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
  cols = floor((width - 2 * margin) / cellSize);
  rows = floor((height - 2 * margin) / cellSize);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = margin + i * cellSize + cellSize / 2;
      let y = margin + j * cellSize + cellSize / 2;
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
