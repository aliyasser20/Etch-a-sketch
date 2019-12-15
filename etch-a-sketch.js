// Select canvas element //
const canvas = document.querySelector("#etch-a-sketch");

// Initialize canvas //
const ctx = canvas.getContext("2d");

// Set properties for canvas //
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = 15;
const CHANGE = 20;
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

// Grab width and height of canvas //
const { width, height } = canvas;

// Create random coordinates for starting point //
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

// Sketch the first dot //
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Draw function //
function draw(keyPressed) {
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(x, y);
  switch (keyPressed) {
    case "ArrowUp":
      y -= CHANGE;
      break;
    case "ArrowDown":
      y += CHANGE;
      break;
    case "ArrowRight":
      x += CHANGE;
      break;
    case "ArrowLeft":
      x -= CHANGE;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
  hue += 1;
}

// Handle key function //
function handleKey(event) {
  if (event.key.includes("Arrow")) {
    event.preventDefault();
    hue += 10;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  }
  draw(event.key);
}

// Handle shake button function //
function handleShakeButton() {
  ctx.clearRect(0, 0, width, height);
  x = Math.floor(Math.random() * width);
  y = Math.floor(Math.random() * height);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y);
  ctx.stroke();
  canvas.classList.add("shake");
  canvas.addEventListener(
    "animationend",
    () => {
      canvas.classList.remove("shake");
    },
    { once: true }
  );
}

// Key listener //
window.addEventListener("keydown", handleKey);

// Select shake button //
const shakeButton = document.querySelector(".shake");

// Shake button listner //
shakeButton.addEventListener("click", handleShakeButton);
