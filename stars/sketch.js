let pluses = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(240);
  noLoop();
}

function draw() {
  background('#1DABCD');
  
  for (let p of pluses) {
    drawStar(p.x, p.y, p.size, p.arms, p.col);
  }
}

function drawStar(x, y, size, arms, col) {
  stroke(col);
  strokeWeight(2);

  for (let i = 0; i < arms; i++) {
    let angle = TWO_PI / arms * i;
    let x1 = x + cos(angle) * size / 2;
    let y1 = y + sin(angle) * size / 2;
    let x2 = x - cos(angle) * size / 2;
    let y2 = y - sin(angle) * size / 2;
    line(x1, y1, x2, y2);
  }
}

function mousePressed() {
  let randomArms = int(random(2, 13));
  let newPlus = {
    x: mouseX,
    y: mouseY,
    size: random(20, 50),
    arms: randomArms,
    col: randomDEFE10Shade()
  };
  pluses.push(newPlus);
  redraw();
}

function randomDEFE10Shade() {
  let r = constrain(222 + random(-20, 20), 0, 255);
  let g = constrain(254 + random(-20, 5), 0, 255);
  let b = constrain(16 + random(-10, 20), 0, 255);
  return color(r, g, b);
}

