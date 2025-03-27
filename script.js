const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let dx = 0;
let dy = 0;
let gameInterval;
let gameStarted = false;

function generateFood() {
    food.x = Math.floor(Math.random() * (canvasSize / box)) * box;
    food.y = Math.floor(Math.random() * (canvasSize / box)) * box;
}

generateFood();

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (!gameStarted) {
        gameStarted = true;
        gameInterval = setInterval(gameLoop, 200);
    }
    
    const key = event.key;
    if (key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -box;
    } else if (key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = box;
    } else if (key === "ArrowLeft" && dx === 0) {
        dx = -box;
        dy = 0;
    } else if (key === "ArrowRight" && dx === 0) {
        dx = box;
        dy = 0;
    }
}

function update() {
    if (!gameStarted) return;
    
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        clearInterval(gameInterval);
        alert("Ah que pena, você perdeu :(");
        return;
    }
    
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        generateFood();
    } else {
        snake.pop();
    }
}

function drawGrid() {
    ctx.strokeStyle = "rgba(255, 182, 193, 0.3)"; // Rosa claro com baixa opacidade
    for (let x = 0; x < canvasSize; x += box) {
        for (let y = 0; y < canvasSize; y += box) {
            ctx.strokeRect(x, y, box, box);
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = "#5bdb00";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, box, box));
    ctx.fillStyle = "#f70f58";
    ctx.fillRect(food.x, food.y, box, box);
    drawGrid();
}

function gameLoop() {
    update();
    draw();
}

draw();