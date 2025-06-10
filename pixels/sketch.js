let bgColors = ['#DEFE10', '#00ED0B', '#FEACD8'];
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

  background(selectedBgColor); 
  randomizeBoard();
  loop();
}


function draw() {
  background(selectedBgColor); 
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
  stroke(200); 
  strokeWeight(2); 
  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      let x = column * cellSize + cellSize / 2;
      let y = row * cellSize + cellSize / 2;

      point(x, y); 
    }
  }
}

function mousePressed() {
  randomizeBoard();
  loop();
}


function mouseMoved() {
  redraw();
}


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
