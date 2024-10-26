var wigglyLetters=[];  //list
var size=70;
var speed=1;
var letter,rand,xposition,yposition;

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(8);
  //textSize(32);
  textSize(random(-28,28));  //stay same size
  textFont("Times");
}

function draw() {
  background(0);   //background redraws but not covering the letters
  fill(255);
  noStroke();
  for(var i=0; i<wigglyLetters.length;i++){
      wigglyLetters[i].giggle();
      wigglyLetters[i].display();
  }
}

function mousePressed() {
  rand = int(random(65,160))   //65 is A uppercase
  letter = char(rand);
  //text(letter,mouseX,mouseY); //click and write
  //new wiggle class: positiony,positiony,size,letter,speed
  wigglyLetters.push(new Wiggle (mouseX,mouseY,size,letter,speed)) ///(mouseX,mouseY,size,letter,speed))
}

class Wiggle {
  constructor(x,y,size,letter,speed){  //()inclues what variable is catching
    //initial position
    this.x=x;
    this.y=y;
    this.textSize=size;
    this.speed=speed;  
    this.letter=letter;
  }
  //updates position &/or size / of each elements
  giggle(){
      //this.x+=random(-4, 4);
      this.x+=random(movedX);
      this.y+=random(-4, 4);
      //this.textSize+=random(-28, 28);
  }
 
  //draws the elemnts to the screen
  display(){
    textSize(this.textSize);
    text(this.letter,this.x,this.y);
  }
}

function windowResize(){
  resizeCanvas(windowWidth,windowHeight);
}
