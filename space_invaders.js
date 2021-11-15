// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height,
 *    noStroke, random, strokeWeight, text, textSize, width, loadImage, createButton, loadSound, loop, noLoop
      windowWidth, dist, dir, key, rectMode, CENTER, imageMode, rect, windowHeight, var, frameRate, loadImage, image, HSL, for, image, mouseX, mouseY, collideRectCircle, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, keyCode
 
 */

let ship, flowers, drops
let alien1Img, shipImg, alien2Img
let score, highScore, time

function preload() {
  alien1Img = loadImage("https://cdn.glitch.com/42235d6b-7dec-4559-8d4f-d2809f42944d%2Fspace-invaders-png-icon-340341%20(1).png?v=1627674304696");
  alien2Img = loadImage("https://cdn.glitch.com/42235d6b-7dec-4559-8d4f-d2809f42944d%2Fkisspng-space-invaders-clip-art-space-invaders-png-transparent-picture-5a756479a6ddf9.1250142615176428736835.png?v=1627674384467");
  shipImg = loadImage("https://cdn.glitch.com/42235d6b-7dec-4559-8d4f-d2809f42944d%2FDaco_4101003.png?v=1627674577796");
}

function setup(){
  createCanvas(600, 600);
  score = 0;
  highScore = 0;
  time = 2000;
  
  ship = new Ship();
  
  flowers = []
  

  for (let i = 0; i < 10; i++){
    flowers.push(new Flower(i * 50 + 80, 140));
    flowers.push(new Flower(i * 50 + 80, 100));
    flowers.push(new Flower(i * 50 + 80, 60));
    flowers.push(new Flower(i * 50 + 80, 20));
  }    
  

  drops = []
}

function draw(){
  background(10)
  displayText(); 
  handleTime();


  for (let drop of drops){
    drop.showWater();
    drop.moveDrops();
      for (let flower of flowers){
        if (drop.hits(flower)){
          flower.dead();
          score += 10;
          drop.evaporate();
          //console.log("YES");
        }
      }  
  }
  
  let edge = false;
  for (let flower of flowers){
    flower.showFlower();
    flower.move();
    
    if (flower.x > width - flower.r|| flower.x < 0 + flower.r) {
      edge = true;
    }
  }
    if (edge) {
      for (let flower of flowers) {
        flower.shiftDown();
        
        if (flower.y + flower.r >= height){
            flower.gameOver();
        }
      }      
    } 
  
  // walks through array backwards to delete
  for (let i = drops.length - 1; i >= 0; i--) {
    if (drops[i].toDelete){
      drops.splice(i, 1);
    }
  }
  
  ship.showShip();
  ship.move();  
  //handleCollision();
}

class Ship {
  constructor(){
    this.x = width/2;
    this.y = height - 20;
    this.size = 40;
    this.xdir = 0;
  }
  
  showShip(){
    imageMode(CENTER);
    image(shipImg, this.x, this.y, this.size, this.size);
  }
  
  setDir(dir) {
    this.xdir = dir;
  }
  
  move(dir){
    this.x += this.xdir * 5;
  }
}

class Flower { 
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.r = 30;
    
    this.xdir = 1;

  }
  
  showFlower(){
    image(alien1Img, this.x, this.y, this.r, this.r);
    //ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
  
  dead() {
    this.x = 5000;
    this.x = flowers.x;
  }
  
  move() {
    this.x += this.xdir
  }
  
  shiftDown() {
    this.xdir *= -1;
    this.y += this.r;
  }
  
  gameOver() {
    noLoop();
    fill(100);
    textSize(40);
    text(`GAME OVER`, 180, height/2)
    textSize(12);
  }
  
} 

class Drops {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.r = 8;
    this.toDelete = false;
  }
  
  showWater(){
    fill(150, 0, 200)
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }  
  
  moveDrops() {
    this.y -= 5;
  }
  
  evaporate() {
    this.toDelete = true;
  }

  hits(flower){
    let d = dist(this.x, this.y, flower.x, flower.y);
    if (d < this.r + flower.r) {
      return true;
    } else {
      return false;
    }

  }
}

function keyReleased() {
  if (key != ' ') {
    ship.setDir(0);    
  }
}

function keyPressed(){
  if (key === ' '){
    let drop = new Drops(ship.x, height - ship.size)
    drops.push(drop);
  }
  
  if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1)
  } 
}
/*
function handleCollision() {
  let hit = false;
  hit = collideRectCircle(flowers.x, flowers.y, flowers.size, flowers.size, drops.x, drops.y, drops.r);
  if (hit){
    score += 10;
    for (let i = flowers.length - 1; i >= 0; i--){
      flowers.splice(i, 1);
    }
  }
  if (highScore < score){
    highScore = score;
  }
}*/

function handleTime() {
  time -= 1;
  if (time < 0){
    noLoop();
    textSize(40);
    text(`GAME OVER`, 180, height/2)  
    textSize(12); 
  }
}

function displayText() {
  fill(100);
  text(`SCORE: ${score}`, 20, 20);
  text(`HIGH SCORE: ${highScore}`, 20, 40);
  text(`TIME: ${time}`, 20, 60);
}
/*
function gameOver() {
  if (time === 0 || flowers.y + flowers.r >= height){

  }
}
*/
function restartGame() {

}

  
