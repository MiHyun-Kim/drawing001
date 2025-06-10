let shapes = [];
let cols, rows;
let cellSize = 60;
let margin = 40;
let spacing = 10; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); 
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

    fill('#008200');        
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

  let gridWidth = 900;
  let gridHeight = 500;

  cols = floor((gridWidth - 2 * margin) / cellSize);
  rows = floor((gridHeight - 2 * margin) / cellSize);

  let offsetX = (width - cols * cellSize) / 2;
  let offsetY = (height - rows * cellSize) / 2 - 70; 

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = offsetX + i * cellSize + cellSize / 2;
      let y = offsetY + j * cellSize + cellSize / 2;
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

