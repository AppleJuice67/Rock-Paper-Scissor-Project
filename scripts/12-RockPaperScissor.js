
let score = JSON.parse(localStorage.getItem('score')) || {
    wins:  0,
    losses:  0,
    tie:  0 
}


updateScoreElement();

/* Variable for Autoplay function */ 

let isAutoPlaying =false;
let intervalId;

/*Autoplay function*/

function autoPlay() {
   if (!isAutoPlaying) {
      intervalId = setInterval( () => {
         const playerMove = pickComputerMove();
         gamePlay(playerMove);       
   },  1000);
      isAutoPlaying = true;
   } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
   }
}

/* This part is for the onclick event button converted into addEventListener*/ 

document.querySelector('.js-rock-button').addEventListener('click', () => { gamePlay('rock'); });
document.querySelector('.js-paper-button').addEventListener('click', () => {gamePlay('paper'); });
document.querySelector('.js-scissors-button').addEventListener('click', () => {gamePlay('scissors'); });
document.querySelector('.js-reset-button').addEventListener('click', () => { 
   score.wins = 0;
   score.losses = 0;
   score.tie = 0;
   localStorage.removeItem('score');
   updateScoreElement();})
document.querySelector('.js-auto-click').addEventListener('click', () => {autoPlay();} );


/* This function is a key event that allows the game to be played using keys, controls are 'S,R and P.*/

document.body.addEventListener('keydown', (event) => {

   if (event.key === 's') {

      gamePlay('scissors');

   } else if (event.key === 'p') {

      gamePlay('paper');

   } else if (event.key === 'r') {

      gamePlay('rock');
   }

});

/* This function is the code that the program use to execute the game. by calling the name of this function 'gamePlay' and using its parameter 'rock' 'paper' 'scissors' you can run its function */

function gamePlay(playerMove) {

const computerMove = pickComputerMove();   
let result = '';

if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
   result = 'You Lose.';
      }  else if (computerMove === 'paper') {
   result = 'You Win.';
         } else if (computerMove === 'scissors') {
   result = 'Tie.'; 
}

} else if (playerMove === 'paper') {

   if (computerMove === 'rock') {
      result = 'You Win.';
      } else if (computerMove === 'paper') {
      result = 'Tie.';
      } else if (computerMove === 'scissors') {
      result = 'You Lose.'; 
      }

} else if (playerMove === 'rock') {

if (computerMove === 'rock') {
   result = 'Tie.';
} else if (computerMove === 'paper') {
   result = 'You Lose.';
} else if (computerMove === 'scissors') {
   result = 'You Win.'; 
}

}

if (result ==='You Win.') {
score.wins += 1;
} else if (result === 'You Lose.') {
score.losses += 1;
} else if (result === 'Tie.') {
score.tie += 1;
}


localStorage.setItem('score',JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result')
.innerHTML = result; 

document.querySelector('.js-moves')
.innerHTML = `You 
<img src="Images/${playerMove}-emoji.png" class="move-icon">
<img src="Images/${computerMove}-emoji.png" class="move-icon">
Computer`;



}

function updateScoreElement(){

document.querySelector('.js-score')
.innerHTML = `Win: ${score.wins}. Lose: ${score.losses} Tie: ${score.tie}`;

}

function pickComputerMove() { 
      const randomNumber = Math.random(); 
      let computerMove = '';

if (randomNumber >= 0 && randomNumber < 1 / 3) {
   computerMove = 'rock';
} else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
   computerMove = 'paper';     
} else if (randomNumber >= 2 / 3 && randomNumber < 1) {
     computerMove = 'scissors'; 
      }

          return computerMove;
}
