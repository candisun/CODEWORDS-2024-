let draggedWord = null; // store what's being dragged
let myString = ["no", "greater", "than", "to", "be", "mindful", "of","time", "in", "misery"]; // list of words

function setup() {
    // dragover event
    let blanks = document.querySelectorAll('.blank'); 
    blanks.forEach(blank => { 
        blank.addEventListener('dragover', allowDrop); 
        blank.addEventListener('drop', drop); // add event listener for the 'drop' event
    });
    // drag word
    let words = document.querySelectorAll('.word'); 
    words.forEach(word => { // loops through each element in words array
       words.draggable();
  });
    displayWordsInOrder();  // display words in order with random vertical positions
}

// when word is dragged over blank 
function allowDrop(event) {  
    event.preventDefault();   // override 'dragover' event, allow drop to happen
}

// when word starts being dragged
function drag(event) {
    draggedWord = event.target; // set 'draggedWord' to the element that is being dragged
}

// when word is being dropped
function drop(event) { 
    event.preventDefault();  // prevents the default behaviour of the event
    if (event.target.classList.contains('blank')) { 
       let draggedWord = select('.word[draggable="true"]');
        //event.target.textContent = draggedWord.html(); // draggedWord.textContent; 
        draggedWord.hide();    //draggedWord.style.display = 'none'; 
        draggedWord = null; // reset draggedWord
    }
}

function mousePressed() {
  let words = selectAll('.word');
  words.forEach(word => {
    if (word.mouseIsPressed) {
      draggedWord = word;
    }
  });
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
            wordElement.style.position = 'absolute';
            wordElement.style.top = `${Math.random() * 40 + 10}%`;
            wordElement.style.left = `${(index / myString.length) *35}%`;
            //wordElement.style.marginBottom = `100px`;
            wordElement.style.marginLeft = `430px`;
            wordElement.style.marginTop = `110px`;
            wordsContainer.appendChild(wordElement);
        });
    }
}

setup();
