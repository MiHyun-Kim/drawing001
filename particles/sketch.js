let font;
let atext = 'click!';
let points;
let activeBuds = [];
let xcenter, ycenter;

let jitter = 0;
let colorShake = 100;
let tenebre = 10;
let strokeID = 'rgba(34,46,30,0.87)';
let backgroundID = '#DE91F9';
let spwanRatio = 5;
let l0 = 0;
let lmax = 30;
let density = 0.05;

let baseRadius = 3;
let rR = 0.9;
let baseStep = 1;
let stepR = 0.95;
let slow = 3;

let wordList = ["lego", "robotics", "pride", "problem", "solving", "competition", "won"];
let wordIndex = 0;

let offsetX, offsetY;

function preload() {
  font = loadFont('terminal-grotesque.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(round(min([windowWidth, windowHeight])) * 0.5);
  textAlign(LEFT, BOTTOM);
  background(255);
  updateText();
}

function draw() {

  let radiusFactor = map(mouseX, 0, width, 0.5, 7); 
  let colorFactor = map(mouseY, 0, height, -50, 50); 

  let growCycle = frameCount % slow;
  let spawnCycle = frameCount % (slow * spwanRatio);
  
if (spawnCycle === 1) {
  updateText();
  for (let p of points) {
    let r = baseRadius * radiusFactor;


    let lightGreen = color(0, 237, 11);  
    let darkGreen = color(0, 130, 0);    

   
    let t = map(mouseX, 0, width, 0, 1);
    t = constrain(t, 0, 1);

    let colObj = lerpColor(lightGreen, darkGreen, t);
    let col = [red(colObj), green(colObj), blue(colObj)];
    
addBud(
  p.x + offsetX,
  p.y + offsetY,
  r,
  random(0, TWO_PI),
  col,
  baseStep,
  l0
);

  }
}


  if (growCycle === 0) {
    background(backgroundID);
    for (let i = 0; i < activeBuds.length; i++) {
      let b = activeBuds.pop();
      fill(getCol(b.col));
      stroke(strokeID);
      circle(b.pos[0], b.pos[1], b.radius * 2 + random(-jitter, jitter));
      b = growBud(b);
      if (b.len < lmax) activeBuds.unshift(b);
    }
  }
}

function addBud(x, y, r, d, c, s, ll) {
  activeBuds.push({ pos: [x, y], radius: r, dir: d, col: c, step: s, len: ll });
}

function growBud(b) {
  let { pos, radius, dir, col, step, len } = b;
  pos = [pos[0] + step * cos(dir), pos[1] + step * sin(dir)];
  dir += noise(pos[0], pos[1]) * 2 - 1;
  if (len < lmax / 4) {
    radius *= 1 + (1 - rR);
    col = [col[0] - 4, col[1] - 4, col[2] - 4];
    step *= 1 + (1 - stepR);
  } else {
    radius *= rR;
    col = [col[0] + 4, col[1] + 4, col[2] + 4];
    step *= stepR;
  }
  len++;
  return { pos, radius, dir, col, step, len };
}

function getCol(k) {
  return color(k[0], k[1], k[2]);
}


function updateText() {
  points = font.textToPoints(
    atext,
    0,
    0,
    textSize(),
    { sampleFactor: density }
  );

  let xmin = 10000, xmax = -10000;
  let ymin = 10000, ymax = -10000;

  for (let p of points) {
    if (p.x < xmin) xmin = p.x;
    if (p.x > xmax) xmax = p.x;
    if (p.y < ymin) ymin = p.y;
    if (p.y > ymax) ymax = p.y;
  }

 
  let boxWidth = xmax - xmin;
  let boxHeight = ymax - ymin;


  let centerX = xmin + boxWidth / 2;
  let centerY = ymin + boxHeight / 2;


  offsetX = width / 2 - centerX;
  offsetY = height / 2 - centerY;
}


function mousePressed() {
  activeBuds = [];
  atext = wordList[wordIndex];
  wordIndex = (wordIndex + 1) % wordList.length;
  background(255);
}
