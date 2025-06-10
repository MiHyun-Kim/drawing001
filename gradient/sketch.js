let keywords = ["brothers", "support", "computer", "family", "software developer", "web+mobile", "role models"];
let movers = [];
let numMovers = 25;
let myFont;


let wordColors = {
  "brothers": "#508EFB",    
  "support": "#FB33FB",      
  "computer": "#A1B714",  
  "family": "#B0FECB",        
  "software developer": "#E56D6C",    
  "web+mobile": "#19CAD8",
  "role models": "#FBDDAA",
};

function preload() {
  myFont = loadFont('terminal-grotesque.ttf'); 
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
      col: color(wordColors[word]) 
    });
  }
}

function draw() {
  
  let fromColor = color('#FEACD8');
  let toColor = color('#8B40DB');
  for (let y = 0; y < height; y++) {
    let inter = pow(map(mouseX, 0, width, 0, 1),1);
    let c = lerpColor(fromColor, toColor, inter * y / height);
    stroke(c);
    line(0, y, width, y);
  }

 
  for (let mover of movers) {
    noFill();                     
  stroke(mover.col);            
  strokeWeight(1.5);           
  text(mover.word, mover.x, mover.y);

    mover.x += mover.vx;
    mover.y += mover.vy;

    if (mover.x < 0 || mover.x > width) mover.vx *= -1;
    if (mover.y < 0 || mover.y > height) mover.vy *= -1;
  }
}
