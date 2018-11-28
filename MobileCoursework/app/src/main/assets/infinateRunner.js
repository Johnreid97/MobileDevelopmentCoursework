
document.write("<script src='Obstacles.js' type='text/javascript'></script>");
document.write("<script src='Inputs.js' type='text/javascript'></script>");

class aSprite 
{
 constructor(x, y, ScaleX, ScaleY, imageSRC, spType){
 //this.zindex = 0;
 this.x = x;
 this.y = y;
 this.sizeX = ScaleX;
 this.sizeY = ScaleY;
 this.sType = spType;
 this.sImage = new Image();
 this.sImage.src = imageSRC;
 }


 // Method
 render()
 {
 canvasContext.save();
 canvasContext.scale(this.sizeX,this.sizeY);
 canvasContext.drawImage(this.sImage,this.x, this.y, this.sImage.width,this.sImage.height);
 canvasContext.restore();
 }



 // Method
 scrollBK(delta)
 {

 canvasContext.save();
 canvasContext.scale(this.sizeX,this.sizeY);
 canvasContext.translate( 0, delta);
 
 canvasContext.drawImage(this.sImage, 0, -this.sImage.height, canvas.width/4, this.sImage.height);
 canvasContext.drawImage(this.sImage,0, 0, canvas.width/4, this.sImage.height);
 canvasContext.drawImage(this.sImage, 0, this.sImage.height,canvas.width/4, this.sImage.height);
 canvasContext.drawImage(this.sImage, 0, -this.sImage.height*2 ,canvas.width/4, this.sImage.height)
 
 canvasContext.restore();
 }

 // Getter
 get xPos()
{
  return this.x;
}

get yPos(){
  return this.y;
}

 // Method
 setPos(newX,newY)
 {
 this.x = newX;
 this.y = newY;
 }

  lerp (value1, value2, amount) 
{
  amount = amount < 0 ? 0 : amount;
  amount = amount > 1 ? 1 : amount;
  return value1 + (value2 - value1) * amount;
}

//  // Static Method
//  static distance(a, b)
//  {
//  const dx = a.x - b.x;
//  const dy = a.y - b.y;

//  return Math.hypot(dx, dy);
//  }

 // Method
 spriteType()
 {
 console.log('I am an instance of aSprite!!!');
 }

 }

 var canvas;
 var canvasContext;
 var travel = 0;
 var player;
 var enemySpawn;
 var score  = 0;
 var elapsed;

 var mouseX;
 var mouseY;
 var mousedownID = -1;




 function resizeCanvas() 
 {
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 }

 function load()
 {
 canvas = document.getElementById('gameCanvas');
 canvasContext = canvas.getContext('2d');
 init();
 }


 function init() 
 {

  //var obstacleclass = new obstacle();
 if (canvas.getContext) {
 //Set Event Listeners for window, mouse and touch
 
 window.addEventListener('resize', resizeCanvas, false);
 window.addEventListener('orientationchange', resizeCanvas, false);

 canvas.addEventListener("touchstart", touchDown, false);
 canvas.addEventListener("touchmove", touchXY, true);
 canvas.addEventListener("touchend", touchUp, false);
 canvas.addEventListener("mousedown", KeyDown, false);
 canvas.addEventListener("mouseup", touchUp, false);

 document.body.addEventListener("touchcancel", touchUp, false);

 resizeCanvas();

 background = new aSprite(0,0,4,4,"Road.jpg", "Generic");
 player = new aSprite(0,0,4,4,"Audi.png",  "Generic");
 
 player.setPos((canvas.width - player.sImage.width)/10, (canvas.height - player.sImage.height) /6);
 //console.log(player.x);
 startTimeMS = Date.now();

 enemySpawn = setInterval(spawnenemies, enemyRespawn);
 gameLoop();
 }
 }

 function gameLoop()
 {
 console.log("gameLoop");
 elapsed = (Date.now() - startTimeMS)/1000;
 travel += elapsed * 100;
 if (travel > background.sImage.height)
 {
 travel = 0;
 }

 update(elapsed);
 render(elapsed);
 startTimeMS = Date.now();
 collisionDetection();
 scoreScaling();
 requestAnimationFrame(gameLoop);
 }



 function render(delta) 
 {
 canvasContext.clearRect(0,0,canvas.width, canvas.height);
 //background.backgroundControl();
 background.scrollBK(travel * 2);
 
 //canvasContext.strokeRect(1,1, canvas.width-2, canvas.height - 2);
 for (var i = 0; i < enemies.length; i++)
 {
    
     enemies[i].render();
     enemies[i].y += carSpeed; 
    

	 if ( player.x < enemies[i].x + (enemy.sImage.width/2) && player.x + (player.sImage.width/2) > enemies[i].x && player.y < enemies[i].y + (enemy.sImage.height/2) && player.y + (player.sImage.height/2) > enemies[i].y)
	 {
	  location.reload();
   }    
 }
  player.render();
 }

 function update(delta)
 {
 
 }

 function collisionDetection()
 {

 }

 function styleText(txtColour, txtFont, txtAlign, txtBaseline)
 {
 canvasContext.fillStyle = txtColour;
 canvasContext.font = txtFont;
 canvasContext.textAlign = txtAlign;
 canvasContext.textBaseline = txtBaseline;
 }

 function scoreScaling()
 {
   //console.log(score);
   score += elapsed *10;

   if (score > 100)
   {

    //clearInterval(enemySpawn);
    //enemyRespawn = 3000;
   // setInterval(spawnenemies,2000);
     carSpeed = 4;
  }
   canvasContext.fillStyle = "blue";
   canvasContext.font = "bold 100px Comic Sans";
   canvasContext.fillText("Score : " + score.toString().substr(0,4), canvas.width/2, 100);
 }
 

 


	 
 
