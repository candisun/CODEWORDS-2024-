let ring, particles = [], particleSize;
const particleRange = 1, h = 30, range = 100, r = '#ff0000', g = '#00ff00', b = '#0000ff';
const txt = 'Sorrow', fontSize = 200, fontFamily = "Georgia, 'Times New Roman', Times, serif";
const mouseRadius = 120, spreadSpeed = 17, returnSpeed = 80, gridDensity = 1.2;
let data = [];

function preload() {
    ring = loadSound("data/ring.mp3"); // Only loading ring sound
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    ring.setVolume(0.007);
    rectMode(CENTER);
    filter(BLUR, 20);

    fill('red');
    textSize(fontSize);
    textFont(fontFamily);
    textAlign(CENTER, CENTER);
    text(txt, width / 2, height / 2);
    loadPixels();

    for (let y = 0; y < height; y += gridDensity) {
        for (let x = 0; x < width; x += gridDensity) {
            let temp = get(x, y);
            if (temp[0] == 255) {
                data.push({ x, y });
            }
        }
    }

    particles = data.map(d => new Particle(d.x, d.y));
    document.addEventListener('mousemove', resumeAudioContext);
}

function resumeAudioContext() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = gridDensity * int(random(1, 2));
        this.baseX = x;
        this.baseY = y;
        this.density = random(-70, 70);
        this.c = random(200, 255);
        this.opa = random(0, 255);
        this.breathe = random(10, 30);
    }

    display() {
        push();
        noStroke();
        fill(0, 47, 167, this.opa);
        ellipse(this.x, this.y, this.size);
        this.size += sin(frameCount / 30) / 25;
        pop();
    }

    update() {
        let dx = dist(this.x, this.y, mouseX, mouseY);
        let forceDirectionX = (mouseX - this.x) / dx;
        let forceDirectionY = (mouseY - this.y) / dx;
        let maxDistance = mouseRadius * 5;
        let force = (maxDistance - dx) / maxDistance;
        let forceSpeed = spreadSpeed * force;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (dx < mouseRadius) {
            this.x -= forceDirectionX * forceSpeed;
            this.y -= forceDirectionY * forceSpeed;
        } else {
            if (this.x != this.baseX) {
                this.x -= (this.x - this.baseX) / returnSpeed;
            }
            if (this.y != this.baseY) {
                this.y -= (this.y - this.baseY) / returnSpeed;
            }
        }
    }
}

function draw() {
    blendMode(ADD);
    clear();
    background(0);

    for (let p of particles) {
        p.update();
        p.display();
    }
}

function mouseMoved() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
    for (let p of particles) {
        if (dist(p.x, p.y, mouseX, mouseY) < mouseRadius) {
            if (getAudioContext().state == 'running') {
                ring.play();
            }
            break;
        }
    }
}
