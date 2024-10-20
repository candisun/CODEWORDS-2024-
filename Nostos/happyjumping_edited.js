let message = "what makes you happy? type and release it!"; // Define and initialize the message variable
let messageX, userInputX;
const ySpeed = 0.03;
const amplitude = 150;
const verticalLetterSpacing = 17;
const letterSpacing = 40; // Standard spacing for all messages
let messageY; // New variable to track the Y position
let hover = false; // New variable to track if a letter is hovered
let letterPositions = []; // Array to track the Y positions of each letter
let letterFloating = []; // Array to track if a letter is floating
let hoverRadius = 50; // Define a new variable for the hover radius
let sound;
let userInput = ''; // To store user input
let userInputPositions = []; // Array to track the Y positions of each letter for user input
let userInputFloating = []; // Array to track if a letter is floating for user input
let userInputXPositions = []; // Array to track the X positions of each user input character
let originalMessageActive = true; // Flag to track if the original message is active

function preload() {
    sound = loadSound('data/balloon-inflation.mp3'); // Load the sound file
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    messageX = width;
    userInputX = width; // Initialize user input X position to start from the right
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
        userInputXPositions.push(userInputX + userInput.length); // Initialize new letter's X position
        lastKeyPressTime = millis(); // Update the last key press time
    }
}

function draw() {
    background(203, 230, 255);
    textSize(100);
    textFont('Georgia', 'serif');
    fill(230, 0, 69);
    hover = false; // Reset hover state

    // Draw original message if it is active
    if (originalMessageActive) {
        for (let i = 0; i < message.length; i++) {
            let letterY = letterPositions[i];
            const letterX = messageX + i * letterSpacing; // Use standard letter spacing

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

        // Move the original message off the screen and deactivate it when it disappears
        messageX -= 2;
        if (messageX < -message.length * letterSpacing) { // Adjust reset condition with standard spacing
            originalMessageActive = false;
        }
    }

    // Draw user input message immediately
    for (let i = 0; i < userInput.length; i++) {
        let letterY = userInputPositions[i];
        let letterX = userInputXPositions[i]; // Use stored X position

        // Check if the mouse is hovering over the letter
        if (dist(mouseX, mouseY, letterX, letterY) < hoverRadius) {
            hover = true;
            if (!userInputFloating[i]) {
                sound.play(); // Play the sound when the letter starts floating
            }
            userInputFloating[i] = true; // Set the letter to floating state
        }

        // Move the letter upwards if it is floating
        if (userInputFloating[i]) {
            userInputPositions[i] -= 2; // Move the letter upwards
        } else {
            // Apply sine wave movement if not hovered
            letterY = height / 2 + sin((frameCount - i * verticalLetterSpacing) * ySpeed) * amplitude;
            userInputPositions[i] = letterY;
        }

        text(userInput[i], letterX, letterY);

        // Move the user input letter off the screen and maintain positions
        userInputXPositions[i] -= 2;
    }
}
