
const playerDisplay = document.querySelector('.display-player');
const tiles = [...document.querySelectorAll('.tile')];
const announcer = document.querySelector('.announcer');
const resetBtn = document.querySelector('#reset');

let turn = 'X';

tiles.forEach(tile => {

   tile.addEventListener('click', game);
});

function game(event) {
   let element = event.target;
   if (turn === 'X' && element.innerHTML == '') {
      element.innerHTML = 'X';
      turn = 'O';
      playerDisplay.innerHTML = 'O';
   } else if (turn === 'O' && element.innerHTML == '') {
      element.innerHTML = 'O';
      turn = 'X';
      playerDisplay.innerHTML = 'X';
   }
   compare();
}

function compare() {


   let count = 0;

   for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].innerHTML.trim() !== '') {
         count++;
      }

   }

   function won(num1, num2, num3) {
      announcer.innerHTML = `${tiles[num1].innerHTML} has won`;
      document.getElementById(`item${num1 + 1}`).style.backgroundColor = 'rgb(255 0 0)';
      document.getElementById(`item${num2 + 1}`).style.backgroundColor = 'rgb(255 0 0)';
      document.getElementById(`item${num3 + 1}`).style.backgroundColor = 'rgb(255 0 0)';
      stopTheGame();
   }

   if (tiles[0].innerHTML == tiles[1].innerHTML && tiles[1].innerHTML == tiles[2].innerHTML && tiles[2].innerHTML != '') {
      won(0, 1, 2);

   }
   if (tiles[3].innerHTML == tiles[4].innerHTML && tiles[4].innerHTML == tiles[5].innerHTML && tiles[5].innerHTML != '') {
      won(3, 4, 5);

   }
   if (tiles[6].innerHTML == tiles[7].innerHTML && tiles[7].innerHTML == tiles[8].innerHTML && tiles[8].innerHTML != '') {
      won(6, 7, 8);
   }

   if (tiles[0].innerHTML == tiles[3].innerHTML && tiles[3].innerHTML == tiles[6].innerHTML && tiles[6].innerHTML != '') {
      won(0, 3, 6);
   }

   if (tiles[1].innerHTML == tiles[4].innerHTML && tiles[4].innerHTML == tiles[7].innerHTML && tiles[7].innerHTML != '') {
      won(1, 4, 7);
   }

   if (tiles[2].innerHTML == tiles[5].innerHTML && tiles[5].innerHTML == tiles[8].innerHTML && tiles[8].innerHTML != '') {
      won(2, 5, 8);
   }

   if (tiles[0].innerHTML == tiles[4].innerHTML && tiles[4].innerHTML == tiles[8].innerHTML && tiles[8].innerHTML != '') {
      won(0, 4, 8);
   }

   if (tiles[2].innerHTML == tiles[4].innerHTML && tiles[4].innerHTML == tiles[6].innerHTML && tiles[6].innerHTML != '') {
      won(2, 4, 6);
   }

   if (count === 9 && announcer.innerHTML == '') {
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
