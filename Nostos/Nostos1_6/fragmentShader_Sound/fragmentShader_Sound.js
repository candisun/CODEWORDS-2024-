 let backgroundSound;
 let ring;
let particles = [];
let particleSize;  
let particleRange = 1;  //3
let h = 30;  
let range = 100;   //200

let r = '#ff0000';
let g = '#00ff00';
let b = '#0000ff';

//VARIABLES in white
txt = 'Sorrow';
fontSize = 200; 
fontFamily = "Georgia, 'Times New Roman', Times, serif"; // Define the font family
mouseRadius = 120;  //120 / raidus that affect particles
spreadSpeed = 17;  //8  
returnSpeed = 80; 
gridDensity = 1.2; 

function preload(){
  backgroundSound= loadSound("data/heavy-water-space-ambience.mp3"); //heavy-water-space-ambience.mp3");
  ring= loadSound("data/ring.mp3");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  backgroundSound.setVolume(0.2);
  ring.setVolume(0.007);
  background(0);
  rectMode(CENTER);
  filter(BLUR, 20);

  //DRAW TEXT
  fill('red');
  textSize(fontSize);
  textFont(fontFamily);
  textAlign(CENTER, CENTER);
  text(txt, width/2, height/2);

  //GET TEXT AREA
  loadPixels();
  data = [];
  for (let y = 0; y < height; y += gridDensity) {
    for (let x = 0; x < width; x += gridDensity) {
      let temp = get(x, y); // p5 instance's get method
      // if it's text area, push it to data
      if (temp[0] == 255) {
        data.push({
          x: x,
          y: y
        });
      }
    }
  }
  //DRAW PARTICLES
  particles =  [];
  for(i=0; i<data.length; i++){
    particles.push(new Particle(data[i].x, data[i].y));
  }
   
    // Resume AudioContext on mouse movement
    document.addEventListener('mousemove', resumeAudioContext);
  }
  //   // Resume AudioContext on mouse movement
  //   document.addEventListener('mousemove', () => {
  //     if (getAudioContext().state !== 'running') {
  //         getAudioContext().resume();
  //     }
  // });
  
  function resumeAudioContext() {
    if (getAudioContext().state !== 'running') {
      getAudioContext().resume();
    }
  }

// Function to start background music
function startBackgroundMusic() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume().then(() => {
      backgroundSound.loop(); // Start looping background sound
    });
  } else {
    backgroundSound.loop(); // Start looping background sound
  }
}

  // Remove the event listener after the music starts
  document.removeEventListener('mousemove', startBackgroundMusic);


class Particle{
  constructor(x,y){
    this.x = x + 0; //add a slight distortion effect? it doesn’t change the value.
    this.y = y;
    // this.size = random(particleSize, particleSize * particleRange);
    // this.size = gridDensity + random(-8, 8);
    this.size = gridDensity * int(random(1,2)); 
    
    //track original position
    this.baseX = this.x; 
    this.baseY = this.y;
    this.density = random(-70, 70);   //particle movement -30,30
    
    //this.c = random(h, h + range);
    //this.c = random([r,g,b]);     //rainbow 
    this.c = random(200, 255);   //colour blue
    this.opa = random(0, 255);    //200 opacity
    this.breathe = random(10,30);   //breathing effect 12,14
  }
  
  display(){  //white
    push();
      noStroke();
      //fill(this.c);
      fill(0, 47, 167,this.opa); //0, 47, 167
      //SHAPES
      ellipse(this.x, this.y, this.size);  // Draw particle
      //circle(this.x, this.y, this.size);
      this.size += sin(frameCount / 30) / 25;  //40,10 big framecount slow change speed / big radius small circles 
    pop(); 
  }
  
  //calculate distance between particle position and mouse postion
  update(){
    let dx = dist(this.x, this.y, mouseX, mouseY);
    let forceDirectionX = (mouseX - this.x) / dx;
    let forceDirectionY = (mouseY - this.y) / dx;
    //stop, slow down effect, move fastest closer to mouse and then slow and stop
    let maxDistance = mouseRadius * 5; //2
    let force = (maxDistance - dx) / maxDistance; // closer particle to mouse, stronger force
    // force = map(maxDistance, 0, mouseRadius, 0, 1);
    let forceSpeed = spreadSpeed * force;   //speed of force applied to particle
    let directionX = forceDirectionX * force * this.density;   //force in the X direction, considering particle’s density.
    let directionY = forceDirectionY * force * this.density;
    
    //if they are close enough -> get pushed away effect
    if(dx < mouseRadius){
      //moves particle away from mouse in X and Y direction, add a vector to simulate push away effect
      this.x -= forceDirectionX * forceSpeed;   
      this.y -= forceDirectionY * forceSpeed;   
    } else{
      //make it return original position in x,y
      if(this.x != this.baseX){   //particle X not at base X
        // let dx = dist(this.x, this.y, this.baseX, this.baseY);
        let dx = (this.x - this.baseX);    // distance from current X to base X
        this.x -= dx/returnSpeed;     //moves back to original
      }
      if(this.y != this.baseY){
        let dx = (this.y - this.baseY);
        this.y -= dx/returnSpeed; 
      }
    }
  }
}


function draw() {
  blendMode(ADD);
  clear();
  background(0);
  
   textFont('Monospace'); 
   fill(255);
   textSize(10);
   text("click to start", windowWidth / 2, windowHeight / 6); 

  // DRAW PARTICLES TO TEXT AREA
  for(p of particles){   
    p.update();
    p.display();
  }
 
}

// Function to handle mouse movement and start the background sound loop
function mouseMoved() {
  // Start the background sound loop
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume().then(() => {
      console.log('AudioContext resumed');
      backgroundSound.loop();
    });
  } else {
    backgroundSound.loop();
  }
}

// // Add event listener for mouse movement
// document.addEventListener('mousemove', mouseMoved);

// Ringing sound when hovered
function mouseMoved() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

  for (let p of particles) {
    let dx = dist(p.x, p.y, mouseX, mouseY);
    if (dx < mouseRadius) {
      if (getAudioContext().state == 'running') {
        ring.play();
      }
      break;
    }
  }
}
