let font;
let fontSize = 100;
let message = "I told him that I'm struggling to understand. And he said, it's because you're a woman and women don't comprehend quite as fast...And I got really upset and I left.";
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
  slider.position(20, height + 10);
  slider.style('width', '200px');
  slider.style('background', '#e0e0e0');      // Track color (fallback)
  slider.style('accent-color', '#7213FD'); 

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
  background('#EF9295');
  let t = millis() / 1000;
  let waveAmount = slider.value();

  for (let pts of pointsArray) {
    for (let pt of pts) {
      let waveX = pt.x + sin(t * 3 + pt.y * 0.05) * waveAmount;
      let waveY = pt.y + cos(t * 3 + pt.x * 0.05) * waveAmount;
      ellipse(waveX, waveY, 2);
    }
  }

  fill('#7213FD');
  textSize(16);
  text("Wave Amount", slider.x * 1.2 + slider.width, slider.y + 10);
}
