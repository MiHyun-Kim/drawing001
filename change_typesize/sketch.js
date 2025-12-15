let sampleSize = 4;
let camWidth = 320;
let camHeight = 240;
let proportion = camWidth / camHeight;

let sizeSlider;
let message = "When I, in my senior year of high school in the cybersecurity class, there was a group project that we all did. The idea was we were supposed to reach out to a company or a group and say, we would like to test your system. We would like to see if it's secure, no charge or anything like that. We just wanna attest for that, for asking permission to attempt to break in these different ways. We'll give you the results and also recommend ways you can improve things to make it better. We ended up forming two groups. In my group, I was also the president of the school's gaming and eSports club.";
let messageIndex = 0;

let sliderWidth = 400; 

let myFont;

function preload() {
  myFont = loadFont('Velvelyne-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();


  sizeSlider = createSlider(5, 150, 20); 
  sizeSlider.style('width', sliderWidth + 'px');
  sizeSlider.position((width / 2) - (sizeSlider.width / 2), height-80);

  textFont(myFont);
}

function draw() {
  background(206, 226, 68);

  let textSizeValue = sizeSlider.value();
  textSize(textSizeValue);

  let gridStep = textSizeValue; 
  messageIndex = 0;

  for (let y = 0; y < height; y += gridStep) {
    for (let x = 0; x < width; x += gridStep) {
      fill('#ed1c24');
      text(message[messageIndex], x, y);
      messageIndex++;
      messageIndex %= message.length;
    }
  }
}
