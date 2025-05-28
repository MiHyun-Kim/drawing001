function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 255);
  canvas.class('phoneCanvas');
  background(206,226,68);
  strokeWeight(1); 
}

function draw() {
  // Create a random shade around #ED1C24
  let r = random(220, 255);  // Red around 237
  let g = random(10, 40);    // Green around 28
  let b = random(20, 50);    // Blue around 36
  

  stroke(r, g, b, 90);     // Stroke uses random red shade
  noFill();                // No fill for outlined look (optional: or use fill + stroke)

  // Draw ellipse with size based on mouse movement
  ellipse(mouseX, mouseY, abs(mouseX - pmouseX) * 4, abs(mouseY - pmouseY) * 4);
}
