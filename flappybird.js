// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, frameCount, Bird, Pipe, pipe, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, createButton, saveCanvas, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, loadImage, key, ESCAPE, noLoop, loop, frameRate */

let bird;
let pipes = [];
let score, highScore, lives;
let restartButton;

function setup() {
  createCanvas(800, 600);
  bird = new Bird();
  pipes.push(new Pipe());
  
  highScore = 0;
  resetGame();
  
  restartButton = createButton("RESTART");
  restartButton.size(70, 40);
  restartButton.style("color", "white");
  restartButton.style("font-size", "12px");
  restartButton.style("border", "none");
  restartButton.style("background", "black")
  restartButton.position(width - 75, 40);
  restartButton.mousePressed(resetGame);
}

function draw() {
  background('#33C9FF');
  
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    
    if (pipes[i].hits(bird)) {
      console.log('HIT');
      lives --;
    } else {
      score ++;
    }
    
    if (lives == 0) {
      gameOver()
      highScore = score;
    }
  }
  
  fill(255);
  noStroke();
  text(`SCORE: ${score}`, 20, 20);
  text(`HIGH SCORE: ${highScore}`, 20, 40);
  
  bird.update();
  bird.show()
  
  if (frameCount % 100 ==  0) {
    pipes.push(new Pipe());
  }
  
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
    //console.log("SPACE");
  }
}

function resetGame() {
  loop();
  score = 0
  lives = 5;
}

function gameOver() {
// stop game
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text(`GAME OVER`, width/2, height/2);
  //reset to default
  textAlign(LEFT);
  textSize(12);
  noLoop()  
}