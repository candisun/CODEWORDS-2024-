const words = [] // store word objects

function setup() {
    createCanvas(windowWidth,windowHeight)
    const str = 'sorrow happy ';
    const repeatedStr = str.repeat(52);
    console.log(repeatedStr);
    const wordsStr = repeatedStr.split(' ') //split into array
    textSize(48)
    
    // track initial word position
    let x = 20
    let y = 60
    fill(255)
    
    // loop - iterate over each word
    for (let i = 0; i < wordsStr.length; i++) {
        const wordStr = wordsStr[i] // get current word
        const wordStrWidth = textWidth(wordStr) // get current word width
        const word = new Word(wordStr, x, y, i)  //create new word
        words.push(word)  //add new word to array
        x = x + wordStrWidth + textWidth(' ') // update x by word width + space 
        // look ahead next word - will it fit in the space? if not, line break
        
        const nextWordStrWidth = textWidth(wordsStr[i+1]) || 0
        if (x > width - nextWordStrWidth) {   //move to next line if x doesn't fit
            y += 40 // line height, sort of
            x = 20 // reset x position
        }
    }
}

function draw() {
    background(0,0,255)
    for (let i = 0; i < words.length; i++) {
        const word = words[i]   // retrieve word object
        word.update()  
        word.display()
    }
}

function keyPressed() {
    if (key === 'r') {
        for (let word of words) word.spread()
    } else if (key === ' ') {
        for (let word of words) word.reset()
    }
}

class Word {
    constructor(word, x, y, idx) {  //runs when new word created
        this.word = word   //stores word
        // current position on canvas
        this.x = x
        this.y = y
        // target position = current position canvas
        this.tx = this.x
        this.ty = this.y
        // stores original position for set 
        this.origx = this.x
        this.origy = this.y
        //Stores the index
        this.idx = idx 
        this.fcolor = color(255)
    }
    reset() {
        this.tx = this.origx
        this.ty = this.origy
    }
    spread() {
        this.tx = random(width)
        this.ty = random(height)
    }
    update() {
        // move towards the target by 10% each time
        this.x = lerp(this.x, this.tx, 0.1) 
        this.y = lerp(this.y, this.ty, 0.1)
    }
    display() {
        fill(this.fcolor)
        noStroke()
        text(this.word, this.x, this.y)
    }
}

//
