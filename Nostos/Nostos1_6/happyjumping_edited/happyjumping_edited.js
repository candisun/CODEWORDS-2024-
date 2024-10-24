let message = "what makes you happy? type it here!"; // Define and initialize the message variable
let messageX;
const ySpeed = 0.045;
const amplitude = 180;
const verticalLetterSpacing = 20;
let messageY; // New variable to track the Y position
let hover = false; // New variable to track if a letter is hovered
let letterPositions = []; // Array to track the Y positions of each letter
let letterFloating = []; // Array to track if a letter is floating
let sound; 
let padding = 80;

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
  sound.setVolume(0.6);
    // Resume AudioContext on mouse movement
    document.addEventListener('mousemove', () => {
      if (getAudioContext().state !== 'running') {
          getAudioContext().resume();
      }
  });
}


function draw() {
  background(80, 215, 255);

  hover = false; // Reset hover state

  for (let i = 0; i < message.length; i++) {
    let letterY = letterPositions[i];
    const letterX = messageX + i * 50; // Define letterX here
  
    // Check if the mouse is hovering over the letter
    if (mouseX > letterX && mouseX < letterX + textWidth(message[i]) &&
    mouseY > letterY - textAscent() - padding && mouseY < letterY + padding) {    
    //mouseY > letterY - textAscent() && mouseY < letterY) {
      hover = true;
      if (!letterFloating[i]) {
        if (getAudioContext().state !== 'running') {
          getAudioContext().resume().then(() => {
            sound.play(); // Play the sound when the letter starts floating
          });
        } else {
          sound.play(); // Play the sound when the letter starts floating
        }
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

    textSize(100);
    textFont('Georgia', 'serif');
    fill(230,0,69);
    text(message[i], letterX, letterY);
    }

  messageX -= 2;
  if (messageX < -message.length * 50) { // Reset messageX only after the entire message has moved off the screen
    messageX = width;
  }
  
  // textFont('Monospace'); 
  // fill(255);
  // textSize(10);
  // text("click to start", windowWidth / 2, windowHeight / 7); 

}

function keyTyped() {
  message += key; // message="112345tyhuyghcrzesdxufguyahwvrsxdgcfg iouhsntg";
  letterPositions.push(height / 2); // Add new letter's Y position
  letterFloating.push(false); // Initialize new letter's floating state
}