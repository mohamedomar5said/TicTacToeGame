const playerDisplay = document.querySelector(".display-player");
const tiles = [...document.querySelectorAll(".tile")];
const announcer = document.querySelector(".announcer");
const resetBtn = document.querySelector("#reset");

const playerAudio = document.getElementById("playerAudio");
const aiAudio = document.getElementById("aiAudio");
const loseAudio = document.getElementById("loseAudio");

let humanScore = document.querySelector("#human_score");
let tieScore = document.querySelector("#tie_score");
let aiScore = document.querySelector("#ai_score");

let origBoard;
let humanPlayer;
let aiPlayer;
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



popup();
function popup() {


   swal({
      title: "Choose your symbol",
      text: "Do you want to play as X or O?",
      buttons: false,
      allowOutsideClick: false,
      content: {
         element: "input",
         attributes: {
            placeholder: "Your name",
            type: "text", // Specify the input type
            id: 'user-name'
         },
      },
   });

   let buttonX = document.createElement('button');
   buttonX.innerText = 'X';
   buttonX.className = 'btnX';
   buttonX.value = 'X';

   let buttonO = document.createElement('button');
   buttonO.innerText = 'O';
   buttonO.className = 'btnO';
   buttonO.value = 'O';

   let div = document.createElement('div');
   div.className = 'chose-symbol';
   div.append(buttonX, buttonO);

   let popup = document.querySelector('.swal-modal');

   popup.append(div);

  document.getElementById('user-name').addEventListener("keydown", function (e) {
      if (e.key === "Enter") e.preventDefault();

   });

   function closeThePopUp() {
      tiles.forEach((tile) => tile.style.zIndex = 1);
      document.getElementById('difficultySelect').style.zIndex = 1;
      playerDisplay.innerText = humanPlayer;
      speak(`hello ${document.getElementById('user-name').value} , let's play`);
      swal.close();
   }

   buttonX.addEventListener("click", function () {
      humanPlayer = "X";
      aiPlayer = "O";

      document.querySelector('.playerSymbol').innerText = 'PLAYER ( X )';
      document.querySelector('.aiSymbol').innerText = 'Computer ( O )';


      closeThePopUp();
   });

   buttonO.addEventListener("click", function () {
      humanPlayer = "O";
      aiPlayer = "X";
      document.querySelector('.playerSymbol').innerText = 'PLAYER ( O )';
      document.querySelector('.aiSymbol').innerText = 'Computer ( X )';

      closeThePopUp();
   });

}

let computerTurn = false;


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

      playerDisplay.innerText = aiPlayer;

      if (!checkWin(origBoard, humanPlayer) && !checkTie()) {
         computerTurn = true;
         setTimeout(() => {
            turn(bestSpot(), aiPlayer);
            playerDisplay.innerText = humanPlayer;
            aiAudio.play();
            computerTurn = false; // Enable tiles after the computer's move.
            checkTie();
         }, 100); // Adjust the delay time as needed.
      }
   }
}


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
   gameWon.player == aiPlayer ? loseAudio.play() : '';

   if (gameWon.player == humanPlayer) {
      humanScore.innerHTML++;
      speak('you won !');
   } else if (gameWon.player == aiPlayer) {
      aiScore.innerHTML++;
   }
}

function emptyTiles() {
   return origBoard.filter(e => typeof e == 'number');
}

function checkTie() {

   if (emptyTiles().length == 0) {
      for (let i = 0; i < tiles.length; i++) {
         tiles[i].style.backgroundColor = "green";
         tiles[i].removeEventListener("click", turnClick);
      }
      declareWinner("Tie Game !");
      tieScore.innerHTML++;
      speak('its a TIE , you did not win');
      return true;
   }
   return false;
}


function bestSpot() {

   const selectedDifficulty = document.getElementById("difficultySelect").value;
   const selectElement = document.querySelector(".difficulty");
   selectElement.style.display = "none";
   selectElement.blur();
   document.querySelector('.chosen-level').innerText = 'level : ' + selectedDifficulty;


   if (selectedDifficulty === 'easy') {
      if (Math.random() < 0.4) {
         return emptyTiles()[Math.floor(Math.random() * emptyTiles().length)];
      }
   }

   if (selectedDifficulty === 'medium') {
      if (Math.random() < 0.3) {
         return emptyTiles()[Math.floor(Math.random() * emptyTiles().length)];
      }
   }

   return minimax(origBoard, aiPlayer).index;
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
   if (player === aiPlayer) {
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


function declareWinner(who) {
   announcer.innerHTML = who;

}
let userStarts = true;

resetBtn.addEventListener('click', reset);

function reset() {
   tiles.forEach((tile) => {
      tile.innerText = '';
      tile.style.backgroundColor = '#121818';
   });
   announcer.innerHTML = '';

   userStarts = !userStarts;

   if (userStarts) {
      computerTurn = false;
   } else {
        let randomMove = emptyTiles()[Math.floor(Math.random() * emptyTiles().length)];
      computerTurn = true;
      setTimeout(() => {
         turn(randomMove, aiPlayer);
         aiAudio.play();
         computerTurn = false;
      });
   }

   startGame();
}
