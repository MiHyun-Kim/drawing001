let fonts = [];
let letters = [];

let message = "I was the only black girl in my classrooms.";
let currentIndex = 0;
let lettersPerClick = 2;
let spreadRadius = 40;

function preload() {
  fonts[0] = loadFont("terminal-grotesque.ttf");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
   // no automatic redraw — static background
}

function draw() {
  background("#008200");
  // Don't clear the canvas — just update and draw letters
  for (let i = letters.length - 1; i >= 0; i--) {
    letters[i].update();
    letters[i].display();
    
    if (letters[i].isDead()) {
      letters.splice(i, 1);
    }
  }
}

function mouseDragged() {
  if (frameCount % 5 === 0) {
    releaseLetters();
  }
}

function releaseLetters() {
  // Only 1 letter per drag step
  let char = message.charAt(currentIndex);
  currentIndex = (currentIndex + 1) % message.length;

  let angle = random(360);
  let r = random(spreadRadius);
  let x = mouseX + cos(angle) * r;
  let y = mouseY + sin(angle) * r;

  letters.push(new Letter(x, y, char));
}


class Letter {
  constructor(x, y, char) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.font = random(fonts);
    this.size = random(48, 72);

    this.alpha = 255;
    this.fadeSpeed = random(0.5, 1.5);
    this.floatX = random(-0.3, 0.3);
    this.floatY = random(-0.5, -1.5); // upward drift
  }

  update() {
    this.x += this.floatX;
    this.y += this.floatY;
    this.alpha -= this.fadeSpeed;
  }

  display() {
    fill(222, 145, 249, this.alpha);  // RGB of #DE91F9 + fading alpha

    textFont(this.font);
    textSize(this.size);
    text(this.char, this.x, this.y);
  }

  isDead() {
    return this.alpha <= 0;
  }
}
