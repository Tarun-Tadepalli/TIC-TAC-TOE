const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const restartButton = document.getElementById('restart');
const message = document.getElementById('message');
const selectionDiv = document.getElementById('selection');
const gameDiv = document.getElementById('game');

let currentPlayer = 'X';
let playerMark = 'X';
let aiMark = 'O';
let gameActive = true;
let gameState = Array(81).fill("");

const winningConditions = [
    // Rows
    ...Array(9).fill().map((_, i) => Array(9).fill().map((_, j) => i * 9 + j)),
    // Columns
    ...Array(9).fill().map((_, i) => Array(9).fill().map((_, j) => i + j * 9)),
    // Diagonals
    Array(9).fill().map((_, i) => i * 10),
    Array(9).fill().map((_, i) => (i + 1) * 8)
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === playerMark ? aiMark : playerMark;
    message.textContent = `It's ${currentPlayer}'s turn`;

    if (currentPlayer === aiMark) {
        aiMove();
    }
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const [a, b, c, d, e, f, g, h, j] = winCondition.map(index => gameState[index]);

        if ([a, b, c, d, e, f, g, h, j].includes('')) {
            continue;
        }
        if (a === b && b === c && c === d && d === e && e === f && f === g && g === h && h === j) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        message.textContent = 'Game ended in a draw!';
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive || currentPlayer !== playerMark) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function aiMove() {
    if (!gameActive) return;

    let availableCells = [];
    gameState.forEach((cell, index) => {
        if (cell === "") availableCells.push(index);
    });

    if (availableCells.length === 0) return;

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    const aiCell = cells[randomIndex];

    handleCellPlayed(aiCell, randomIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    gameState = Array(81).fill("");
    cells.forEach(cell => cell.textContent = "");
    message.textContent = `Select your mark (X or O) to start the game`;
    selectionDiv.classList.remove('hidden');
    gameDiv.classList.add('hidden');
}

function selectMark(mark) {
    playerMark = mark;
    aiMark = mark === 'X' ? 'O' : 'X';
    currentPlayer = playerMark;
    message.textContent = `It's ${currentPlayer}'s turn`;
    selectionDiv.classList.add('hidden');
    gameDiv.classList.remove('hidden');
}

document.getElementById('selectX').addEventListener('click', () => selectMark('X'));
document.getElementById('selectO').addEventListener('click', () => selectMark('O'));

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);

message.textContent = `Select your mark (X or O) to start the game`;
