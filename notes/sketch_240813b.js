function setup() {
  createCanvas(windowWidth,windowHeight);
  background(255,255,255);
     frameRate(10);
}

function draw() {
   //background(mouseX,mouseY,255,-1);  //(r, g, b, a);
   
  
   //hair
   mouseX_255= map(mouseX, 0,  width, 0, 255)
   fill(mouseX_255+20,mouseX_255+205,mouseX_255+222);
   circle(mouseX,mouseY,80);
    noStroke();
   
    //face
    fill(255,219,217)
    stroke(255, 255, 255);
    strokeWeight(2);
    
    //neck
    rect(0.5*width-25,0.5*height+40, 45, 75, 20);    
    ellipse(0.5*width,0.5*height,150,170);
   
    //eyes
    fill(255,253,161)
    circle(0.5*width - 40, 0.54*height, 20); 
    circle(0.5*width + 40, 0.54*height, 20);
    
    //mouth
    stroke(255,255,255);
    strokeWeight(2);
    fill(255, 51, 112);
    circle(0.5*width,height/1.72,15);
   
    //fringe
    fill(134, 250, 252)
    stroke(255, 255, 255);
    strokeWeight(2);
    push();
      translate(0.5*width-50,0.5*height-50);
      rotate(-QUARTER_PI);
      ellipse(0,0,150,100);
    pop();
    
    push();
      translate(0.5*width+50,0.5*height-50);
      rotate(QUARTER_PI);
      ellipse(0, 0, 150, 100);
    pop();
   
   //lashes
    push();
      translate(0.5*width-55,0.5*height+15);
       strokeWeight(2);
      line(0, 0, 8, 8);
    pop();
    push();
      translate(0.5*width+48,0.5*height+15);
      strokeWeight(2);
      line(0,8,8,0);
    pop();
    //nose  
    push();
      translate(0.5*width,0.5*height+40);
      strokeWeight(3);
      line(0,0,0,0);
    pop();
    
    //text 
    fill(255, 51, 112);
     text("hi, i'm candice, please give me a nice hairstyle!",0.5*width-120,height/1.67-250);
    
    
    
   //circle(width/2,height/2,300);
   //ellipse(0.75*width,400,100,300);
   //strokeWeight(10);
   //stroke(0)
   //line(0,0,width,height);
   //line(pmouseX,pmouseY,mouseX,mouseY);
   //fill(mouseX-300,mouseX,mouseX-120);
  
}
