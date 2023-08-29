/*
const tiles = [...document.querySelectorAll('.tile')];
const playerDisplay = document.querySelector('.display-player');
const resetBtn = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const TIE = 'TIE';

const winningConditions = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];

const announce = (type) => {
   switch (type) {
      case PLAYERO_WON:
         announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
         break;
      case PLAYERX_WON:
         announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
         break;
      case TIE:
         announcer.innerText = 'Tie';
   }
   announcer.classList.remove('hide');
};

const changePlayer = () => {
   playerDisplay.classList.remove(`player${currentPlayer}`);
   currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
   playerDisplay.innerText = currentPlayer;
   playerDisplay.classList.add(`player${currentPlayer}`);
};

function resultValidation() {
   let roundWon = false;
   for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];

      if (a === '' || b === '' || c === '') {
         continue;
      }
      if (a === b && b === c) {
         roundWon = true;
         break;
      }

   }
   if (roundWon) {
      announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      return;
   }
   if (!board.includes('')) {
      announce(TIE);
   }
}

const updateBoard = (index) => {
   board[index] = currentPlayer;
};

const isValidAtion = (tile) => {
   if (tile.innerText === 'X' || tile.innerText === 'O') {
      return false;
   }
   return true;
};

const userAtion = (tile, index) => {
   if (isValidAtion(tile) && isGameActive) {
      tile.innerText = currentPlayer;
      tile.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      resultValidation();
      changePlayer();
   }
};

const resetBoard = () => {
   board = ['', '', '', '', '', '', '', '', ''];
   isGameActive = true;
   announcer.classList.add('hide');
   if (currentPlayer === 'O') {
      changePlayer();
   }
   tiles.forEach(tile => {
      tile.innerText = '';
      tile.classList.remove('playerX', 'playerO');
   });
};

tiles.forEach((tile, index) => {
   tile.addEventListener('click', () => userAtion(tile, index));
});



resetBtn.addEventListener('click', resetBoard);
*/

const playerDisplay = document.querySelector('.display-player');
const tiles = [...document.querySelectorAll('.tile')];
const announcer = document.querySelector('.announcer');
const resetBtn = document.querySelector('#reset');


let turn = 'x';

tiles.forEach(tile => {

   tile.addEventListener('click', game);
});

function game(event) {
   let element = event.target;
   if (turn === 'x' && element.innerHTML == '') {
      element.innerHTML = 'x';
      turn = 'o';
      playerDisplay.innerHTML = 'O';
   } else if (turn === 'o' && element.innerHTML == '') {
      element.innerHTML = 'o';
      turn = 'x';
      playerDisplay.innerHTML = 'X';
   }
   compare();
}

function compare() {

   let isGameActive = true;

   let count = 0;

   for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].innerHTML.trim() !== '') {
         count++;
      }

   }

   if (isGameActive) {

      if (tiles[0].innerHTML === 'x' && tiles[1].innerHTML === 'x' && tiles[2].innerHTML === 'x') {
         announcer.innerHTML = 'X has won';
         isGameActive = false;
         stopTheGame();

      } else if (tiles[0].innerHTML === 'o' && tiles[1].innerHTML === 'o' && tiles[2].innerHTML === 'o') {

         announcer.innerHTML = 'O has won';

         stopTheGame();

      }

      if (tiles[3].innerHTML === 'x' && tiles[4].innerHTML === 'x' && tiles[5].innerHTML === 'x') {
         announcer.innerHTML = 'X has won';

         stopTheGame();

      } else if (tiles[3].innerHTML === 'o' && tiles[4].innerHTML === 'o' && tiles[5].innerHTML === 'o') {

         announcer.innerHTML = 'O has won';

         stopTheGame();

      }

      if (tiles[6].innerHTML === 'x' && tiles[7].innerHTML === 'x' && tiles[8].innerHTML === 'x') {
         announcer.innerHTML = 'X has won';

         stopTheGame();

      } else if (tiles[6].innerHTML === 'o' && tiles[7].innerHTML === 'o' && tiles[8].innerHTML === 'o') {

         announcer.innerHTML = 'O has won';

         stopTheGame();

      }

      if (tiles[0].innerHTML === 'x' && tiles[3].innerHTML === 'x' && tiles[6].innerHTML === 'x') {
         announcer.innerHTML = 'X has won';

         stopTheGame();

      } else if (tiles[0].innerHTML === 'o' && tiles[3].innerHTML === 'o' && tiles[6].innerHTML === 'o') {

         announcer.innerHTML = 'O has won';

         stopTheGame();

      }


      if (tiles[1].innerHTML === 'x' && tiles[4].innerHTML === 'x' && tiles[7].innerHTML === 'x') {
         announcer.innerHTML = 'X has won';

         stopTheGame();

      } else if (tiles[1].innerHTML === 'o' && tiles[4].innerHTML === 'o' && tiles[7].innerHTML === 'o') {

         announcer.innerHTML = 'O has won';

         stopTheGame();

      }

      if (tiles[2].innerHTML === 'x' && tiles[5].innerHTML === 'x' && tiles[8].innerHTML === 'x') {
         announcer.innerHTML = 'X has won';

         stopTheGame();

      } else if (tiles[2].innerHTML === 'o' && tiles[5].innerHTML === 'o' && tiles[8].innerHTML === 'o') {

         announcer.innerHTML = 'O has won';

         stopTheGame();

      }

      if (tiles[0].innerHTML === 'x' && tiles[4].innerHTML === 'x' && tiles[8].innerHTML === 'x') {
         announcer.innerHTML = 'X has won';

         stopTheGame();

      } else if (tiles[0].innerHTML === 'o' && tiles[4].innerHTML === 'o' && tiles[8].innerHTML === 'o') {

         announcer.innerHTML = 'O has won';

         stopTheGame();

      }

      if (tiles[2].innerHTML === 'x' && tiles[4].innerHTML === 'x' && tiles[6].innerHTML === 'x') {
         announcer.innerHTML = 'X has won';

         stopTheGame();

      } else if (tiles[2].innerHTML === 'o' && tiles[4].innerHTML === 'o' && tiles[6].innerHTML === 'o') {

         announcer.innerHTML = 'O has won';

         stopTheGame();

      }

   }
   if (count === 9) {
      announcer.innerHTML = "It's a tie";
      stopTheGame();

   }

}


function stopTheGame() {
   tiles.forEach((tile) => {
      tile.removeEventListener('click', game);
   });
}

resetBtn.addEventListener('click', () => {
   location.reload();
});
