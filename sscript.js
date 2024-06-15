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
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
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
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
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
    gameState = ["", "", "", "", "", "", "", "", ""];
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
