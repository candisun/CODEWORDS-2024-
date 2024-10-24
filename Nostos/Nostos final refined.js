// Declare necessary variables
let sorrowDropped = false;
let happyDropped = false;
let draggedWord = null; 
let myString = ["no", "greater", "blank1", "than", "to", "be", "mindful", "of", "blank2", "time", "in", "misery"]; 
let blank1Word = '';
let blank2Word = '';
let typewriterSound;

function preload() {
    typewriterSound = loadSound('data/typewriter-click.mp3');
}

function setup() {
    noCanvas();
    typewriterSound.setVolume(0.8);

    // Resume AudioContext on mouse movement
    document.addEventListener('mousemove', () => {
        if (getAudioContext().state !== 'running') {
            getAudioContext().resume();
        }
    });

    document.addEventListener('DOMContentLoaded', (event) => {
        let blanks = document.querySelectorAll('.blank1, .blank2');
        blanks.forEach(blank => {
            blank.addEventListener('dragover', allowDrop);
            blank.addEventListener('drop', drop);
        });
    });

    let words = document.querySelectorAll('.word1, .word2');
    words.forEach(word => {
        if (word.textContent === "sorrow" || word.textContent === "happy") {
            word.setAttribute('draggable', true);
            word.addEventListener('dragstart', drag);
        }
    });

    displayWordsInOrder();
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    draggedWord = event.target;
    event.dataTransfer.setData("text", event.target.textContent);
}


function drop(event) {
    event.preventDefault();
    if (event.target.classList.contains('blank1') || event.target.classList.contains('blank2')) {
        event.target.textContent = draggedWord.textContent;
        if (draggedWord.textContent === "sorrow") {
            event.target.classList.add('filled-sorrow');
        } else if (draggedWord.textContent === "happy") {
            event.target.classList.add('filled-happy');
        }
        draggedWord.style.visibility = 'hidden';
        updateDropStatus(event.target.classList, draggedWord.textContent);
        draggedWord = null;

        // Play typewriter sound
        typewriterSound.play();
    } else {
        console.error('draggedWord is not defined');
    }
    newDrop(event);
}


function updateDropStatus(targetClassList, word) {
    if (targetClassList.contains('blank1')) {
        blank1Word = word;
    } else if (targetClassList.contains('blank2')) {
        blank2Word = word;
    }
}

function newDrop(event) {
    let data = event.dataTransfer.getData("text");
    console.log('newDrop called with data:', data);

    if (data === 'sorrow' && (event.target.classList.contains('blank1') || event.target.classList.contains('blank2'))) {
        sorrowDropped = true;
    } else if (data === 'happy' && (event.target.classList.contains('blank1') || event.target.classList.contains('blank2'))) {
        happyDropped = true;
    }
    console.log('Drop target before adding filled:', event.target.classList);
    event.target.classList.add('filled');
    console.log('Drop target after adding filled:', event.target.classList);
    checkCompletion();
}

function displayWordsInOrder() {
    let wordsContainer = document.getElementById('random-poem');

    if (wordsContainer) {
        wordsContainer.innerHTML = '';
        myString.forEach((word, index) => {
            let wordElement = document.createElement('div');
            wordElement.className = 'word';
            wordElement.textContent = word;

            if (word === "sorrow") {
                wordElement.classList.add('sorrow');
            } else if (word === "happy") {
                wordElement.classList.add('happy');
            }
            wordElement.setAttribute('draggable', word === 'happy' || word === 'sorrow');
            wordElement.addEventListener('dragstart', drag);

            if (word === 'blank1' || word === 'blank2') {
                wordElement.classList.add('blank', word);
                wordElement.style.padding = '20px 20px';
                wordElement.textContent = '______';  // Placeholder text for blank
                wordElement.classList.add('blue-placeholder');  // Add the CSS class
                wordElement.addEventListener('dragover', allowDrop);
                wordElement.addEventListener('drop', drop);
            }

            wordsContainer.appendChild(wordElement);
            wordElement.style.position = 'absolute';
            wordElement.style.top = `${Math.random() * 20 + 10}%`;
            wordElement.style.left = `${(index / myString.length) * 35}%`;
            wordElement.style.marginLeft = `34%`;
            wordElement.style.marginTop = `15%`;
        });
    }
}

function checkCompletion() {
    console.log('Checking completion');
    if (sorrowDropped && happyDropped) {
        if (blank1Word === 'sorrow' && blank2Word === 'happy') {
            setTimeout(() => {
                window.location.href = 'fragmentShader_Sound/sorrow.html';
            }, 100); // Adjust delay as needed
        } else if (blank1Word === 'happy' && blank2Word === 'sorrow') {
            setTimeout(() => {
                window.location.href = 'happyjumping_edited/happy.html';
            }, 100); // Adjust delay as needed
        }
    }
}

