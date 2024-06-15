const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const restartButton = document.getElementById('restart');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(81).fill("");

// Update the winning conditions for a 9x9 grid
const winningConditions = [
    // Horizontal winning conditions
    ...Array.from({ length: 9 }, (_, row) => Array.from({ length: 9 }, (_, col) => row * 9 + col)),

    // Vertical winning conditions
    ...Array.from({ length: 9 }, (_, col) => Array.from({ length: 9 }, (_, row) => row * 9 + col)),

    // Diagonal (left to right) winning conditions
    ...Array.from({ length: 9 }, (_, start) => Array.from({ length: 9 - start }, (_, idx) => (start + idx) * 10)),
    ...Array.from({ length: 8 }, (_, start) => Array.from({ length: 9 - start }, (_, idx) => (1 + start + idx) * 8)),

    // Diagonal (right to left) winning conditions
    ...Array.from({ length: 9 }, (_, start) => Array.from({ length: 9 - start }, (_, idx) => (start + idx) * 8 + 8)),
    ...Array.from({ length: 8 }, (_, start) => Array.from({ length: 9 - start }, (_, idx) => (1 + start + idx) * 10 - 2))
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `It's ${currentPlayer}'s turn`;
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const values = winCondition.map(index => gameState[index]);
        if (values.every(value => value !== "" && value === values[0])) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        message.textContent = 'Game ended in a draw!';
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = Array(81).fill("");
    cells.forEach(cell => cell.textContent = "");
    message.textContent = `It's ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);

message.textContent = `It's ${currentPlayer}'s turn`;
