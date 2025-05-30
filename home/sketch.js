let cellSize = 20; 
let columnCount, rowCount;
let currentCells = [], nextCells = [];

function setup() {
  frameRate(3);
  createCanvas(windowWidth, windowHeight);

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

  randomizeBoard();

  loop(); 
}


function draw() {
  background('#F7C6E1'); // Change this to any color you like
  generate();
  fillCellUnderMouse();

  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      let cell = currentCells[column][row];

      if (cell === 1) {
        fill('#ED1C24'); // Alive cells: bright green
      } else {
        fill('#F7C6E1'); // Dead cells match background for invisibility
      }

      noStroke();
      rect(column * cellSize, row * cellSize, cellSize, cellSize);
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
  let x = floor(mouseX / cellSize);
  let y = floor(mouseY / cellSize);
  if (x >= 0 && x < columnCount && y >= 0 && y < rowCount) {
    currentCells[x][y] = 1;
  }
}

function randomizeBoard() {
  for (let x = 0; x < columnCount; x++) {
    for (let y = 0; y < rowCount; y++) {
      currentCells[x][y] = (random() < 0.05) ? 1 : 0; // Only ~10% alive
    }
  }
}


function generate() {
  for (let x = 0; x < columnCount; x++) {
    for (let y = 0; y < rowCount; y++) {
      let left = (x - 1 + columnCount) % columnCount;
      let right = (x + 1) % columnCount;
      let up = (y - 1 + rowCount) % rowCount;
      let down = (y + 1) % rowCount;

      let neighbors =
        currentCells[left][up] + currentCells[x][up] + currentCells[right][up] +
        currentCells[left][y] + currentCells[right][y] +
        currentCells[left][down] + currentCells[x][down] + currentCells[right][down];

      nextCells[x][y] = (neighbors === 3 || (neighbors === 2 && currentCells[x][y] === 1)) ? 1 : 0;
    }
  }

  [currentCells, nextCells] = [nextCells, currentCells]; // Swap arrays
}
