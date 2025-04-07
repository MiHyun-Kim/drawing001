let cellSize = 20;
let columnCount;
let rowCount;
let currentCells = [];
let nextCells = [];

function setup() {
  frameRate(3);
  createCanvas(windowWidth, windowHeight);

  columnCount = floor(width / cellSize);
  rowCount = floor(height / cellSize);

  for (let column = 0; column < columnCount; column++) {
    currentCells[column] = [];
    nextCells[column] = [];
    for (let row = 0; row < rowCount; row++) {
      currentCells[column][row] = 0; // Start with all dead cells
      nextCells[column][row] = 0;
    }
  }

  noLoop();
}

function draw() {
  generate();
  fillCellUnderMouse(); // <- Fill the cell under mouse each frame

  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      let cell = currentCells[column][row];
    
      fill((1 - cell) * 255); //black
 /*     
      if (cell === 1) {
      fill(random(255), random(255), random(255));
    } else {
      fill(255);
    }
*/      
      stroke(0);
      rect(column * cellSize, row * cellSize, cellSize, cellSize);
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
