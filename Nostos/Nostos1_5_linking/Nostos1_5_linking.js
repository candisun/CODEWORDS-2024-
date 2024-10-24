// Declare necessary variables
let sorrowDropped = false;
let happyDropped = false;
let draggedWord = null; // store what's being dragged
let myString = ["no", "greater", "blank1", "than", "to", "be", "mindful", "of", "blank2", "time", "in", "misery"]; // list of words with blanks


function setup() {
    noCanvas();
    // dragover event
    document.addEventListener('DOMContentLoaded', (event) => {
        let blanks = document.querySelectorAll('.blank'); 
        blanks.forEach(blank => { 
            blank.addEventListener('dragover', allowDrop); 
            blank.addEventListener('drop', drop); //drop
        });
    });
    // drag word
    let words = document.querySelectorAll('.word1, .word2'); 
    words.forEach(word => { // loops through each element in words array
        if (word.textContent === "sorrow" || word.textContent === "happy") {
            word.setAttribute('draggable', true);   // make word elements draggable
            word.addEventListener('dragstart', drag); 
            // if (word.textContent === "sorrow"){
            // wordElement.classList.add('word-sorrow','sorrow');  // add event listener for the 'dragstart' event
            // }
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
        //draggedWord.removeAttribute('draggable'); // disable further dragging
    }
    draggedWord = null; // reset the draggedWord variable
    newDrop(event); // call newDrop after drop event is handled
} 

function newDrop(event) {
    let data = event.dataTransfer.getData("text");
    console.log('newDrop called with data:', data);
    
    if (data === 'sorrow' && event.target.classList.contains('blank')) {
        sorrowDropped = true;
        console.log('Sorrow dropped');
        event.target.textContent = 'sorrow'; // Set the text content to 'sorrow'
        //event.target.style.textDecoration = 'underline'; // Add underline style
        event.target.classList.remove('blank'); // Remove the blank class to hide the blank style
    } else if (data === 'happy' && event.target.classList.contains('blank')) {
        happyDropped = true;
        console.log('Happy dropped');
        event.target.textContent = 'happy'; // Set the text content to 'happy'
        //event.target.style.textDecoration = 'underline'; // Add underline style
        event.target.classList.remove('blank'); // Remove the blank class to hide the blank style
    }
    checkCompletion();
    }
    
    // function to check if both words are dropped
    function checkCompletion() {
        console.log('Checking drop completion');
        console.log('sorrowDropped:', sorrowDropped, 'happyDropped:', happyDropped);
        if (sorrowDropped && happyDropped) {
            console.log('Both words dropped in blanks');
            window.location.href = 'fragmentshader.html'; // redirect to fragmentshader.html
        }
    }

// function to display words in order with random vertical positions
function displayWordsInOrder() {
    let wordsContainer = document.getElementById('random-poem');
    
    if (wordsContainer) {
        wordsContainer.innerHTML = ''; // clear existing content
        myString.forEach((word, index) => {   // use forEach function to create word elements
           let wordElement = document.createElement('div');
           wordElement.className = 'word1','word2','sorrow','happy'; 
           wordElement.textContent = word;
         
           if (word === "sorrow") {
                wordElement.classList.add('word-sorrow','sorrow'); // add class for 'sorrow'
            
            } else if (word === "happy") {
                wordElement.classList.add('word-happy','happy'); // add class for 'happy'
            }

           wordElement.setAttribute('draggable', true); // make the word elements draggable
           wordElement.addEventListener('dragstart', drag); // add event listener for the 'dragstart' event
           
           
           if (word === 'happy' || word === 'sorrow') {
            wordElement.setAttribute('draggable', 'true');
            } 
            else {
                wordElement.setAttribute('draggable', 'false');
            }
           
           if (word === 'blank1' || word === 'blank2') {
                wordElement.classList.add('blank');
                wordElement.style.padding = '20px 20px'; // Increased padding for larger droppable area
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

