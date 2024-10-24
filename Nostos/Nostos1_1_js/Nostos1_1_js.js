let draggedWord = null; // store what's being dragged

function setup() {
    noCanvas();
    // dragover event
    let blanks = document.querySelectorAll('.blank'); // selects HTML elements with class blank & stores in 'blanks'

    blanks.forEach(blank => { // loops through each element in blanks array
        blank.addEventListener('dragover', allowDrop); // add event listener to each blank for 'dragover' event
        blank.addEventListener('drop', drop); // add event listener for the 'drop' event
    });
    // drag word
    let words = document.querySelectorAll('.word'); // selects HTML elements with class word & stores in 'words' variable
    console.log(words); // Log the words to see if they are being selected correctly
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
