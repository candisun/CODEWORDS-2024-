let draggedWord = null; // store what's being dragged

function setup() {
    noCanvas();

    // drag word
    let words = selectAll('.word'); // selects HTML elements with class word & stores in 'words' variable
    words.forEach(word => { // loops through each element in words array
        word.setAttribute('draggable', true); // make the word elements draggable
        word.addEventListener('dragstart', drag); // add event listener for the 'dragstart' event
    });
}

// when word is dragged over the blank 
function allowDrop(event) {  
    event.preventDefault(); // override 'dragover' event, allow the drop to happen
}

// when a word starts being dragged
function drag(event) {
    draggedWord = event.target; // set 'draggedWord' to the element that is being dragged
}

// when word is dropped on blank 
function drop(event) { 
    event.preventDefault(); // prevents the default behaviour of the event
    if (event.target.classList.contains('blank')) { // check if the word dropped on the blank
        event.target.textContent = draggedWord.textContent; // sets the text of the blank to the text of the dragged word
        draggedWord.style.display = 'none'; // hides 'dragged word' 
    }
}
