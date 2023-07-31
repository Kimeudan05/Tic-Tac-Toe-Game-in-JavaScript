// Constants for class names
const X_CLASS = 'X';
const CIRCLE_CLASS = 'circle';

// Selecting the cell elements and the board element
const cellEl = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');

// Selecting the winning message element and its text element
const WinningMessageEl = document.getElementById('winning-message');
const WinningMessageTextEl = document.querySelector('[dataWinningMessageText]');

// Variable to keep track of the current player's turn
let circleTurn;

// Selecting the restart button element
const RestartBtn = document.getElementById('restart-button');

// Array containing all possible winning combinations
const WinningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Call startGame after declaring the board element
startGame();

// Event listener for the restart button
RestartBtn.addEventListener('click', startGame);

// Function to start the game
function startGame() {
    circleTurn = false;
    // Reset the board by removing all classes from the cells
    cellEl.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    // Set the hover class for the board and hide the winning message
    setBoardHoverClass();
    WinningMessageEl.classList.remove('show');
}

// Function to handle cell click
function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    // Place the current player's mark on the clicked cell
    placeMark(cell, currentClass);

    // Check for a win or draw
    if (checkWin(currentClass)) {
        endGame(false); // Player wins
    } else if (isDraw()) {
        endGame(true); // Draw
    } else {
        swapTurns(); // Switch to the other player's turn
        setBoardHoverClass(); // Update the hover class for the board
    }
}

// Function to end the game
const endGame = (draw) => {
    if (draw) {
        WinningMessageTextEl.innerText = "Draw"; // Display Draw message
    } else {
        WinningMessageTextEl.innerText = `${circleTurn ? "O's" : "X's"} Wins!`; // Display winning player message
    }
    WinningMessageEl.classList.add('show'); // Show the winning message
};

// Function to check if the game is a draw
const isDraw = () => {
    return [...cellEl].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
};

// Function to place the current player's mark on the cell
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

// Function to switch turns between players
function swapTurns() {
    circleTurn = !circleTurn;
}

// Function to set the hover class for the board
function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

// Function to check if the current player has won
const checkWin = (currentClass) => {
    return WinningCombinations.some(combinations => {
        return combinations.every(index => {
            return cellEl[index].classList.contains(currentClass);
        });
    });
};
