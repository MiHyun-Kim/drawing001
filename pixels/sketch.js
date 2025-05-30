let bgColors = ['#F7C6E1', '#CEE244', '#FFBABC'];
let cellColors = ['#ED1C24', '#8B40DB', '#008200'];

let selectedBgColor;
let selectedCellColor;

let cellSize = 20;
let columnCount;
let rowCount;
let currentCells = [];
let nextCells = [];


function setup() {
  frameRate(3);
  createCanvas(windowWidth, windowHeight);

  // Randomly select background and cell colors
  selectedBgColor = random(bgColors);
  selectedCellColor = random(cellColors);

  columnCount = floor(width / cellSize);
  rowCount = floor(height / cellSize);

  for (let column = 0; column < columnCount; column++) {
    currentCells[column] = [];
    nextCells[column] = [];
    for (let row = 0; row < rowCount; row++) {
      currentCells[column][row] = 0;
      nextCells[column][row] = 0;
    }
  }

  background(selectedBgColor); // Set initial background color
  randomizeBoard();
  loop();
}


function draw() {
  background(selectedBgColor); // Set background each frame (optional)
  generate();
  fillCellUnderMouse();

  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      let cell = currentCells[column][row];

      if (cell === 1) {
        fill(selectedCellColor);
      } else {
        fill(selectedBgColor);
      }

      noStroke();
      rect(column * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
}

function drawDottedBackground() {
  stroke(200); // Light gray color for dots
  strokeWeight(2); // Thin lines for dots
  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      let x = column * cellSize + cellSize / 2;
      let y = row * cellSize + cellSize / 2;

      point(x, y); // Draw the dot instead of a line
    }
  }
}

function mousePressed() {
  randomizeBoard();
  loop();
}

// When the mouse moves, trigger a re-draw
function mouseMoved() {
  redraw();
}

// Set the cell under the mouse to alive
function fillCellUnderMouse() {
  let col = floor(mouseX / cellSize);
  let row = floor(mouseY / cellSize);

  if (col >= 0 && col < columnCount && row >= 0 && row < rowCount) {
    currentCells[col][row] = 1;
  }
}

function randomizeBoard() {
  for (let column = 0; column < columnCount; column +=2) {
    for (let row = 0; row < rowCount; row += 2) {
      currentCells[column][row] = random([0, 1]);
    }
  }
}

function generate() {
  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      let left = (column - 1 + columnCount) % columnCount;
      let right = (column + 1) % columnCount;
      let above = (row - 1 + rowCount) % rowCount;
      let below = (row + 1) % rowCount;

      let neighbours =
        currentCells[left][above] +
        currentCells[column][above] +
        currentCells[right][above] +
        currentCells[left][row] +
        currentCells[right][row] +
        currentCells[left][below] +
        currentCells[column][below] +
        currentCells[right][below];

      if (neighbours < 2 || neighbours > 3) {
        nextCells[column][row] = 0;
      } else if (neighbours === 3) {
        nextCells[column][row] = 1;
      } else {
        nextCells[column][row] = currentCells[column][row];
      }
    }
  }

  let temp = currentCells;
  currentCells = nextCells;
  nextCells = temp;
}
