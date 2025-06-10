let colors = ['#DEFE10'];

let robots = [];
let overAllTexture;
let cnv;

class Robot {
  constructor(args) {
    let def = {
      p: createVector(width / 3, height / 2), 
      v: createVector(0, 0),
      a: createVector(0, 0),
      randomId: random(500),
      size: createVector(random(65, 95), random(50, 95)),
      antennaSize: createVector(random(5, 30), random(5, 30)),
      colors: colors,
      eyeSizesLeft: random(15, 35),
      eyeSizesRight: random(15, 35),
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
    
  
		drawingContext.shadowColor = color(this.colors[0]); 
		drawingContext.shadowBlur = 30; 
		drawingContext.shadowOffsetX = 0; 
		drawingContext.shadowOffsetY = 0; 

    
    stroke(this.colors[0]);
    noFill(); 
   
    strokeWeight(this.strokeWeight / 2);

    stroke('#DEFE10');
    strokeWeight(this.strokeWeight);
    circle(-25, 0, this.eyeSizesLeft + sin(frameCount / 50 + mouseY / 100) * 2);

  
    stroke('#DEFE10');
    strokeWeight(this.strokeWeight / 3);
    circle(25, 0, this.eyeSizesRight + sin(frameCount / 50 + mouseY / 100) * 2);



push();
rotate(sin(frameCount / 30) / 6);
rect(-25, -25 + sin(frameCount / 50 + this.p.y - mouseX / 20) * 5, this.eyeSizesLeft * 1.5, 6); // Use eyeSizesLeft directly
pop();

push();
rotate(sin(frameCount / 20 + 1) / 5);
rect(25, -25 + sin(frameCount / 20 + mouseY / 25 + this.p.y) * 5, this.eyeSizesRight * 1.5, 6); // Use eyeSizesRight directly
pop();

    rect(0, -this.size.y / 2 + sin(frameCount / 20 + 0.5) * 5, this.antennaSize.x, this.antennaSize.y);

    rect(0, this.size.y / 8 + sin(frameCount / 20) * 5, 10, 20);

    push();
    rotate(sin(frameCount / 10 + mouseX / 20 + mouseY / 20) / 5);
    rect(0, this.size.y / 2, this.size.x / 2, 5, 30);
    pop();

    pop();
  }

  update() {
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

  addRobot(width / 2, height / 2); 
}

function draw() {
  translate(width / 2, height / 2); 
  scale(8);
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
