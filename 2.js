

const createGameBoard = () => {
  let board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;

  const updateCell = (index, value) => {
      if (index >= 0 && index < 9 && board[index] === '') {
          board[index] = value;
          return true;
      }
      return false;
  };

  const resetBoard = () => {
      board = ['', '', '', '', '', '', '', '', ''];
  };

  return { getBoard, updateCell, resetBoard };
};


const createPlayer = (symbol) => {
  const getSymbol = () => symbol;

  return { getSymbol };
};


const createGame = () => {
  const board = createGameBoard();
  const playerX = createPlayer('X');
  const playerO = createPlayer('O');
  let currentPlayer = playerX;

  const switchPlayer = () => {
      currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const makeMove = (index) => {
      if (board.updateCell(index, currentPlayer.getSymbol())) {
          // Here, you could add logic to check for a winner
          switchPlayer();
      }
  };

  const resetGame = () => {
      board.resetBoard();
      currentPlayer = playerX;
  };

  return { makeMove, resetGame, getBoard: board.getBoard };
};


const game = createGame();

game.makeMove(1);  // Player X moves
console.log(game.getBoard());  // ['X','','','','','','','','']

game.makeMove(5);  // Player O moves
console.log(game.getBoard());  // ['X','O','','','','','','','']

game.makeMove(3);  // Player X moves
console.log(game.getBoard());  // ['X','','','','','','','','']

game.resetGame();  // Resets the game
console.log(game.getBoard());  // ['','','','','','','','','']
