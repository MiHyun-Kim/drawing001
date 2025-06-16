'use strict';

let emojiList = ["✨", "✌🏾", "🤖", "🎈", "👧🏽", "🔥", "🌀", "🌟"];
let fontSizeMin = 16;
let angleDistortion = 0.2;
let trail = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  clear(); 
  textAlign(CENTER, CENTER);
  textFont('Arial');
  noCursor();
}

function draw() {
  clear(); 

  for (let i = trail.length - 1; i >= 0; i--) {
    let e = trail[i];
    push();
    translate(e.x, e.y);
    rotate(e.angle);
    fill(0, 0, 0, e.alpha); 
    textSize(e.size);
    text(e.char, 0, 0);
    pop();

    e.alpha -= 2;

    if (e.alpha <= 0) {
      trail.splice(i, 1);
    }
  }

  if (mouseIsPressed && mouseButton === LEFT) {
    let dx = mouseX - pmouseX;
    let dy = mouseY - pmouseY;
    let angle = atan2(dy, dx);
    let d = dist(mouseX, mouseY, pmouseX, pmouseY);
    let size = fontSizeMin + d / 2;

    let newEmoji = {
      char: random(emojiList),
      x: mouseX + random(-2, 2),
      y: mouseY + random(-2, 2),
      angle: angle + random(-angleDistortion, angleDistortion),
      size: size,
      alpha: 255
    };

    trail.push(newEmoji);
  }
}

function keyPressed() {
  if (key === 'c' || key === 'C' || key === ' ') {
    trail = []; 
    clear();    
  }
  if (keyCode === UP_ARROW) {
    angleDistortion += 0.05;
  }
  if (keyCode === DOWN_ARROW) {
    angleDistortion = max(0, angleDistortion - 0.05);
  }
  if (key === 's' || key === 'S') {
    saveCanvas('fading_emoji_trail', 'png');
  }
}
