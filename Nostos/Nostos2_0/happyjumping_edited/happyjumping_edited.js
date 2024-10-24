let message = "what makes you happy? type it here!"; // Define and initialize the message variable
let messageX;
const xSpeed = 0.01;
const ySpeed = 0.03;
const amplitude = 150;
const verticalLetterSpacing = 8;
let messageY; // New variable to track the Y position
let hover = false; // New variable to track if a letter is hovered
let letterPositions = []; // Array to track the Y positions of each letter
let letterFloating = []; // Array to track if a letter is floating
let sound; 

function preload() {
  sound = loadSound('data/balloon-inflation.mp3'); // Load the sound file
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  messageX = width;
  messageY = height / 2; // Initialize messageY to the center of the canvas
  for (let i = 0; i < message.length; i++) {
    letterPositions.push(height / 2); // Initialize each letter's Y position
    letterFloating.push(false); // Initialize each letter's floating state
  }
  sound.setVolume(0.035);
}

function draw() {
  background(173, 216, 255);
  textSize(100);
  textFont('Georgia', 'serif');
  fill(230,0,69);
  
  hover = false; // Reset hover state

  for (let i = 0; i < message.length; i++) {
    let letterY = letterPositions[i];
    const letterX = messageX + i * 50; // Define letterX here
  
    // Check if the mouse is hovering over the letter
    if (mouseX > letterX && mouseX < letterX + textWidth(message[i]) &&
        mouseY > letterY - textAscent() && mouseY < letterY) {
      hover = true;
      if (!letterFloating[i]) {
        sound.play(); // Play the sound when the letter starts floating
        
      }
      letterFloating[i] = true; // Set the letter to floating state
    }

    // Move the letter upwards if it is floating
    if (letterFloating[i]) {
      letterPositions[i] -= 2; // Move the letter upwards
    } else {
      // Apply sine wave movement if not hovered
      letterY = height / 2 + sin((frameCount - i * verticalLetterSpacing) * ySpeed) * amplitude;
      letterPositions[i] = letterY;
    }

    text(message[i], letterX, letterY);
  }

  messageX -= 2;
  if (messageX < -message.length * 50) { // Reset messageX only after the entire message has moved off the screen
    messageX = width;
  }
}

function keyTyped() {
  message += key; // message="112345tyhuyghcrzesdxufguyahwvrsxdgcfg iouhsntg";
  letterPositions.push(height / 2); // Add new letter's Y position
  letterFloating.push(false); // Initialize new letter's floating state
}
