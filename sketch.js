 
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,survivalTime=0
var gameState="PLAY"

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  
 
   
  ground=createSprite(200,380,1200,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  
  monkey=createSprite(80,315,5,5);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.2;
  
 
  
  invisibleGround=createSprite(200,390,900,10);
  invisibleGround.visible=false;
  
  FoodGroup=createGroup();
  obstaclesGroup = createGroup();
  
   

  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height)
  monkey.debug = true;
  
  survivalTime=0;

}


function draw() {
  background(600)
  
 if(gameState === "PLAY"){
  
     stroke("white");
    textSize(20);
    fill("white");
    text("Score:"+score,500,50);

    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate());
    text("Survival Time:"+survivalTime,100,50);

    if (ground.x < 0){
        ground.x = ground.width/2;
      }

    monkey.collide(ground);


    if(keyDown("space")&& monkey.y >= 100) {
          monkey.velocityY = -12;
      }

    monkey.velocityY = monkey.velocityY + 0.8

    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    }
 }
 
  if(gameState === "END"){
    
  if(obstaclesGroup.isTouching(monkey)){
    obstaclesGroup.collide(monkey)
    ground.velocityX = 0;
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
  }
  }
  
  createBanana();
  createObstacle();
  drawSprites();
}

function createBanana(){
  if(frameCount % 80 === 0){
    banana=createSprite(280,50,5,5);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.y=Math.round(random(120,200,5,5));
    banana.velocityX = -4;
    banana.lifetime=150;
    
    FoodGroup.add(banana);
  }
}

function createObstacle(){
  if(frameCount % 300 === 0){
    obstacle=createSprite(260,337,5,5);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2
   // obstacle.y=Math.round(random(100,200,5,5));
    obstacle.velocityX = -4;
    obstacle.lifetime=120;
    
    obstaclesGroup.add(obstacle);
    
    monkey.depth=obstacle.depth+1;
  }
}
