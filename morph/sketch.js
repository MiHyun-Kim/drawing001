// ########################################################## //
// #                                                        # //
// #            Test for post processing shaders            # //
// #                                                        # //
// ########################################################## //
// #                                                        # //
// #                Written by Fabian Kober                 # //
// #                  fabian-kober@gmx.net                  # //
// #                                                        # //
// ########################################################## //

// speed of the wobble
let speed = 1;

// tiling of the wobble
let tiling = 10;

// stength of the wobble
let strength = 0;

// the shader
let sh;

// an image
let img;

let vert = 'attribute vec4 aPosition;'+
'varying vec4 v_uv;'+
'void main() {'+
'v_uv = aPosition;'+
'v_uv.y *= -1.0;'+
'v_uv.x = v_uv.x * 0.5 + 0.5;'+
'v_uv.y = v_uv.y * 0.5 + 0.5;'+ 
    'gl_Position = aPosition;'+
'}';

let frag = 'precision mediump float;'+

'uniform sampler2D uSampler;'+
'uniform float u_time;'+

'uniform float u_speed;'+
'uniform float u_tiling;'+
'uniform float u_strength;'+

'varying vec4 v_uv;'+

'void main() {'+
'vec2 texcoord = vec2(v_uv.x-sin(u_time*u_speed)*0.05*cos(v_uv.y*u_tiling)*u_strength, v_uv.y-cos(u_time*u_speed)*0.05*sin(v_uv.x*u_tiling)*u_strength);'+
'vec4 col = texture2D(uSampler, texcoord);'+
'gl_FragColor = col;'+
'}'

function preload() {
    // load the image
    img = loadImage('alejandro_aspirational-02.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    sh = createShader(vert, frag);
		background(255);
}

function draw() {
    clear(); // Clear the frame each time
  
  let currentStrength, currentTiling;

  // Apply wobble only while mouse is pressed or over the canvas
  if (mouseIsPressed && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    currentStrength = strength + mouseX * 0.01;
    currentTiling = tiling + mouseY * 0.01;
  } else {
    currentStrength = 0; // reset to original image
    currentTiling = tiling; // or reset to a default like 10
  }

  // set uniforms
  sh.setUniform("uSampler", img);
  sh.setUniform("u_time", millis() / 1000);
  sh.setUniform("u_speed", speed);
  sh.setUniform("u_tiling", currentTiling);
  sh.setUniform("u_strength", currentStrength);

  shader(sh);
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
