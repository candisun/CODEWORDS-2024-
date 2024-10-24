let draggedWord = null; // store what's being dragged
let myString = ["no", "greater", "blank1", "than", "to", "be", "mindful", "of", "blank2", "time", "in", "misery"]; // list of words with blanks
//
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
    let words = document.querySelectorAll('.word'); 
    words.forEach(word => { // loops through each element in words array
        word.setAttribute('draggable', true); // make  word elements draggable
        word.addEventListener('dragstart', drag); // add event listener for the 'dragstart' event
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
}

// when word is being dropped
function drop(event) { 
    event.preventDefault();  // prevents the default behaviour of the event
    if (event.target.classList.contains('blank')) { 
        event.target.textContent = draggedWord.textContent; // set the blank's text to the dragged word's text
        draggedWord.style.visibility = 'hidden'; // hide the dragged word
    }
    //    let draggedWord = select('.word[draggable="true"]');
    //     draggedWord.hide();    //draggedWord.style.display = 'none'; 
    //     draggedWord = null; // reset draggedWord
    // }
}

// function to display words in order with random vertical positions
function displayWordsInOrder() {
    let wordsContainer = document.getElementById('random-poem');
    if (wordsContainer) {
        wordsContainer.innerHTML = ''; // clear existing content
        myString.map((word, index) => {   // use map function to create word elements
           let wordElement = document.createElement('div');
           wordElement.className = 'word';
           wordElement.textContent = word;
           wordElement.setAttribute('draggable', true); // make the word elements draggable
           wordElement.addEventListener('dragstart', drag); // add event listener for the 'dragstart' event
           wordsContainer.appendChild(wordElement);

            wordElement.style.position = 'absolute';
            wordElement.style.top = `${Math.random() * 40 + 10}%`;
            wordElement.style.left = `${(index / myString.length) *35}%`;
            wordElement.style.marginLeft = `430px`;
            wordElement.style.marginTop = `110px`;

            if (word === 'blank1' || word === 'blank2') {
                wordElement.classList.add('blank');
                wordElement.textContent = '';  // Ensure the blank is empty
            }

            wordsContainer.appendChild(wordElement);
        });
    }
}

setup();


//used draggable(); 
//changed varibales in the wordElement.style
//added drag and drop eventlistener into randomise function  
//removed html blanks