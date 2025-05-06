let keywords = ["brothers", "support", "computer", "family", "software+developer", "website", "role models"];
let movers = [];
let numMovers = 25;
let myFont;

// Define a color map for specific words
let wordColors = {
  "brothers": "#3634FF",     // blue
  "support": "#FF00FE",        // red
  "computer": "#36FF00",  // green
  "family": "#00FFF8",         // yellow
  "software+developer": "#7E06FF",     // purple
  "website": "#ED1C24",
  "role models": "#FFF800",
};

function preload() {
  myFont = loadFont('terminal-grotesque.ttf'); // Replace with your font
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(myFont);
  textSize(52);
  textAlign(CENTER, CENTER);
  noStroke();

  for (let i = 0; i < numMovers; i++) {
    let word = random(keywords);
    movers.push({
      word: word,
      x: random(width),
      y: random(height),
      vx: random(-0.8, 0.8),
      vy: random(-0.8, 0.8),
      col: color(wordColors[word]) // Assign color from the map
    });
  }
}

function draw() {
  // Gradient background
  let fromColor = color('#FEACD8');
  let toColor = color('#8B40DB');
  for (let y = 0; y < height; y++) {
    let inter = pow(map(mouseX, 0, width, 0, 1),1);
    let c = lerpColor(fromColor, toColor, inter * y / height);
    stroke(c);
    line(0, y, width, y);
  }

  // Draw moving words with their assigned colors
  for (let mover of movers) {
    noFill();                      // No interior fill
  stroke(mover.col);            // Stroke is the assigned color
  strokeWeight(1.5);            // Optional: make it slightly thicker
  text(mover.word, mover.x, mover.y);

    mover.x += mover.vx;
    mover.y += mover.vy;

    if (mover.x < 0 || mover.x > width) mover.vx *= -1;
    if (mover.y < 0 || mover.y > height) mover.vy *= -1;
  }
}
