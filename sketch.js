var monkey , monkey_running;
var banana ,bananaImage, bananaGroup;
var obstacle, obstacleImage, obstacleGroup;
var ground, invisibleGround;
var score = 0;
var backgroundImg;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImg = loadImage('jungle.jpg');

}

function setup() {
  createCanvas(700,700);
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  ground = createSprite(500, 350, 1000, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.addImage(backgroundImg);
  ground.scale = 1.4;
  
  invisibleGround = createSprite(500, 650, 1000, 10);
  invisibleGround.visible = false;
  
  monkey = createSprite(80, 400, 20, 20);
  monkey.addAnimation('moving', monkey_running);
  monkey .scale = 0.2;
  
}


function draw() {
  background('white');
  
  if(gameState == PLAY){
    if(keyDown('space')){
      monkey.velocityY = -6;
    }

  
    if(ground.x < 20){
      ground.x = 500;
    }
    
    monkey.velocityY = monkey.velocityY + 0.5;
    
    if(bananaGroup.isTouching(monkey)){
      score = score + 2;
      if(score == 10){
        monkey.scale = 0.3;
      }
      
      else if(score == 30){
        monkey.scale = 0.4;
      }
    
       else if(score == 50){
        monkey.scale = 0.5;
      }
      
    }
    
    if(obstacleGroup.isTouching(monkey)){
      score = score - 1;
      monkey.scale = 0.1;
    }
  
    spawnBanana();
    spawnObstacles();

  
    drawSprites();

    if(score < 0){
      gameState = END;
    }
    
  }
  
  else if(gameState == END){
    fill('red');
    textSize(25);
    text('GAME OVER', 300, 300);
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    
  }
 
  monkey.collide(invisibleGround);
  fill('white');
  textSize(25);
  text('score: ' + score, 50, 30);
    
  
}

function spawnBanana(){
  if(frameCount % 200 === 0){
    banana = createSprite(500, 600, 20, 20);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(450,550)) 
    banana.velocityX = -3;
    banana.scale = 0.2;
    banana.lifetime = 130;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    bananaGroup.add(banana);
    
  }
}

function spawnObstacles(){
  if(frameCount % 150 === 0){
    obstacle = createSprite(300, 600, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.scale = 0.2;
    obstacle.lifetime = 130;
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    obstacleGroup.add(obstacle);
    
  }
}


