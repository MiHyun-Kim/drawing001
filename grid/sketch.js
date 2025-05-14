let columnWidths = [];
let rowHeights = [];
let time = 10; 
let clickedCells = []; 
let isDynamic = false; 

const rows = 25; 
const cols = 25; 

function setup() {
  createCanvas(windowWidth, windowHeight); 
  noFill(); 
  stroke('#00ED0B'); 

  for (let j = 0; j < cols; j++) {
    columnWidths[j] = width / cols; 
  }
  for (let i = 0; i < rows; i++) {
    rowHeights[i] = height / rows; 
  }

  // Initialize all cells as unclicked
  for (let i = 0; i < rows; i++) {
    clickedCells[i] = [];
    for (let j = 0; j < cols; j++) {
      clickedCells[i][j] = false; 
    }
  }

  // 👇 Add a few pre-filled cells here
  clickedCells[3][4] = true;
  clickedCells[6][7] = true;
  clickedCells[10][12] = true;
}



function draw() {
  background('#9276E4'); 

  if (isDynamic) {
 
    let totalWidth = 0; 
    for (let j = 0; j < cols; j++) {
      
      let noiseValue = noise(j * 0.5, time);
      columnWidths[j] = map(pow(noiseValue, 2), 0, 1, width / cols * 0.001, width / cols * 1000); 
      totalWidth += columnWidths[j]; 
    }

   
    let scaleFactor = width / totalWidth; 
    for (let j = 0; j < cols; j++) {
      columnWidths[j] *= scaleFactor; 
    }

   
    let totalHeight = 0; 
    for (let i = 0; i < rows; i++) {
     
      let noiseValue = noise(i * 0.1, time + 1000); 
      rowHeights[i] = map(pow(noiseValue, 4), 0, 1, height / rows * 0.001, height / rows * 1000); 
      totalHeight += rowHeights[i]; 
    }


    scaleFactor = height / totalHeight; 
    for (let i = 0; i < rows; i++) {
      rowHeights[i] *= scaleFactor; 
    }

    
    time += 0.005; 
  }

  
  let x = 0; 
  let y = 0; 

 
  for (let j = 0; j <= cols; j++) {
    line(x, 0, x, height); 
    if (j < cols) {
      x += columnWidths[j]; 
    }
  }


  for (let i = 0; i <= rows; i++) {
    line(0, y, width, y); 
    if (i < rows) {
      y += rowHeights[i]; 
    }
  }

  
  fill('#00ED0B'); 
  x = 0;
  y = 0;
  for (let i = 0; i < rows; i++) {
    x = 0;
    for (let j = 0; j < cols; j++) {
      if (clickedCells[i][j]) {
        rect(x, y, columnWidths[j], rowHeights[i]); 
      }
      x += columnWidths[j]; 
    }
    y += rowHeights[i]; 
  }
}

function mousePressed() {
  let x = 0;
  let y = 0;

  for (let i = 0; i < rows; i++) {
    x = 0;
    for (let j = 0; j < cols; j++) {
      if (mouseX >= x && mouseX < x + columnWidths[j] && mouseY >= y && mouseY < y + rowHeights[i]) {
        clickedCells[i][j] = !clickedCells[i][j]; 
      }
      x += columnWidths[j]; 
    }
    y += rowHeights[i]; 
  }
}


function keyPressed() {
  if (key === ' ') { 
    isDynamic = !isDynamic; 
  }
}