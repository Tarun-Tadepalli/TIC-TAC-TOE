const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const restartButton = document.getElementById('restart');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34, 35],
    [0, 6, 12, 18, 24, 30],
    [1, 7, 13, 19, 25, 31],
    [2, 8, 14, 20, 26, 32],
    [3, 9, 15, 21, 27, 33],
    [4, 10, 16, 22, 28, 34],
    [5, 11, 17, 23, 29, 35],
    [5, 10, 15, 20, 25, 30],
    [1, 8, 15, 22, 29, 36],
    [4, 9, 14, 19, 24, 29],
    [2, 9, 16, 23, 30, 37],
    [3, 8, 13, 18, 23, 28],
    [6, 13, 20, 27, 34, 41],
    [11, 16, 21, 26, 31, 36],
    [12, 19, 26, 33, 40, 47],
    [17, 22, 27, 32, 37, 42],
    [18, 25, 32, 39, 46, 53],
    [23, 28, 33, 38, 43, 48]
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

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    message.textContent = `It's ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);

message.textContent = `It's ${currentPlayer}'s turn`;
