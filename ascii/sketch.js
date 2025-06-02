let cols = 30;
let rows = 15;
let grid;
let points = [];

let offsetX = 0;
let offsetY = 0;
let cellW = 28;
let cellH = 36;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('monospace');
  textSize(35);
  noLoop();
  generateNewShape();
}

function draw() {
  background('#DE91F9');
  drawGrid();
}

function mouseClicked() {
  generateNewShape();
  redraw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  generateNewShape();
  redraw();
}

function generateNewShape() {
  // Create blank grid
  grid = [];
  for (let y = 0; y < rows; y++) {
    grid[y] = [];
    for (let x = 0; x < cols; x++) {
      grid[y][x] = ' ';
    }
  }

  // Generate random points
  let numPoints = floor(random(6, 12));
  points = [];
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: floor(random(2, cols - 2)),
      y: floor(random(2, rows - 2))
    });
  }

  // Mark dots
  for (let pt of points) {
    grid[pt.y][pt.x] = 'o';
  }

  // Connect in a random shape pattern
  let mode = floor(random(3));
  if (mode === 0) {
    for (let i = 0; i < points.length - 1; i++) {
      drawASCIILine(points[i], points[i + 1]);
    }
  } else if (mode === 1) {
    let center = points[floor(points.length / 2)];
    for (let pt of points) {
      if (pt !== center) drawASCIILine(center, pt);
    }
  } else {
    for (let i = 0; i < points.length; i++) {
      let next = (i + 1) % points.length;
      drawASCIILine(points[i], points[next]);
    }
  }

  // Random placement on screen (within bounds)
  offsetX = floor(random(0, max(0, windowWidth - cols * cellW)));
  offsetY = floor(random(0, max(0, windowHeight - rows * cellH)));
}

function drawGrid() {
  fill('#008200');
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      text(grid[y][x], offsetX + x * cellW, offsetY + y * cellH);
    }
  }
}

function drawASCIILine(p1, p2) {
  let x1 = p1.x;
  let y1 = p1.y;
  let x2 = p2.x;
  let y2 = p2.y;

  let dx = abs(x2 - x1);
  let dy = abs(y2 - y1);
  let sx = x1 < x2 ? 1 : -1;
  let sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;

  while (x1 !== x2 || y1 !== y2) {
    if (grid[y1][x1] === ' ') {
      grid[y1][x1] = getLineChar(x1, y1, x2, y2);
    }

    let e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x1 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }
  }
}

function getLineChar(x1, y1, x2, y2) {
  if (x1 === x2) return '|';
  if (y1 === y2) return '-';
  return (x2 - x1) * (y2 - y1) > 0 ? '\\' : '/';
}
