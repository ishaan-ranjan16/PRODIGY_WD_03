const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');
const modePvPBtn = document.getElementById('modePvP');
const modeAIBtn = document.getElementById('modeAI');
const player2Label = document.getElementById('player2Label');

const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const scoreDEl = document.getElementById('scoreD');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;
let vsAI = false;

let scores = { X: 0, O: 0, D: 0 };

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function createBoard() {
  boardEl.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('button');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', () => handleCellClick(i));
    boardEl.appendChild(cell);
  }
}

function handleCellClick(index) {
  if (!gameActive || board[index] !== null) return;
  if (vsAI && currentPlayer === 'O') return;

  makeMove(index, currentPlayer);

  if (gameActive && vsAI && currentPlayer === 'O') {
    setTimeout(aiMove, 400);
  }
}

function makeMove(index, player) {
  board[index] = player;
  renderCell(index);

  const winLine = checkWinner(board, player);
  if (winLine) {
    endGame(player, winLine);
    return;
  }

  if (board.every(cell => cell !== null)) {
    endGame(null, null);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
}

function renderCell(index) {
  const cellEl = boardEl.children[index];
  cellEl.textContent = board[index];
  cellEl.classList.add(board[index].toLowerCase());
  cellEl.disabled = true;
}

function checkWinner(b, player) {
  for (const line of WIN_LINES) {
    const [a, c, d] = line;
    if (b[a] === player && b[c] === player && b[d] === player) {
      return line;
    }
  }
  return null;
}

function endGame(winner, winLine) {
  gameActive = false;

  if (winner) {
    winLine.forEach(i => boardEl.children[i].classList.add('win'));
    statusEl.textContent = vsAI && winner === 'O'
      ? 'AI wins!'
      : `Player ${winner} wins!`;
    scores[winner]++;
  } else {
    statusEl.textContent = "It's a draw!";
    scores.D++;
  }

  updateScoreboard();
  disableAllCells();
}

function disableAllCells() {
  [...boardEl.children].forEach(c => c.disabled = true);
}

function updateStatus() {
  if (!gameActive) return;
  if (vsAI) {
    statusEl.textContent = currentPlayer === 'X' ? 'Your turn (X)' : 'AI is thinking...';
  } else {
    statusEl.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function updateScoreboard() {
  scoreXEl.textContent = scores.X;
  scoreOEl.textContent = scores.O;
  scoreDEl.textContent = scores.D;
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  createBoard();
  updateStatus();
}

function resetScores() {
  scores = { X: 0, O: 0, D: 0 };
  updateScoreboard();
}

// ---- AI logic (minimax, unbeatable) ----
function aiMove() {
  const bestIndex = getBestMove(board);
  if (bestIndex !== -1) {
    makeMove(bestIndex, 'O');
  }
}

function getBestMove(b) {
  let bestScore = -Infinity;
  let move = -1;

  for (let i = 0; i < 9; i++) {
    if (b[i] === null) {
      b[i] = 'O';
      const score = minimax(b, 0, false);
      b[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(b, depth, isMaximizing) {
  if (checkWinner(b, 'O')) return 10 - depth;
  if (checkWinner(b, 'X')) return depth - 10;
  if (b.every(cell => cell !== null)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (b[i] === null) {
        b[i] = 'O';
        best = Math.max(best, minimax(b, depth + 1, false));
        b[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (b[i] === null) {
        b[i] = 'X';
        best = Math.min(best, minimax(b, depth + 1, true));
        b[i] = null;
      }
    }
    return best;
  }
}

// ---- Mode switching ----
modePvPBtn.addEventListener('click', () => {
  vsAI = false;
  modePvPBtn.classList.add('active');
  modeAIBtn.classList.remove('active');
  player2Label.textContent = 'Player O';
  resetGame();
  resetScores();
});

modeAIBtn.addEventListener('click', () => {
  vsAI = true;
  modeAIBtn.classList.add('active');
  modePvPBtn.classList.remove('active');
  player2Label.textContent = 'AI';
  resetGame();
  resetScores();
});

resetBtn.addEventListener('click', resetGame);
resetScoreBtn.addEventListener('click', resetScores);

// Init
createBoard();
updateStatus();
