

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
