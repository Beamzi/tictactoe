const  gameBoard = () => {
    let board = Array(9).fill('')
    const getBoard = () => board
    const updateCell = (input, symbol) => {
        if (input < 9 && board[input] === '') {
            board[input] = symbol;
            return true
        };
        return false
    };
    const resetBoard = () => {
        board.fill('');
    };
    return { getBoard, updateCell, resetBoard }
};

const playGame = () => {
    const board = gameBoard();
    const playerX = 'X';
    const playerO = 'O';
    let currentPlayer = playerX;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerX ? playerO : playerX
    };
    const makeMove = (input) => {
        if (board.updateCell(input, currentPlayer)) {
            checkWin(board.getBoard(), winCons)
            switchPlayer();
            DOMUpdate();
            setTimeout(() => {
                computerMove();
            }, 100)
        };
    };

    const computerMove = () => {
        const boardArr = board.getBoard();
        let remainingCells = [];
        for (let i = 0; i < boardArr.length; i++) {
            if (boardArr[i] === '') {
                remainingCells.push(i);
            };
        };
        let randomIndex = Math.floor(Math.random() * remainingCells.length)
        let compInput = remainingCells[randomIndex]
        if (board.updateCell(compInput, currentPlayer)) {
            checkWin(board.getBoard(), winCons)
            switchPlayer();
            DOMUpdate();
        };
    };

    const resetGame = () => {
        board.resetBoard();
        DOMUpdate();
    };
    const DOMUpdate = () => {
        const boardArr = board.getBoard();
        const cells = document.querySelectorAll('.cell')
        cells.forEach((element, index) => {
            element.textContent = boardArr[index];
        });
    };

    const winCons = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWin = (board, winCons) => {
        for (let i = 0; i < winCons.length; i++) {
            let [a, b, c] = winCons[i]
            if (board[a] !== '' && board[a] == board[b] && board[a] == board[c]) {
                if (board[a] === 'X') {
                    DOMCreate.winner();
                }
                else if (board[a] === 'O') {
                    DOMCreate.loser();
                };
            };
        };
    };


    return { makeMove, resetGame, getBoard: board.getBoard }
};

const DOMCreate = (() => {
    const play = playGame();
    const boardContainer = document.querySelector('.board')
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        boardContainer.append(cell)
        cell.addEventListener('click', (e) => {
            play.makeMove(i);
        });
    };


    const resultContainer = document.querySelector('.displayResult')
    const span = document.createElement('span')
    resultContainer.appendChild(span)
    const winner = () => span.textContent = 'Winner'
    const loser = () => span.textContent = 'Loser'
    const draw = () => span.textContent = 'Draw'

    const resetBtn = document.querySelector('button')
    resetBtn.addEventListener('click', () => {
        span.textContent = '';
        play.resetGame();
    });

    return { winner, loser, draw }

})();
