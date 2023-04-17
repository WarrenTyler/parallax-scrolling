const canvas = document.querySelector("#canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);

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

// scrolling variables
let scrollSpeed = 10;

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = scrollSpeed * speedModifier;
  }
  update() {
    this.speed = scrollSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
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

  requestAnimationFrame(animate);
}

animate();
