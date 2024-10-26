var song, mic, speed, volume;

function preload() {
  song = loadSound("data/bell.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  getAudioContext().suspend();  // Passes the firewall in browsers
}

function draw() {
  background(255, 255, 0);

  // Map mouseX to control the volume (moving right increases volume)
  let volume = map(mouseX, 0, width, 0.0, 1.0); //(var to watch, min_in, max_in, min_out, max_out)
  // Map mouseY to control the speed (moving down increases speed)
  let speed = map(mouseY, 0, height, 0.01, 2); // Adjust speed (var to watch, min_in, max_in, min_out, max_out)

  // Visual representation
  circleDiameter = map(volume, 0.0, 1.0, 50, 500);
  circle(mouseX, mouseY, circleDiameter);

  // Apply the volume and speed to the song
  song.amp(volume); // Set the volume based on mouseX
  song.rate(speed); // Set the speed based on mouseY
}

function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
    song.play();
    song.loop();
  }
}

function keyTyped() {
  if (key === " ") {
    song.stop();
  } else {
    song.play();
  }
}
