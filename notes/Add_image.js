var pic;


function preload(){
  pic = loadImage("data/face.jpeg"); //load image
}

function setup() {
createCanvas(windowWidth,windowHeight);
background("blue")
imageMode(CENTER,CENTER);
let div =createDiv('<h3>Hello World<h3>');
div.position(width/2,height/2);
  
}


function draw() {
  //image(pic,0,0,320,231) //paint image
  //image(pic,width/2,height/2,height/pic.height*pic.width) //paint image
   image(pic,mouseX,mouseY,) //paint image
}  

