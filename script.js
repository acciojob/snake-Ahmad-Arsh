const gameContainer = document.querySelector('#gameContainer');
const scoreBoard = document.querySelector('#score');
let score = 0;
let food = null;
let snake = [{x: 0, y: 19}];
let direction = 'right';

function createGameBoard() {
    for (let i = 0; i < 40; i++) {
        for (let j = 0; j < 40; j++) {
            const pixel = document.createElement('div');
            pixel.id = `pixel${i}-${j}`;
            gameContainer.appendChild(pixel);
        }
    }
}

function placeFood() {
    const x = Math.floor(Math.random() * 40);
    const y = Math.floor(Math.random() * 40);
    food = {x, y};
    document.querySelector(`#pixel${x}-${y}`).classList.add('food');
}

function moveSnake() {
    let newHead;
    if (direction === 'right') {
        newHead = {x: snake[0].x + 1, y: snake[0].y};
    } else if (direction === 'left') {
        newHead = {x: snake[0].x - 1, y: snake[0].y};
    } else if (direction === 'up') {
        newHead = {x: snake[0].x, y: snake[0].y - 1};
    } else if (direction === 'down') {
        newHead = {x: snake[0].x, y: snake[0].y + 1};
    }

    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        scoreBoard.textContent = score;
        document.querySelector(`#pixel${food.x}-${food.y}`).classList.remove('food');
        placeFood();
    } else {
        const tail = snake.pop();
        document.querySelector(`#pixel${tail.x}-${tail.y}`).classList.remove('snakeBodyPixel');
    }

    snake.unshift(newHead);
    document.querySelector(`#pixel${newHead.x}-${newHead.y}`).classList.add('snakeBodyPixel');
}

createGameBoard();
placeFood();
setInterval(moveSnake, 100);