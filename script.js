const board = document.getElementById('board');
let cells = Array(9).fill(null);
let turn = 'X';
let gameOver = false;

function render() {
  board.innerHTML = '';
  cells.forEach((v, i) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = v || '';
    cell.onclick = () => move(i);
    board.appendChild(cell);
  });
}

function move(i) {
  if (cells[i] || gameOver) return;
  cells[i] = turn;
  if (checkWin()) {
    document.getElementById('status').textContent = 'Vencedor: ' + turn;
    gameOver = true;
  } else if (cells.every(x => x)) {
    document.getElementById('status').textContent = 'Empate!';
    gameOver = true;
  } else {
    turn = turn === 'X' ? 'O' : 'X';
    document.getElementById('status').textContent = 'Vez de: ' + turn;
  }
  render();
}

function checkWin() {
  const l = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return l.some(([a,b,c]) => cells[a] && cells[a] === cells[b] && cells[a] === cells[c]);
}

render();
