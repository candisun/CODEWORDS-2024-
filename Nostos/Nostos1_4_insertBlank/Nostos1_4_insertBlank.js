let draggedWord = null; // store what's being dragged
let myString = ["no", "greater", "blank1", "than", "to", "be", "mindful", "of", "blank2", "time", "in", "misery"]; // list of words with blanks

function setup() {
    noCanvas();
    // dragover event
    document.addEventListener('DOMContentLoaded', (event) => {
        let blanks = document.querySelectorAll('.blank'); 
        blanks.forEach(blank => { 
            blank.addEventListener('dragover', allowDrop); 
            blank.addEventListener('drop', drop); 
        });
    });
    // drag word
    let words = document.querySelectorAll('.word1, .word2'); 
    words.forEach(word => { // loops through each element in words array
        if (word.textContent === "sorrow" || word.textContent === "happy") {
            word.setAttribute('draggable', true);   // make word elements draggable
            word.addEventListener('dragstart', drag);   // add event listener for the 'dragstart' event
        }
    });
    // display words in order with random vertical positions
    displayWordsInOrder();
}

function setupAnimations() {
    const word1 = document.querySelector('.word1');
    const word2 = document.querySelector('.word2');
    const randomPoem = document.querySelector('.random-poem');
  
    if (word1) {
      floatElement(word1, 'float', '2s');
    }
  
    if (word2) {
      floatElement(word2, 'float', '2s');
    }
  
    if (randomPoem) {
      randomPoem.style.animation = 'none'; // Disable animation for random-poem
    }
  }
  
  document.addEventListener('DOMContentLoaded', (event) => {
    setupAnimations();
  });


// when word is dragged over the blank 
function allowDrop(event) {  
    event.preventDefault(); // override 'dragover' event, allow the drop to happen
}

// when a word starts being dragged
function drag(event) {
    draggedWord = event.target; // set 'draggedWord' to the element that is being dragged
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
    draggedWord = null; // reset the draggedWord variable
}

// function to display words in order with random vertical positions
function displayWordsInOrder() {
    let wordsContainer = document.getElementById('random-poem');
    
    if (wordsContainer) {
        wordsContainer.innerHTML = ''; // clear existing content
        myString.forEach((word, index) => {   // use forEach function to create word elements
           let wordElement = document.createElement('div');
           wordElement.className = 'word1','word2';
           wordElement.textContent = word;
           if (word === "sorrow") {
                wordElement.classList.add('word-sorrow'); // add class for 'sorrow'
                // wordElement.style.position = 'absolute';
                // wordElement.style.top = `${Math.random() * 100}px`; // random vertical position
                // wordElement.style.left = `${Math.random() * 100}px`; // random horizontal position
            } else if (word === "happy") {
                wordElement.classList.add('word-happy'); // add class for 'happy'
                // wordElement.style.position = 'absolute';
                // wordElement.style.top = `${Math.random() * 100}px`; // random vertical position
                // wordElement.style.left = `${Math.random() * 100}px`; // random horizontal position
            }

           wordElement.setAttribute('draggable', true); // make the word elements draggable
           wordElement.addEventListener('dragstart', drag); // add event listener for the 'dragstart' event
           if (word === 'blank1' || word === 'blank2') {
                wordElement.classList.add('blank');
                wordElement.textContent = '';  // Ensure the blank is empty
                wordElement.addEventListener('dragover', allowDrop); 
                wordElement.addEventListener('drop', drop); 
           }

           wordsContainer.appendChild(wordElement);
           wordElement.style.position = 'absolute';
           wordElement.style.top = `${Math.random() * 40 + 10}%`;
           wordElement.style.left = `${(index / myString.length) * 35}%`;
           wordElement.style.marginLeft = `430px`;
           wordElement.style.marginTop = `110px`;
        });
    }
}

//removed html blanks
//  added css styling for blanks
    //refined word colour, typeface, size, position
// refine sorrow and happy drop and drag 
//floating for happy and sorrow
