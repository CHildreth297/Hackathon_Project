let reset = document.getElementById('reset')
let start = document.getElementById('start')
let valueText = document.getElementById('rgb_value')
let scoreMessage = document.getElementById('result')
let score = document.getElementById('score')
let result = document.getElementById('result')
let time = document.getElementById('timer')
let modal = document.getElementById('modal')
let overlay = document.getElementById('overlay')
let endingScore = document.getElementById('ending-score')
let close = document.getElementById('close')
let startModal = document.getElementById('start-modal')
let startOverlay = document.getElementById('start-overlay')
let startButton = document.getElementById('start-button')
let highScore = document.getElementById('highscore')
let hearts = document.getElementsByClassName('fa fa-heart')
let buttons_array = document.getElementsByClassName('buttons')
let endMessage = document.getElementById('end-message')


//Starting Game
let points = 0;
let lives = 4;
let highscore = points;
let timer = 31;
let runTimer = setInterval(countDown, 1000);
clearInterval(runTimer)
score.innerHTML = "Score: " + points;
changeColor();

//Event Listeners
reset.addEventListener('click', resetGame);
close.addEventListener('click', closeResults);
startButton.addEventListener('click', startGame);

//event listener for every color button
for (let i = 0; i < buttons_array.length; i++) {
  buttons_array[i].addEventListener('click', check_answer);
}

//Change Color of Buttons
function setColor(button, red, green, blue) {
  button.setAttribute('style', 'background-color: rgb(' + red + ',' + green + ',' + blue + ');');
}

//Reset game
function resetGame() {
  changeColor();
  points = 0;
  lives = 4;
  result.innerHTML = '';
  score.innerHTML = "Score: " + points;
  scoreMessage.innerHTML = '';

  //reset timer
  clearInterval(runTimer);
  timer = 31;
  runTimer = setInterval(countDown, 1000);

  //reset hearts
  for (var i = 0; i < hearts.length; i++) {
    hearts[i].style.opacity = "1";
  }
}

// changes colors of buttons
function changeColor() {
  red = Math.round(Math.random() * 255);
  green = Math.round(Math.random() * 255);
  blue = Math.round(Math.random() * 255);

  for (let i = 0; i < 6; i++) {
    red = Math.round(Math.random() * 255);
    green = Math.round(Math.random() * 255);
    blue = Math.round(Math.random() * 255);

    setColor(buttons_array[i], red, green, blue)
  }

  changeValueText();
}

// changes the rgb value displayed in text
function changeValueText() {
  let random = Math.round(Math.random() * 5);
  let number = buttons_array[random].style.backgroundColor;
  valueText.innerHTML = number;
}

// checks rbg value of button clicked & updates score/lives
function check_answer(button) {
  if (this.style.backgroundColor == valueText.innerHTML) {
    changeColor();
    points += 10;
    score.innerHTML = "Score: " + points;
    result.classList.add('show')
    scoreMessage.innerHTML = 'Correct!';
    scoreMessage.style.color = "green";
  }
  else {
    result.classList.add('show')
    scoreMessage.innerHTML = 'Wrong Color! Try Again.';
    scoreMessage.style.color = "red";
    points -= 2;
    score.innerHTML = "Score: " + points;

    //decrements lives if user is wrong
    if (lives >= 0) {
      hearts[lives].style.opacity = '0';
      lives -= 1;
    }
    if (lives == -1) {
      endGame();
    }

  }
}

//Timer
function countDown() {
  timer -= 1;
  time.innerHTML = 'Time: ' + timer;
  time.style.color = "black";
  time.style.fontWeight = "400";

  if (timer <= 5) {
    time.style.color = "red";
    time.style.fontWeight = "500";
  }

  //ends game if time runs out
  if (timer == 0) {
    endGame();

    if (points > highscore) {
      highscore = points
    }
    endMessage.innerHTML = "Time's Up!";
    highScore.innerHTML = "High Score: " + highscore;
  }
}

function endGame() {
  clearInterval(runTimer);
  modal.classList.add('display')
  overlay.classList.add('display')
  endingScore.innerHTML = "Final Score: " + points;
  if (points > highscore) {
    highscore = points
  }
  highScore.innerHTML = "High Score: " + highscore;
  endMessage.innerHTML = "You Died!";
}

//close results panel
function closeResults() {
  overlay.classList.remove('display')
  modal.classList.remove('display')
  startModal.classList.remove('remove')
  startOverlay.classList.remove('remove')
}

function startGame() {
  startModal.classList.add('remove')
  startOverlay.classList.add('remove')
  resetGame();
}

