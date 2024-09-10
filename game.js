// Находим элемент canvas и получаем контекст для рисования
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Кнопки управления
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');

// Параметры квадрата
let squareSize = 50;
let squareX = Math.random() * (canvas.width - squareSize);
let squareY = Math.random() * (canvas.height - squareSize);

// Скорость движения квадрата
let speedX = 2;
let speedY = 2;

// Подсчет очков
let score = 0;

// Статус игры (игра запущена или на паузе)
let isPaused = false;
let isRunning = true; // флаг для перезапуска

// Основной игровой цикл
function gameLoop() {
    if (!isPaused && isRunning) {
        // Очищаем холст
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Рисуем квадрат
        ctx.fillStyle = 'red';
        ctx.fillRect(squareX, squareY, squareSize, squareSize);

        // Двигаем квадрат
        squareX += speedX;
        squareY += speedY;

        // Проверяем столкновение с краями
        if (squareX + squareSize > canvas.width || squareX < 0) {
            speedX = -speedX;
        }
        if (squareY + squareSize > canvas.height || squareY < 0) {
            speedY = -speedY;
        }

        // Отображаем очки
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(`Очки: ${score}`, 10, 30);
    }

    // Повторяем игровой цикл
    requestAnimationFrame(gameLoop);
}

// Обработка клика
canvas.addEventListener('click', function(event) {
    if (!isPaused && isRunning) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Проверяем, попал ли клик в квадрат
        if (mouseX >= squareX && mouseX <= squareX + squareSize && mouseY >= squareY && mouseY <= squareY + squareSize) {
            score++;
            // Увеличиваем скорость квадрата
            speedX *= 1.1;
            speedY *= 1.1;
            // Перемещаем квадрат на случайную позицию
            squareX = Math.random() * (canvas.width - squareSize);
            squareY = Math.random() * (canvas.height - squareSize);
        }
    }
});

// Функция паузы/возобновления игры
pauseBtn.addEventListener('click', function() {
    if (isRunning) {
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? 'Продолжить' : 'Пауза';
    }
});

// Функция рестарта игры
restartBtn.addEventListener('click', function() {
    // Сбрасываем все параметры игры
    score = 0;
    speedX = 2;
    speedY = 2;
    squareX = Math.random() * (canvas.width - squareSize);
    squareY = Math.random() * (canvas.height - squareSize);
    isPaused = false;
    isRunning = true;
    pauseBtn.textContent = 'Пауза';
});

// Запуск игры
gameLoop();
