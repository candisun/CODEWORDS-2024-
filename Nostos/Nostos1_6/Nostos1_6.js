// Declare necessary variables
let sorrowDropped = false;
let happyDropped = false;
let draggedWord = null; // store what's being dragged
let myString = ["no", "greater", "blank1", "than", "to", "be", "mindful", "of", "blank2", "time", "in", "misery"]; // list of words with blanks
//let lastWord = '';
let typewriterSound;

function preload() {
    typewriterSound = loadSound('data/typewriter-click.mp3'); // Load the typewriter sound file
}
function setup() {
    noCanvas();

    // Resume AudioContext on mouse movement
    document.addEventListener('mousemove', () => {
        if (getAudioContext().state !== 'running') {
            getAudioContext().resume();
        }
    });
    // dragover event
    document.addEventListener('DOMContentLoaded', (event) => {
    // Add event listeners to blank elements
    let blanks = document.querySelectorAll('.blank1, .blank2'); 
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
    }
    if (draggedWord) {
        draggedWord.style.visibility = 'hidden'; // hide the dragged word
    } else {
        console.error('draggedWord is not defined');
    }    
    draggedWord = null; // reset the draggedWord variable
    newDrop(event); // call newDrop after drop event is handled
} 


// when word is being dropped
function newDrop(event) { 
    let data = event.dataTransfer.getData("text");
    console.log('newDrop called with data:', data);
    
    if (data === 'sorrow' && (event.target.classList.contains('blank1') || event.target.classList.contains('blank2'))) {
        sorrowDropped = true;
        event.target.textContent = 'sorrow'; // Set the text content to 'sorrow'
        event.target.classList.add('no-blank-style'); // Add the no-blank-style class to override blank styles
        //event.target.classList.add('hidden'); // Add the hidden class to hide the element
        // event.target.classList.remove('blank1', 'blank2'); // Remove the blank class to hide the blank style
        event.target.classList.add('filled-sorrow'); // Add a filled class to mark it as filled
    } else if (data === 'happy' && (event.target.classList.contains('blank1') || event.target.classList.contains('blank2'))) {
        happyDropped = true;
        event.target.textContent = 'happy'; // Set the text content to 'happy'
        event.target.classList.add('no-blank-style'); // Add the no-blank-style class to override blank styles
        event.target.classList.add('filled-happy'); // Add a filled class to mark it as filled
    }
      // Debugging: Log the class list before and after adding 'filled'
      console.log('Drop target before adding filled:', event.target.classList);
      event.target.classList.add('filled'); // Add the filled class
      console.log('Drop target after adding filled:', event.target.classList);
  
    checkCompletion(event.target); // Pass event.target to checkCompletion
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
                    wordElement.classList.add('sorrow'); // add class for 'sorrow'
                } else if (word === "happy") {
                    wordElement.classList.add('happy'); // add class for 'happy'
                }

                // Add event listener for drop event
                wordElement.addEventListener('drop', function(event) {
                    event.preventDefault();
                    console.log('Drop event:', event);
                    console.log('Drop target before adding filled:', event.target);
            
                    // Check if the target element is correct
                    if (event.target.classList.contains('blank1') || event.target.classList.contains('blank2')) {
                        event.target.classList.add('filled'); // Add a filled class to mark it as filled
                        console.log('Drop target after adding filled:', event.target.classList);
                    } else {
                        console.log('Drop target is not a blank element:', event.target);
                    }
            
                    // Update the variables based on the dropped word
                    if (event.target.textContent === 'sorrow') {
                        sorrowDropped = true;
                    } else if (event.target.textContent === 'happy') {
                        happyDropped = true;
                    }

               // Resume the audio context if it is not running
                    if (getAudioContext().state !== 'running') {
                        getAudioContext().resume().then(() => {
                            typewriterSound.play(); // Play the typewriter sound
                        });
                    } else {
                        typewriterSound.play(); // Play the typewriter sound
                    }
                });

                wordElement.setAttribute('draggable', true); // make the word elements draggable
                wordElement.addEventListener('dragstart', drag); // add event listener for the 'dragstart' event
               
                if (word === 'happy' || word === 'sorrow') {
                    wordElement.setAttribute('draggable', 'true');
                } else {
                    wordElement.setAttribute('draggable', 'false');
                }
               
                if (word === 'blank1' || word === 'blank2') {
                    wordElement.style.padding = '20px 20px'; // Increased padding for larger droppable area
                    wordElement.textContent = '';  // Ensure the blank is empty
                    wordElement.addEventListener('dragover', allowDrop); 
                    wordElement.addEventListener('drop', drop); 
                        // Add specific classes for blank1 and blank2
                        if (word === 'blank1') {
                            wordElement.classList.add('blank1');
                        } else if (word === 'blank2') {
                            wordElement.classList.add('blank2');
                        }
                    }
    
                wordsContainer.appendChild(wordElement); // Append the word element to the container
                wordElement.style.position = 'absolute';
                wordElement.style.top = `${Math.random() * 20 + 10}%`; // Random vertical position
                wordElement.style.left = `${(index / myString.length) * 35}%`;
                wordElement.style.marginLeft = `34%`; // Relative margin-left
                wordElement.style.marginTop = `15%`;
            });
        }
    }  


// Function to check if both words are dropped
function checkCompletion(targetElement) {
    console.log('Checking completion for target element:', targetElement);
    // Check if both words are dropped
    if (sorrowDropped && happyDropped) {
        // Check if the word was dropped in the blank element with class blank2
        const blank2Element = document.querySelector('.blank2');
        console.log('Blank2 element:', blank2Element);
        
        if (blank2Element) {
            console.log('Checking if targetElement is within blank2Element');
            console.log('targetElement:', targetElement);
            console.log('blank2Element:', blank2Element);
            console.log('blank2Element children:', blank2Element.children);

        if (!blank2Element.contains(targetElement)) {
            console.log('targetElement is not in the blank element with class blank2');
            // Append targetElement to blank2Element
            blank2Element.appendChild(targetElement);
            console.log('Appended targetElement to blank2Element');
        }

        if (blank2Element.contains(targetElement)) {
            console.log('Both words dropped and one in blank2');
            if (targetElement.textContent.trim() === 'sorrow') {
                window.location.href = 'happyjumping_edited/happy.html';
            } else if (targetElement.textContent.trim() === 'happy') {
                window.location.href = 'fragmentShader_Sound/sorrow.html';
            }
        } 
        
    } else {
        console.log('Blank2 element not found in the DOM');
        // Fallback mechanism: handle the case where blank2 element is not found
        handleMissingBlank2Element(targetElement);
    }
}
}


// Fallback mechanism to handle missing blank2 element
function handleMissingBlank2Element(targetElement) {
    console.log('Handling missing blank2 element');
    // Implement your fallback logic here
    // For example, you could display an error message or take some other action
    alert('The blank2 element is missing. Please ensure it is added to the DOM.');
}

