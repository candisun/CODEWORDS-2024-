let message = "what makes you happy? type and release it!"; // Define and initialize the message variable
let messageX;
const xSpeed = 0.01;
const ySpeed = 0.03;

const amplitude = 150;
const verticalLetterSpacing = 8;
let messageY; // New variable to track the Y position

let hover = false; // New variable to track if a letter is hovered
let letterPositions = []; // Array to track the Y positions of each letter
let letterFloating = []; // Array to track if a letter is floating
let hoverRadius = 50; // Define a new variable for the hover radius

let sound; 
let messageDisplayed = false; // Flag to track if the message has been displayed


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
  sound.setVolume(0.2);
}

// Function to handle key typing
function keyTyped() {
  if (key !== ' ' || !messageDisplayed) { // Prevent adding spaces if the message has been displayed
    userInput += key; 
    userInputPositions.push(height / 2); // Add new letter's Y position for user input
    userInputFloating.push(false); // Initialize new letter's floating state for user input
  }
}

function draw() {
  background(203, 230, 255);
  textSize(100);
  textFont('Georgia', 'serif');
  fill(230,0,69);
  
  hover = false; // Reset hover state

  for (let i = 0; i < message.length; i++) {
    let letterY = letterPositions[i];
    const letterX = messageX + i * 50; // Define letterX here
  
    // Check if the mouse is hovering over the letter
    if (dist(mouseX, mouseY, letterX, letterY) < hoverRadius) {
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
  message += key; 
  letterPositions.push(height / 2); // Add new letter's Y position
  letterFloating.push(false); // Initialize new letter's floating state
}


