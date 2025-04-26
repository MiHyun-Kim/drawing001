let font;
let fontSize = 100;
let message = "I told him that I'm struggling to understand. And he said, oh, it's because you're a woman and women don't comprehend quite as fast as me...And I got really upset and I left. I even told him that made me upset. I literally walked away from him.";
let pointsArray = [];
let slider;

function preload() {
  font = loadFont('terminal-grotesque-webfont.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(fontSize);
  noStroke();
  fill(0);

  slider = createSlider(0, 25, 5, 0.1);
  let sliderWidth = 200;
  slider.position(windowWidth - sliderWidth - 20, height-30);
  slider.style('width', '200px');
  slider.style('background', '#e0e0e0');      // Track color (fallback)
  slider.style('accent-color', '#FEACD8'); 
  slider.style('z-index', '1000');

  generatePointsAcrossLines();
}

function generatePointsAcrossLines() {
  pointsArray = [];
  let x = 40;
  let y = 100;

  for (let i = 0; i < 1000; i++) { // Large number to fill screen
    let char = message[i % message.length];
    let charWidth = textWidth(char);

    if (x + charWidth > width - 40) {
      x = 40;
      y += fontSize * 1.3;
      if (y > height - 40) break;
    }

    let pts = font.textToPoints(char, x, y, fontSize, {
      sampleFactor: 0.25,
      simplifyThreshold: 0
    });

    pointsArray.push(pts);
    x += charWidth + 5;
  }
}

function draw() {
  background('0,0,0,0');
  let t = millis() / 1000;
  let waveAmount = slider.value();

  for (let pts of pointsArray) {
    for (let pt of pts) {
      let waveX = pt.x + sin(t * 3 + pt.y * 0.05) * waveAmount;
      let waveY = pt.y + cos(t * 3 + pt.x * 0.05) * waveAmount;
      ellipse(waveX, waveY, 2);
    }
  }

  fill('#FEACD8');
  textSize(15);
  text("wave amount", slider.x-120, slider.y + 15);
}
