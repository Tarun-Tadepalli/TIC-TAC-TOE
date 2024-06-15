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
let gameState = Array(36).fill("");

const winningConditions = [
    // Rows
    [0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34, 35],
    // Columns
    [0, 6, 12, 18, 24, 30],
    [1, 7, 13, 19, 25, 31],
    [2, 8, 14, 20, 26, 32],
    [3, 9, 15, 21, 27, 33],
    [4, 10, 16, 22, 28, 34],
    [5, 11, 17, 23, 29, 35],
    // Diagonals
    [0, 7, 14, 21, 28, 35],
    [5, 10, 15, 20, 25, 30],
    [0, 1, 8, 15, 22, 29],
    [5, 4, 9, 14, 19, 24],
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
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        let d = gameState[winCondition[3]];
        let e = gameState[winCondition[4]];
        let f = gameState[winCondition[5]];

        if (a === '' || b === '' || c === '' || d === '' || e === '' || f === '') {
            continue;
        }
        if (a === b && b === c && c === d && d === e && e === f) {
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

    if (gameState[clickedCellIndex] !== "" || !gameActive || currentPlayer !== playerMark) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = playerMark;
    gameState = Array(36).fill("");
    cells.forEach(cell => cell.textContent = "");
    message.textContent = `It's ${currentPlayer}'s turn`;
}

function aiMove() {
    if (!gameActive) return;

    let emptyCells = gameState.map((cell, index) => cell === "" ? index : null).filter(cell => cell !== null);
    if (emptyCells.length === 0) return;

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[randomIndex] = aiMark;
    cells[randomIndex].textContent = aiMark;

    handleResultValidation();
}

function selectMark(mark) {
    playerMark = mark;
    aiMark = mark === 'X' ? 'O' : 'X';
    currentPlayer = playerMark;
    selectionDiv.classList.add('hidden');
    gameDiv.classList.remove('hidden');
    message.textContent = `It's ${currentPlayer}'s turn`;
}

document.getElementById('selectX').addEventListener('click', () => selectMark('X'));
document.getElementById('selectO').addEventListener('click', () => selectMark('O'));

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);

message.textContent = `Select your mark (X or O) to start the game`;
