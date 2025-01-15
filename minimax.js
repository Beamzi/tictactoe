


const gameBoard = () => {
    let board = Array(9).fill('');
    const getBoard = () => board;
    const updateCell = (input, symbol) => {
        if (input < 9 && board[input] === '') {
            board[input] = symbol;
            return true;
        };
        return false;
    };
    const resetBoard = () => {
        board.fill('');
    };
    return { getBoard, updateCell, resetBoard };
};

const playGame = () => {
    const board = gameBoard();
    const playerX = 'X';
    const playerO = 'O';
    let currentPlayer = playerX;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    };

    const makeMove = (input) => {
        if (board.updateCell(input, currentPlayer)) {
            updateDOM();
            const result = checkWin(board.getBoard(), winConditions);
            if (result === null) {
                switchPlayer();
                setTimeout(() => {
                    computerMove();
                }, 135);
            } else {
                handleGameEnd(result);
            };
        };
    };

    const minimax = (boardState, depth, isMaximizing) => {
        const result = checkWin(boardState, winConditions);
        if (result === playerO) return 10 - depth;
        if (result === playerX) return depth - 10;
        if (!boardState.includes('')) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < boardState.length; i++) {
                if (boardState[i] === '') {
                    boardState[i] = playerO;
                    let score = minimax(boardState, depth + 1, false);
                    boardState[i] = '';
                    bestScore = Math.max(score, bestScore);
                };
            };
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < boardState.length; i++) {
                if (boardState[i] === '') {
                    boardState[i] = playerX;
                    let score = minimax(boardState, depth + 1, true);
                    boardState[i] = '';
                    bestScore = Math.min(score, bestScore);
                };
            };
            return bestScore;
        };
    };

    const computerMove = () => {
        let bestScore = -Infinity;
        let move = null;
        const boardState = board.getBoard();
        for (let i = 0; i < boardState.length; i++) {
            if (boardState[i] === '') {
                boardState[i] = playerO;
                let score = minimax(boardState, 0, false);
                boardState[i] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                };
            };
        };

        if (move !== null && board.updateCell(move, playerO)) {
            updateDOM();
            const result = checkWin(board.getBoard(), winConditions);
            if (result === null) {
                switchPlayer();
            } else {
                handleGameEnd(result);
            };
        };
    };

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWin = (board, winConditions) => {
        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // Return the winner ('X' or 'O')
            }
        }
        return board.includes('') ? null : 'draw'; // Return 'draw' if no winner and board is full
    };

    const handleGameEnd = (result) => {
        updateDOM();
        if (result === 'draw') {
            DOMCreate.draw();
        } else if (result === playerX) {
            DOMCreate.winner();
        } else if (result === playerO) {
            DOMCreate.loser();
        };
    };

    const resetGame = () => {
        board.resetBoard();
        updateDOM();
    };

    const updateDOM = () => {
        const boardState = board.getBoard();
        const cells = document.querySelectorAll('.cell');
        cells.forEach((element, index) => {
            element.textContent = boardState[index];
        });
    };

    return { makeMove, resetGame, getBoard: board.getBoard, computerMove };
};

const DOMCreate = (() => {
    const play = playGame();
    const boardContainer = document.querySelector('.board');
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        boardContainer.appendChild(cell);
        cell.addEventListener('click', () => {
            if (play.getBoard()[i] === '') {
                play.makeMove(i);
            };
        });
    };

    const displayResult = document.querySelector('.displayResult');
    const span = document.createElement('span');
    displayResult.appendChild(span);

    const winner = () => span.textContent = 'Winner!';
    const loser = () => span.textContent = 'Loser!';
    const draw = () => span.textContent = 'Draw!';

    return { winner, loser, draw };
})();
