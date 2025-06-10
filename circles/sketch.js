function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 255);
  canvas.class('phoneCanvas');
  background(206,226,68);
  strokeWeight(1); 
}

function draw() {
 
  let r = random(220, 255);  
  let g = random(10, 40);    
  let b = random(20, 50);   
  

  stroke(r, g, b, 90);     
  noFill();                


  ellipse(mouseX, mouseY, abs(mouseX - pmouseX) * 4, abs(mouseY - pmouseY) * 4);
}
