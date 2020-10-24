var runner , background , obstacle , invisibleGround , runnerOver , gameover , backgroundOverImage
var runnerImage , backgroundImage , obstacleImage , runnerOverImage , gameoverImage
var PLAY = 1;
var END = 0;
var gameState = PLAY
var score = 0

function preload(){
  runnerImage = loadImage ("player.gif")
  runnerOverImage = loadImage ("nithish.png")
  backgroundImage = loadImage ("background.gif")
  obstacleImage = loadImage ("Doctor-Eggman-Transparent-Background.png")
  gameoverImage = loadImage ("images.png")
  backgroundOverImage = loadImage("GameoverImage.jpg")
}

function setup() {
createCanvas (800,400)
  
  obstacleGroup = new Group();
  
  background = createSprite (370,100,100,100)
  background.addImage(backgroundImage)
  background.scale = 1.5
 
  runner = createSprite (50,280,20,50)
  runner.addImage (runnerImage)
  runner.scale = 0.2
  
  invisibleGround = createSprite (100,330,350,20)
  invisibleGround.visible = false
      
     gameover = createSprite (400,200,20,20)
     gameover.addImage(gameoverImage)
     gameover.scale = 0.5
}

function draw() {
//background ("blue")
  
  if (gameState ===PLAY ){
    
    score = score + Math.round(getFrameRate()/60);
  
    runner.velocityY = runner.velocityY +1
    if (keyDown("space") && runner.y >= 120){
  runner.velocityY = -10
    }
  }
 runner.collide(invisibleGround)  
  
 gameover.visible = false;
  
  spawnobstacles();
  reset();
  
if (runner.isTouching(obstacleGroup)){
  gameState = END   
  
     gameover = createSprite (400,200,20,20)
     gameover.addImage(gameoverImage)
     gameover.scale = 0.5
  
     runner.addImage(runnerOverImage)
     background.addImage(backgroundOverImage)
     background.scale = 4
  
  obstacleGroup.setVelocityXEach(0)
}  

  drawSprites();
  fill("white")
  textSize(30)
  textFont("Copperplate Gothic Bold")
  text("Score: "+ score, 500,50);
  
} 



function spawnobstacles (){
  if (frameCount%200 === 0)  {
  obstacle = createSprite (600,280,20,50)
  obstacle.addImage (obstacleImage)
  obstacle.scale = 0.3
  obstacle.velocityX = -12
   obstacleGroup.add(obstacle)
     obstacle.lifetime = 250
  }

}

function reset (){
  if(mousePressedOver(gameover)){
    gameState = PLAY;
    gameover.visible = false
    obstacleGroup.destroyEach();
    runner.addImage(runnerImage)
    background.addImage(backgroundImage)
    background.scale = 1.5
    score = 0
  }
}