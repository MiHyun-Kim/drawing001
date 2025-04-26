let dots = [];
let connections = [];
let selectedDot = null;
let lastConnectedDot = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 30; i++) {
  dots.push(new DotObject(i + 1)); // start counting from 1
}
}

function draw() {
  background('#FEACD8');

  for (let dot of dots) {
    if (isDotConnected(dot)) {
      dot.update();  // Only move connected dots
    }
    dot.show();
  }

  // Draw the lines between connected dots
  stroke(245);
  for (let conn of connections) {
    line(conn[0].x, conn[0].y, conn[1].x, conn[1].y);
  }
}
function mousePressed() {
  for (let dot of dots) {
    if (dist(mouseX, mouseY, dot.x, dot.y) < 10) {
      if (lastConnectedDot === null) {
        lastConnectedDot = dot;  // Start the chain
      } else if (lastConnectedDot !== dot) {
        connections.push([lastConnectedDot, dot]);
        lastConnectedDot = dot;  // Continue the chain
      }
      break;
    }
  }
}

function isDotConnected(dot) {
  for (let conn of connections) {
    if (conn[0] === dot || conn[1] === dot) {
      return true;
    }
  }
  return false;
}

// DotObject Class
class DotObject {
  constructor(id) {
    this.id = id;
    this.x = random(width);
    this.y = random(height);
    this.radius = 5;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
  }

  update() {
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
    this.x += this.vx / 2;
    this.y += this.vy / 2;
  }

 show() {
  // Draw the dot
  noStroke();
  fill('#8B40DB');
  ellipse(this.x, this.y, this.radius * 2);

  // Draw the number next to the dot
  fill('#8B40DB');
  textAlign(LEFT, CENTER);
  textSize(12);
  text(this.id, this.x + this.radius + 4, this.y);
}
}

