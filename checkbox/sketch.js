'use strict';

let numBoxes = 100;
let boxes = [];
let boxPositions = [];
let boxHolder;
let boxSize = 20;

function setup() {
  document.body.style.backgroundColor = '#FEACD8'; // light gray, for example

  noCanvas();
  boxHolder = createDiv('');
  boxHolder.id('mirror');
  boxHolder.style('position', 'relative');
  boxHolder.style('overflow', 'hidden');
  boxHolder.style('width', windowWidth + 'px');
  boxHolder.style('height', windowHeight + 'px');

  createCheckboxes();

  // Buttons
 let randomButton = createButton('Randomize');
randomButton.mousePressed(randomizeCheckboxes);
randomButton.parent(document.body);
randomButton.style('position', 'fixed');
randomButton.style('bottom', '20px');
randomButton.style('right', '20px');
randomButton.style('padding', '10px 20px');
randomButton.style('margin', '5px');
randomButton.style('font-size', '16px');
randomButton.style('background-color', '#0a84ff');
randomButton.style('color', 'white');
randomButton.style('border', 'none');
randomButton.style('border-radius', '0px');
randomButton.style('cursor', 'pointer');

let clearButton = createButton('Clear All');
clearButton.mousePressed(clearCheckboxes);
clearButton.parent(document.body);
clearButton.style('position', 'fixed');
clearButton.style('bottom', '20px');
clearButton.style('right', '160px');
clearButton.style('padding', '10px 20px');
clearButton.style('margin', '5px');
clearButton.style('font-size', '16px');
clearButton.style('background-color', '#0a84ff');
clearButton.style('color', 'white');
clearButton.style('border', 'none');
clearButton.style('border-radius', '0px');
clearButton.style('cursor', 'pointer');

}

// Recalculate layout on window resize
function windowResized() {
  boxHolder.style('width', windowWidth + 'px');
  boxHolder.style('height', windowHeight + 'px');
  clearCheckboxElements();
  createCheckboxes();
}

function createCheckboxes() {
  boxes = [];
  boxPositions = [];

  let attempts = 0;
  let maxAttempts = 10000;

  while (boxes.length < numBoxes && attempts < maxAttempts) {
    let x = floor(random(0, windowWidth - boxSize));
    let y = floor(random(0, windowHeight - boxSize));

    // Check for overlap
    let overlapping = false;
    for (let pos of boxPositions) {
      if (dist(x, y, pos.x, pos.y) < boxSize) {
        overlapping = true;
        break;
      }
    }

    if (!overlapping) {
      let box = createCheckbox();
      box.style('position', 'absolute');
      box.position(x, y);
      box.parent(boxHolder);

      if (random() < 0.3) {
        box.checked(true);
      }

      boxes.push(box);
      boxPositions.push({ x, y });
    }

    attempts++;
  }
}

function clearCheckboxElements() {
  for (let box of boxes) {
    box.remove();
  }
  boxes = [];
  boxPositions = [];
}

function randomizeCheckboxes() {
  for (let box of boxes) {
    box.checked(random() > 0.5);
  }
}

function clearCheckboxes() {
  for (let box of boxes) {
    box.checked(false);
  }
}

