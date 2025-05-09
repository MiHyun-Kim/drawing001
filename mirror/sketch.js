let camera;
let sampleSize = 4;
let camWidth = 320;
let camHeight = 240;
let proportion = camWidth / camHeight;
let threshold;
let multiplier;
let thresholdSlider;

let message = "When I, in my senior year of high school in the cybersecurity class, there was a group project that we all did. The idea was we were supposed to reach out to a company or a group and say, we would like to test your system. We would like to see if it's secure, no charge or anything like that. We just wanna attest for that, for asking permission to attempt to break in these different ways. We'll give you the results and also recommend ways you can improve things to make it better. We ended up forming two groups. In my group, I was also the president of the school's gaming and eSports club. ";
let messageIndex = 0;

let myFont;

function preload() {
  // Load your font file (adjust the path if needed)
  myFont = loadFont('Velvelyne-Regular.ttf');
}


function setup() {
	camera = createCapture(VIDEO);
	camera.size(camWidth, camHeight);
	camera.hide();

	//halfway point for colors
	createCanvas(windowWidth, windowHeight);
  
	multiplier = width / camWidth;
	noStroke();
	thresholdSlider = createSlider(0, 765, threshold);
	thresholdSlider.position((width / 2) - (thresholdSlider.width / 2), height - 40);
	//use a monospace font
	textFont(myFont);
	textSize(sampleSize * multiplier);
	print(message);
}

let i, r, g, b, rSize, gSize, bSize;

function draw() {
	messageIndex = 0;
	background(206,226,68);
	camera.loadPixels();
	//create a grid of nested circles
	for (let y = 0; y < camera.height; y += sampleSize) {
		for (let x = 0; x < camera.width; x += sampleSize) {
			i = ((y * camera.width) + x) * 4;
			r = camera.pixels[i];
			g = camera.pixels[i + 1];
			b = camera.pixels[i + 2];
			if (r + g + b < thresholdSlider.value()) {
				 fill(0);//text color
				text(message[messageIndex], x * multiplier, y * multiplier);
				messageIndex++;
				messageIndex %= message.length;
			}
		}
	}

}
