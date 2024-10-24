// Declare necessary variables
let sorrowDropped = false;
let happyDropped = false;
let draggedWord = null; // store what's being dragged
let myString = ["no", "greater", "blank1", "than", "to", "be", "mindful", "of", "blank2", "time", "in", "misery"]; // list of words with blanks
let lastWord = '';
let typewriterSound;

function preload() {
    typewriterSound = loadSound('data/typewriter-click.mp3'); // Load the typewriter sound file
}

function setup() {
    noCanvas();

    // Add a click event listener to resume the AudioContext
    document.addEventListener('mouseover', () => {
        if (getAudioContext().state !== 'running') {
            getAudioContext().resume().then(() => {
                console.log('Audio context resumed');
            });
        }
    });

    // dragover event
    document.addEventListener('DOMContentLoaded', (event) => {
        let blanks = document.querySelectorAll('.blank');
        blanks.forEach(blank => {
            blank.addEventListener('dragover', allowDrop);
            blank.addEventListener('drop', drop); // drop
        });
    });

    // drag word
    let words = document.querySelectorAll('.word1, .word2');
    words.forEach(word => { // loops through each element in words array
        if (word.textContent === "sorrow" || word.textContent === "happy") {
            word.setAttribute('draggable', true);   // make word elements draggable
            word.addEventListener('dragstart', drag);
        }
    });

    // display words in order with random vertical positions
    displayWordsInOrder();
}

// when word is dragged over the blank 
function allowDrop(event) {
    event.preventDefault(); // override 'dragover' event, allow the drop to happen
}

// when a word starts being dragged
function drag(event) {
    draggedWord = event.target; // set 'draggedWord' to the element that is being dragged
    event.dataTransfer.setData("text", event.target.textContent);
}

// when word is being dropped
function drop(event) {
    event.preventDefault();  // prevents the default behaviour of the event
    if (event.target.classList.contains('blank') && (draggedWord.textContent === "sorrow" || draggedWord.textContent === "happy")) {
        event.target.textContent = draggedWord.textContent; // set the blank's text to the dragged word's text

        if (draggedWord.textContent === "sorrow") {
            event.target.classList.add('filled-sorrow'); // add the 'filled-sorrow' class to the blank
        } else if (draggedWord.textContent === "happy") {
            event.target.classList.add('filled-happy'); // add the 'filled-happy' class to the blank
        }
        draggedWord.style.visibility = 'hidden'; // hide the dragged word
    }
    lastWord = draggedWord.textContent; // update the lastWord with the dropped word
    draggedWord = null; // reset the draggedWord variable
    newDrop(event); // call newDrop after drop event is handled
}

function newDrop(event) {
    let data = event.dataTransfer.getData("text");
    console.log('newDrop called with data:', data);

    if (data === 'sorrow' && event.target.classList.contains('blank')) {
        sorrowDropped = true;
        event.target.classList.remove('blank'); // Remove the blank class to hide the blank style
    } else if (data === 'happy' && event.target.classList.contains('blank')) {
        happyDropped = true;
        event.target.classList.remove('blank'); // Remove the blank class to hide the blank style
    }
    checkCompletion(data);
}

// function to check if both words are dropped
function checkCompletion() {
    console.log('Checking drop completion');
    console.log('sorrowDropped:', sorrowDropped, 'happyDropped:', happyDropped);

    // Check if both words are dropped
    if (sorrowDropped && happyDropped) {
        // Check if the last word is 'sorrow' and navigate to 'sorrow.html'
        if (lastWord === 'sorrow') {
            window.location.href = 'fragmentShader_Sound/sorrow.html';
        }
        // Check if the last word is 'happy' and navigate to 'happy.html'
        if (lastWord === 'happy') {
            window.location.href = 'happyjumping_edited/happy.html';
        }
    }
}

// Assuming this is within a function or event handler
function playTypewriterSound() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume().then(() => {
            typewriterSound.play(); // Play the typewriter sound
        });
    } else {
        typewriterSound.play(); // Play the typewriter sound
    }
}

// function to display words in order with random vertical positions
function displayWordsInOrder() {
    let wordsContainer = document.getElementById('random-poem');

    if (wordsContainer) {
        wordsContainer.innerHTML = ''; // clear existing content
        myString.forEach((word, index) => {   // use forEach function to create word elements
            let wordElement = document.createElement('div');
            wordElement.className = 'word'; // Set a base class for all words
            wordElement.textContent = word;

            if (word === "sorrow") {
                wordElement.classList.add('word-sorrow', 'sorrow'); // add class for 'sorrow'
                wordElement.setAttribute('draggable', 'true');
            } else if (word === "happy") {
                wordElement.classList.add('word-happy', 'happy'); // add class for 'happy'
                wordElement.setAttribute('draggable', 'true');
            } else {
                wordElement.setAttribute('draggable', 'false');
            }

            if (word === 'blank1' || word === 'blank2') {
                wordElement.classList.add('blank');
                wordElement.style.padding = '20px 20px'; // Increased padding for larger droppable area
                wordElement.textContent = '';  // Ensure the blank is empty
                wordElement.addEventListener('dragover', allowDrop);
                wordElement.addEventListener('drop', drop);
            }

            wordsContainer.appendChild(wordElement); // Append the word element to the container
            wordElement.style.position = 'absolute';
            wordElement.style.top = `${Math.random() * 40 + 10}%`;
            wordElement.style.left = `${(index / myString.length) * 35}%`;
            wordElement.style.marginLeft = `430px`;
            wordElement.style.marginTop = `110px`;
        });
    }
}
