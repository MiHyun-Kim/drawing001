let wordsEnglish = ['I','came','here','to the US', 'study','my','dream','from Chile','not much options','expensive','finding','scholarship','not easy', 'international student','four years',"of high school",'left hometown',
'went to','the capital','lived with','my uncles','had to leave', 'my parents','living outside','of where I am from','played tennis','to get scholarship','biggest sacrifices','pretty hard','biggest challenge',
'had to live','independently','only 14, 15 years old','graduated during COVID','a lot of challenges','away','from my family','grow up a lot','mature from inside'];

let words1 = [];
let words2 = [];

let drawingPoints = []; 
let isDrawing = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  textSize(16);
  textFont('sans-serif');

  for (let i = 0; i < wordsEnglish.length; i++) {
    let word = new Word(wordsEnglish[i], random(0, width), random(0, height), 0);
    words2.push(word);
  }
}

function draw() {
  background('#9276E4');


  for (let w of words1) {
    w.move();
    w.show();
  }

  for (let w of words2) {
    w.fade();
    w.show();
  }

 
  if (frameCount % 60 == 0 && words2.length < 2000) {
    for (let i = 0; i < wordsEnglish.length; i++) {
      let word = new Word(wordsEnglish[i], random(0, width), random(0, height), 0);
      words2.push(word);
    }
  }


  noFill();
  stroke('#ED1C24');
  strokeWeight(2);
  for (let stroke of drawingPoints) {
    beginShape();
    for (let pt of stroke) {
      vertex(pt.x, pt.y);
    }
    endShape();
  }
}

function mousePressed() {
  isDrawing = true;
  drawingPoints.push([]); 
}

function mouseReleased() {
  isDrawing = false;
}

function mouseDragged() {
  if (isDrawing) {
    drawingPoints[drawingPoints.length - 1].push({ x: mouseX, y: mouseY });
  }
}

class Word {
  constructor(char, x, y, alpha, haveStroke = false) {
    this.fadeSpeed = random(1, 3);
    this.x = x;
    this.y = y;
    this.char = char;
    this.fadingIn = true;
    this.alpha = alpha;
    this.haveStroke = haveStroke;
  }

  move() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  show() {
    if (this.haveStroke) {
      stroke(244, 244, 0, this.alpha);
      strokeWeight(2);
    } else {
      noStroke();
    }
    fill('#00ED0B');
    text(this.char, this.x, this.y);
  }

  fade() {
    if (this.fadingIn) {
      this.alpha += this.fadeSpeed;
      if (this.alpha >= 255) {
        this.alpha = 255;
        this.fadingIn = false;
      }
    } else {
      this.alpha -= this.fadeSpeed;
      if (this.alpha <= 0) {
        this.alpha = 0;
        this.fadingIn = true;
      }
    }
  }
}
