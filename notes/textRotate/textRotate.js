var SIZE;
var xPos, yPos, pic;

function preload() {
  //pic = loadImage('data/stoic.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER, CENTER);
  SIZE = 40;
  frameRate(50);
  angleMode(DEGREES);
}

function draw() {
  background(0, 25); // Create a fading background effect

  // Set random positions for the text
  xPos = random(width);
  yPos = random(height);

  fill(255);

  if (mouseIsPressed) {
    fill(0);
  } else {
    fill("Red");
  }

  textSize(SIZE);

  push();
  translate(xPos, yPos); // Move to random position
  noStroke();
  
  // Rotate randomly each frame
  rotate(random(360)); // Random rotation angle
  
  text('Candice Sun', 0, 0); // Text drawn at the origin after translation
  pop();

  // Draw a line following the mouse movement
  stroke(0, 0, 255);
  strokeWeight(5);
  line(mouseX, mouseY, pmouseX, pmouseY);
}

function mousePressed() {  
  SIZE++; // Increase text size on mouse press
}
