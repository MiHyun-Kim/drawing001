let imageURLs = [
  'images/Careerfair.png',
  'images/Dataengineering.png',
  'images/DataMining.png',
  'images/DataScience.png',
  'images/Girlswhocode.png',
  'images/Linear.png',
  'images/Math.png',
  'images/Python.png',
  'images/ResearchPosition.png',
];

let images = [];
let placedImages = [];
let adding = true;
let index = 0;
const maxImages = 50;

function preload() {
  for (let url of imageURLs) {
    images.push(loadImage(url));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  clear();
  noLoop(); // Only redraw when necessary
}

function draw() {
  // Only updated via redrawScene()
}

function mousePressed() {
  if (adding) {
    if (placedImages.length < maxImages) {
      let img = images[index % images.length]; // Loop through image list
      let scale = 150 / img.width;
      let w = img.width * scale;
      let h = img.height * scale;
      
      placedImages.push({
        img: img,
        x: random(0, width - w),
        y: random(0, height - h),
        w: w,
        h: h
      });

      index++;
      redrawScene();

      if (placedImages.length >= maxImages) {
        adding = false;
      }
    }
  } else {
    if (placedImages.length > 0) {
      placedImages.pop();
      redrawScene();

      if (placedImages.length === 0) {
        adding = true;
        index = 0;
      }
    }
  }
}

function redrawScene() {
  clear(); // Clear canvas
   for (let obj of placedImages) {
     let img = obj.img;
    let aspectRatio = img.width / img.height;
    let desiredHeight = 150; // Make this larger or smaller as needed
    let desiredWidth = desiredHeight * aspectRatio;

    image(img, obj.x, obj.y, desiredWidth, desiredHeight);
  }
}
