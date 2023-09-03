const playerDisplay = document.querySelector(".display-player");
const tiles = [...document.querySelectorAll(".tile")];
const announcer = document.querySelector(".announcer");
const resetBtn = document.querySelector("#reset");

let origBoard;
const humanPlayer = "O";
const aiPlayer = "X";
const winConditions = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];

// Add this function to speak a message
function speak(message) {
   const synth = window.speechSynthesis;
   const utterance = new SpeechSynthesisUtterance(message);
   utterance.lang = 'en-US';
   utterance.rate = 1.2;
   utterance.pitch = 1.8;
   synth.speak(utterance);

}

let computerTurn = false;

const playerAudio = document.getElementById("playerAudio");
const aiAudio = document.getElementById("aiAudio");


startGame();

function startGame() {
   origBoard = [...Array(9).keys()];
   tiles.forEach((tile) => {
      tile.addEventListener('click', turnClick);
   });
   // Start the game with the player's turn.
   computerTurn = false;
   // speak("Let's play mohamed abdullaaah zaki ! ");
}

function turnClick(tile) {
   if (!computerTurn && typeof origBoard[tile.target.id] == "number") {
      turn(tile.target.id, humanPlayer);
      playerAudio.play();

      // Disable the tiles during the computer's turn.
      computerTurn = true;

      if (!checkWin(origBoard, humanPlayer) && !checkTie()) {
         // Simulate a delay to make it seem like the computer is thinking.
         setTimeout(() => {
            turn(bestSpot(), aiPlayer);
            aiAudio.play();
            computerTurn = false; // Enable tiles after the computer's move.
         }, 200); // Adjust the delay time as needed.
      }
   }
}

// ...



// ...


function turn(tileId, player) {
   if (typeof origBoard[tileId] === "number") {
      origBoard[tileId] = player;
      const tileElement = document.getElementById(tileId);
      if (tileElement) {
         tileElement.innerText = player;
      }
      let gameWon = checkWin(origBoard, player);
      if (gameWon) gameOver(gameWon);
   }
}


function checkWin(board, player) {

   let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
   let gameWon;
   for (const [index, win] of winConditions.entries()) {

      if (win.every((elem) => plays.indexOf(elem) > -1)) {

         gameWon = { index: index, player: player };
         break;

      }

   }

   return gameWon;

}

function gameOver(gameWon) {
   for (const index of winConditions[gameWon.index]) {
      document.getElementById(index).style.backgroundColor =
         gameWon.player == humanPlayer ? 'blue' : 'red';

   }

   for (let i = 0; i < tiles.length; i++) {
      tiles[i].removeEventListener("click", turnClick);
   }
   declareWinner(
      gameWon.player == humanPlayer ? 'you won' : 'you lose'
   );
   gameWon.player == aiPlayer ? speak('you lose .  hahahahahahaa hahahahahahaha  .  did you like my laugh ?? , or you didnt ??') : '';
}

function emptyTiles() {
   return origBoard.filter(e => typeof e == 'number');
}

function bestSpot() {
   return minimax(origBoard, aiPlayer).index;
}

function checkTie() {
   if (emptyTiles().length == 0) {
      for (let i = 0; i < tiles.length; i++) {
         tiles[i].style.backgroundColor = "green";
         tiles[i].removeEventListener("click", turnClick);
      }
      declareWinner("Tie Game !");
      speak('its a TIE , you did not win');
   }
}



function minimax(newBoard, player) {
   let availSpots = emptyTiles();

   if (checkWin(newBoard, humanPlayer)) {
      return { score: -10 };
   } else if (checkWin(newBoard, aiPlayer)) {
      return { score: 20 };
   } else if (availSpots.length === 0) {
      return { score: 0 };
   }

   let moves = [];
   for (let i = 0; i < availSpots.length; i++) {
      let move = {};
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = player;

      if (player == aiPlayer) {
         let result = minimax(newBoard, humanPlayer);
         move.score = result.score;
      } else {
         let result = minimax(newBoard, aiPlayer);
         move.score = result.score;
      }

      newBoard[availSpots[i]] = move.index;

      moves.push(move);

   }

   let bestmove;
   if (player == aiPlayer) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
         if (moves[i].score > bestScore) {
            bestScore = moves[i].score;
            bestmove = i;
         }

      }
   } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
         if (moves[i].score < bestScore) {
            bestScore = moves[i].score;
            bestmove = i;
         }

      }
   }
   return moves[bestmove];
}

