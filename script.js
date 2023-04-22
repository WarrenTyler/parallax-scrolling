// dom elements
const canvas = document.querySelector("#canvas");
const speedSlider = document.querySelector("#speedSlider");
const displaySpeed = document.querySelector("#displaySpeed");
const displayWorldX = document.querySelector("#displayWorldX");

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);

const worldStart = 0;
// worldEnd must be a multiple of image width (2400) and greater than 
// image width divided by slowest speed modifier (2400 / 0.2) or (2400 * 5)
const worldEnd = Math.pow(2400, 3);
let worldX = 0;

let scrollSpeed = Number(speedSlider.value);
displaySpeed.textContent = scrollSpeed;

const backgroundLayer1 = new Image();
backgroundLayer1.src = "./img/layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "./img/layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "./img/layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "./img/layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "./img/layer-5.png";

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.image = image;
    this.speedModifier = speedModifier;
  }
  update() {
    this.x = -Math.floor((worldX * this.speedModifier) % this.width);
    // console.log(this.x, worldX);
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.width + this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

const scrollingBackgrounds = [
  new Layer(backgroundLayer1, 0.2),
  new Layer(backgroundLayer2, 0.4),
  new Layer(backgroundLayer3, 0.6),
  new Layer(backgroundLayer4, 0.8),
  new Layer(backgroundLayer5, 1),
];

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  scrollingBackgrounds.forEach((background) => {
    background.update();
    background.draw();
  });

  worldX += scrollSpeed;
  if (worldX < 0) worldX = worldEnd;
  if (worldX > worldEnd) worldX = 0;
  displayWorldX.textContent = worldX;

  requestAnimationFrame(animate);
}

// Start animation loop
animate();

// Event Listeners
speedSlider.addEventListener("change", (e) => {
  const newSpeed = Number(e.target.value);
  scrollSpeed = newSpeed;
  displaySpeed.textContent = newSpeed;
});
