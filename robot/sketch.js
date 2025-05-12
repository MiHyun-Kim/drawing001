let colors = ['#DEFE10'];

let robots = [];
let overAllTexture;
let cnv;

class Robot {
  constructor(args) {
    let def = {
      p: createVector(width / 3, height / 2), // moved slightly left
      v: createVector(0, 0),
      a: createVector(0, 0),
      randomId: random(500),
      size: createVector(random(65, 95), random(50, 95)),
      antennaSize: createVector(random(5, 30), random(5, 30)),
      colors: colors,
      eyeSizes: createVector(random(15, 35), random(25, 35)),
      ang: random(-0.1, 0.1),
      corner: random([0, 0, 5, 20, 50]),
      strokeWeight: random(2, 5),
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }

  draw() {
    push();
    translate(this.p.x, this.p.y);
    scale(0.95);
    rotate(this.ang + sin(this.randomId + mouseX / 100 + frameCount / 50 + this.p.x + this.p.y) / 4);

    rectMode(CENTER);
    ellipseMode(CENTER);


    // Set glow effect for the stroke (around shapes)
		drawingContext.shadowColor = color(this.colors[0]); // Glow color
		drawingContext.shadowBlur = 30; // How intense the glow is
		drawingContext.shadowOffsetX = 0; // Shadow offset (no offset)
		drawingContext.shadowOffsetY = 0; // Shadow offset (no offset)
    
    stroke(this.colors[0]);
    noFill(); // ensures stroke-only
   
    strokeWeight(this.strokeWeight / 2);

    // Head
    //rect(0, 0, this.size.x, this.size.y, this.corner);

    // Eyes
   circle(-25, 0, this.eyeSizes.x + sin(frameCount / 50 + mouseX / 100) * 2);

    circle(25, 0, this.eyeSizes.x + sin(frameCount / 50 + mouseY / 100) * 2);

    // Eyebrows
    push();
    rotate(sin(frameCount / 30) / 6);
    rect(18, -25 + sin(frameCount / 50 + this.p.y - mouseX / 20) * 5, this.eyeSizes.x * 1.5, 6);
    pop();

    push();
    rotate(sin(frameCount / 20 + 1) / 5);
    rect(-18, -25 + sin(frameCount / 20 + mouseY / 25 + this.p.y) * 5, this.eyeSizes.x, 6);
    pop();

    // Antenna
    rect(0, -this.size.y / 2 + sin(frameCount / 20 + 0.5) * 5, this.antennaSize.x, this.antennaSize.y);

    // Nose
    rect(0, this.size.y / 8 + sin(frameCount / 20) * 5, 10, 20);

    // Mouth
    push();
    rotate(sin(frameCount / 10 + mouseX / 20 + mouseY / 20) / 5);
    rect(0, this.size.y / 3, this.size.x / 2, 5, 30);
    pop();

    pop();
  }

  update() {
    // Not used
  }
}

function addRobot(x, y) {
  robots.push(new Robot({ p: createVector(x, y) }));
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  background('#1DABCD');

  overAllTexture = createGraphics(width, height);
  overAllTexture.loadPixels();
  for (let i = 0; i < width + 50; i++) {
    for (let o = 0; o < height + 50; o++) {
      overAllTexture.set(i, o, color(100, noise(i / 3, o / 3, i * o / 50) * random([0, 50, 100])));
    }
  }
  overAllTexture.updatePixels();

  addRobot(width / 2, height / 2); // Add a robot
}

function draw() {
  translate(width / 2, height / 2); // Push robot toward left and up
  scale(7);
  translate(-width / 2, -height / 2);
  background('#1DABCD');

  robots.forEach(robot => {
    robot.update();
    robot.draw();
  });

  translate(width / 2, height / 2);
  scale(1 / 3);
  translate(-width / 2, -height / 2);
}
