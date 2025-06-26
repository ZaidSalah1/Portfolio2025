const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const retryButton = document.getElementById("retryButton");
const box = 20;
let score = 0;
let snake, food, direction, gameInterval;

// Draw the preview screen with snake and food
function drawPreview() {
  ctx.fillStyle = "#21272F";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw border
  ctx.strokeStyle = "#898a89";
  ctx.lineWidth = 5;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Draw preview snake (3 segments)
  const previewSnake = [
    { x: 8 * box, y: 10 * box },
    { x: 9 * box, y: 10 * box },
    { x: 10 * box, y: 10 * box }
  ];

  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#00B095";
  previewSnake.forEach((part) => {
    ctx.fillRect(part.x, part.y, box, box);
    ctx.strokeRect(part.x, part.y, box, box);
  });

  // Draw preview food
  ctx.fillStyle = "#00B095";
  ctx.fillRect(12 * box, 10 * box, box, box);

  // Draw "Press Start" text
  ctx.fillStyle = "#20b082";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Press START to Play", canvas.width / 2, canvas.height / 2 - 30);
}

function startGame() {
  score = 0;
  document.getElementById("score").innerText = "Score: " + score;
  snake = [{ x: 10 * box, y: 10 * box }];
  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box,
  };
  direction = "RIGHT";
  startButton.classList.add("hidden");
  retryButton.classList.add("hidden");
  document.addEventListener("keydown", changeDirection);
  gameInterval = setInterval(drawGame, 100);
}

function changeDirection(event) {
  // Prevent default behavior for arrow keys to stop page scrolling
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
    event.preventDefault();
  }

  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function drawGame() {
  ctx.fillStyle = "#21272F";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#00B095";
  snake.forEach((part) => {
    ctx.fillRect(part.x, part.y, box, box);
    ctx.strokeRect(part.x, part.y, box, box);
  });

  ctx.fillStyle = "#00B095";
  ctx.fillRect(food.x, food.y, box, box);

  let newHead = { x: snake[0].x, y: snake[0].y };
  if (direction === "UP") newHead.y -= box;
  if (direction === "DOWN") newHead.y += box;
  if (direction === "LEFT") newHead.x -= box;
  if (direction === "RIGHT") newHead.x += box;

  // Wrap around logic
  if (newHead.x < 0) newHead.x = canvas.width - box;
  else if (newHead.x >= canvas.width) newHead.x = 0;
  if (newHead.y < 0) newHead.y = canvas.height - box;
  else if (newHead.y >= canvas.height) newHead.y = 0;

  if (newHead.x === food.x && newHead.y === food.y) {
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };
    score += 10;
    document.getElementById("score").innerText = "Score: " + score;
  } else {
    snake.pop();
  }

  if (
    snake.some((part) => part.x === newHead.x && part.y === newHead.y)
  ) {
    clearInterval(gameInterval);
    alert("Game Over! Final Score: " + score);
    retryButton.classList.remove("hidden");
    return;
  }

  snake.unshift(newHead);
}

// Initialize the preview screen when the page loads
window.onload = function () {
  drawPreview();
};

startButton.addEventListener("click", startGame);
retryButton.addEventListener("click", function () {
  drawPreview();
  startGame();
});