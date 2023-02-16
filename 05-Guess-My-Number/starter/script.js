'use strict';
// console.log(document.querySelector('.message').textContent);

/// DOM AND DOM MANIPULATION //
/* DOM - Document Object Model - a structured representation of HTML documents. 
- Allows JavaScript to access HTML elements and styles to manipulate them. 
DOM is a connection point between HTML documents and JavaScript code.

document.querySelector('.message').textContent = '🎉 Correct answer';
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

// Click Events //
// event - somethins that happens on the page (mouse click, mouse moving, key press, or other).

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);
  // when we get something form the user interface, ex,form an imput field it usually is a string
  // We will have to compare our number with a randomly generated number - we need to convert the string into a number

  // When there is no imput
  if (!guess) {
    // document.querySelector('.message').textContent = '🙀 No number!';
    displayMessage('🙀 No number!');
    // When player wins
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = '😸 Correct number!';
    displayMessage('😸 Correct number!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      //   document.querySelector('.message').textContent =
      //     guess > secretNumber ? '📈 Too high' : '📉  Too low';
      displayMessage(guess > secretNumber ? '📈 Too high' : '📉  Too low');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      //   document.querySelector('.message').textContent = '😿  You lost the game!';
      displayMessage('😿  You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }
  //     // When guess is too high
  //   else if (guess > secretNumber) {
  //     if (score > 1) {
  //       document.querySelector('.message').textContent = '📈 Too high';
  //       score--;
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.message').textContent = '😿  You lost the game!';
  //       document.querySelector('.score').textContent = 0;
  //     }
  //     // when guess is too low
  //   } else if (guess < secretNumber) {
  //     if (score > 1) {
  //       document.querySelector('.message').textContent = '📉  Too low';
  //       score--;
  //       document.querySelector('.score').textContent = score;
  //     } else {
  //       document.querySelector('.message').textContent = '😿  You lost the game!';
  //       document.querySelector('.score').textContent = 0;
  //     }
  //   }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  //   document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = 'score';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
// Implementing the game logic //
// - implementing the way how the game works
// - what happens when the guess is correct (equal to the secret number)
// - what happens when the guess is too low or too high
