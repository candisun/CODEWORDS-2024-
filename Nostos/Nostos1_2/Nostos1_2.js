let draggedWord = null; // store what's being dragged
let myString = ["no", "greater", "than", "to be mindful", "of","time", "in", "misery"]; // list of words

function setup() {
    noCanvas();
    // dragover event
    let blanks = document.querySelectorAll('.blank'); 
    blanks.forEach(blank => { 
        blank.addEventListener('dragover', allowDrop); 
        blank.addEventListener('drop', drop); // add event listener for the 'drop' event
    });
    // drag word
    let words = document.querySelectorAll('.word'); 
    console.log(words); // log words to see if being selected correctly
    words.forEach(word => { // loops through each element in words array
        word.setAttribute('draggable', true); // make the word elements draggable
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

// when a word is being dropped
function drop(event) { 
    event.preventDefault(); // prevents the default behaviour of the event
    if (event.target.classList.contains('blank')) { 
        event.target.textContent = draggedWord.textContent; 
        draggedWord.style.display = 'none'; // hides 'dragged word' 
        draggedWord = null; // reset draggedWord
    }
}

// function to display words in order with random vertical positions
function displayWordsInOrder() {
    let wordsContainer = document.getElementById('random-words');
    if (wordsContainer) {
        wordsContainer.innerHTML = ''; // clear existing content
        myString.forEach((word, index) => {
            let wordElement = document.createElement('div');
            wordElement.className = 'word';
            wordElement.textContent = word;
            wordElement.style.position = 'absolute';
            wordElement.style.top = `${Math.random() * 80 + 10}%`;
            wordElement.style.left = `${(index / myString.length) * 100}%`;
            wordsContainer.appendChild(wordElement);
        });
    }
}

setup();
