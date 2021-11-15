// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode, height,
 *    loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width
 *    UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, isLooping, textAlign, CENTER, textSize, LEFT, collideLineRect, createButton
 */

// Solution: Version 1 - No Tail

let backgroundColor, playerSnake, currentApple, score, testSegment, slowModeFrame, restartButton, highScore;

let startModal = document.getElementById('start-modal');
let startOverlay = document.getElementById('start-overlay');
let startButton = document.getElementById('start-button');

startButton.addEventListener('click', start => {
    startModal.classList.add('remove');
    startOverlay.classList.add('remove');

});

function setup() {    
  // Canvas & color settings
  createCanvas(800, 600);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 0;
  frameRate(12);
  playerSnake = new Snake();
  currentApple = new Apple();
  //testSegment = new SnakeSegment(100, 100); 
  score = 0;
  highScore = 0;
  slowModeFrame = 0;
  //restart button
  restartButton = createButton("RESTART");
  restartButton.size(60, 20);
  restartButton.style("color", "black");
  restartButton.style("font-size", "15px");
  restartButton.style("border", "none");
  restartButton.style("background", "white");
  restartButton.position(1080, 110);
  restartButton.mousePressed(restartGame);

}

function normalMode(){
  frameRate(12);
  slowModeFrame = 0;
}

function draw() {
  if (slowModeFrame > 0){
      slowModeFrame -= 1;
  } else if (slowModeFrame == 0) {
      normalMode();
  }
  
  background(backgroundColor);
  // The snake performs the following four methods:
  playerSnake.moveSelf();
  playerSnake.showSelf();
  playerSnake.checkCollisions();
  //playerSnake.checkApples();
  // The apple needs fewer methods to show up on screen.
  currentApple.showSelf();
  //testSegment.showSelf();
  // We put the score in its own function for readability.
  displayScore();
  //gameOver();
}

function displayScore() {
  fill(100);
  text(`Score: ${score}`, 20, 20);
  text(`High Score: ${highScore}`, 20, 40);
}

class Snake {
  constructor() {
    this.size = 10;
    this.x = width/2;
    this.y = height - 10;
    this.direction = 'N';
    this.speed = 12;
    // need to begin with because we add and take out segment coordinates so you need something to start with
    this.segments = [new SnakeSegment(this.x, this.y)]; //initial head segment as start of array/first element of array
  }

  moveSelf() {
    if (this.direction === "N") {
      this.y -= this.speed;
    } else if (this.direction === "S") {
      this.y += this.speed;
    } else if (this.direction === "E") {
      this.x += this.speed;
    } else if (this.direction === "W") {
      this.x -= this.speed;
    } else {
      console.log("Error: invalid direction");
    }
    // add the current position
    this.segments.unshift(new SnakeSegment(this.x, this.y));
    //this.segments.pop();
    // if i didnt collide with apple, then remove last element
    if (this.checkApples() === false) {

      this.segments.pop()
    }
  }

  showSelf() {
    stroke(240, 100, 100);
    noFill();
    rect(this.x, this.y, this.size, this.size);
    noStroke();
    
    for(let segment of this.segments){
      segment.showSelf();
    }
  }

  checkApples() {
    // If the head of the snake collides with the apple...
    if (collideRectRect(this.x, this.y, this.size, this.size,
        currentApple.x, currentApple.y, currentApple.size, currentApple.size)) {
      // Make a new apple, increment the score, and extend the tail.
      score += 1;
      if (highScore < score) {
        highScore = score;
      }
      // powerup collision
      if (currentApple.isSpecialApple){
        frameRate(5)
        // stays in slowmode for x frames when green apple eaten
        slowModeFrame = 0;
      }
      currentApple = new Apple();
      // returns whether collision has happened or not
      return true
    } else {
      return false
    }
  }

  checkCollisions() {
    // collision against wall
      // 4 x collideRectLine
    //left wall
    if(collideLineRect(0,0, 
                       0,height, 
                       this.x, this.y, 
                       this.size, this.size)){
      gameOver();
      // right wall
    } else if (collideLineRect(width,0, 
                               width,height, 
                               this.x, this.y, 
                               this.size, this.size)){
      gameOver();    
      // top wall
    } else if (collideLineRect(0,0, 
                             width,0, 
                             this.x, this.y, 
                             this.size, this.size)){
      gameOver();   
      // bottom wall
    } else if (collideLineRect(0,height, 
                             width,height, 
                             this.x, this.y, 
                             this.size, this.size)){
      gameOver();               
    }
    // collisin againts sanke segment
    // go through every segment and check if snakes current head collides with segment
    
    for (let i = 1; i < this.segments.length; i++){
      const segment = this.segments[i];
      let hit = collideRectRect(this.x, this.y, this.size, this.size, segment.x, segment.y, segment.size, segment.size);
      if (hit) {
        gameOver();
      }
    }
  }
}



class SnakeSegment {
   constructor(x, y) {
     this.x = x;
     this.y = y;
     this.size = 10;
     this.hue = 240;
     this.saturation = 80;
     this.randomColor = false;
  }
  
  randomColorMode() {
    this.randomColor = true;
  }
  
  changeColor() {
    if (this.randomColor){
      this.hue = random(360)
    } else {
      this.hue += 10;
    // this.hue = random(360)
        if(this.hue > 360){
          this.hue %= 360;
        }

        if (this.stauration > 20){
          this.saturation -= 10;
        }     
      }
  }

  showSelf() {
    noStroke();
    // coloring it black
    this.changeColor();
    fill(this.hue, this.saturation, 80);
    rect(this.x, this.y, this.size, this.size);
    noFill();
  } 
}

class Apple {
  constructor() {
    this.x = round(random(width - 10));
    this.y = round(random(height - 10));
    this.size = 10;
    // basically coin flip  
    // random(2) --> 0.0 - 1.9999~
    // Math.floor(random(2)) --> 0, 1, 50% chance of special apple
    this.isSpecialApple = Math.floor(random(2)) == 0
  }

  showSelf() {
    if(this.isSpecialApple){
      fill(120, 80, 80);
    } else {
      fill(0, 80, 80);
    }
    rect(this.x, this.y, this.size, this.size);
  }
}

// keyCode 32 = space
function keyPressed() {
  console.log("key pressed: ", keyCode);
  if (keyCode === UP_ARROW && playerSnake.direction != 'S') {
    playerSnake.direction = "N";
  } else if (keyCode === DOWN_ARROW && playerSnake.direction != 'N') {
    playerSnake.direction = "S";
  } else if (keyCode === RIGHT_ARROW && playerSnake.direction != 'W') {
    playerSnake.direction = "E";
  } else if (keyCode === LEFT_ARROW && playerSnake.direction != 'E') {
    playerSnake.direction = "W";
  } else if (isLooping() === false && keyCode === 32){
    restartGame();
  } else {
    console.log("wrong key");
  }
}

function restartGame() {
  // reset screen
  playerSnake = new Snake();
  currentApple = new Apple();
  score = 0
  // restart draw loop
  loop();
}

function gameOver() {
  // stop game
  fill(100);
  stroke(0);
  textAlign(CENTER);
  textSize(32);
  text(`GAME OVER`, width/2, height/2);
  //reset to default
  textAlign(LEFT);
  textSize(12);
  noLoop()
}  


// for powerup, create a new class like the apple one or make one in the apple class
