/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, createButton, saveCanvas, 
          keyCode, false, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, loadImage, key, ESCAPE, noLoop, loop, frameRate */
let img;
function preload() {
  img = loadImage("https://cdn.glitch.me/86d2aa5e-b1d5-496c-97d7-6119177d3e7a%2Fclipart480241.png?v=1636936736536");
}


function Bird() {
  this.y = height/2;
  this.x = 35;
  
  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;
  
  this.show = function() {
    fill(255);
    image(img, this.x, this.y, 40, 30);
  }
  
  this.up = function() {
    this.velocity += this.lift;
  }
   
  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;
    
    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }
    
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
    
  }
  

  
}