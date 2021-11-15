/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, createButton, saveCanvas, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, loadImage, key, ESCAPE, noLoop, loop, frameRate */

function Pipe() {
  
  this.top = random(height/2);
  this.bottom = random(height/2);
  this.x = width;
  this.w = 20
  this.speed = 2;
  
  this.highlight = false;
  
  
  this.hits = function(bird) {
    if (bird.y + 40 < this.top || bird.y + 40 > height - this.bottom) {
      if (bird.x + 30 > this.x && bird.x + 30 < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }
  
  this.show = function() {
    fill('red');
    if (this.highlight) {
      fill(0, 0, 255);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }
  
  this.update = function() {
    this.x -= this.speed;
  }
  
}