 function touchUp(evt) {
 evt.preventDefault();
 // Terminate touch path
 lastPt=null;
  if (mousedownID!= -1)
  {
	  clearInterval(mousedownID);
	  mousedownID = -1
  }
 }

 function touchDown(evt) {
 evt.preventDefault();
 if(gameOverScreenScreen)
 {
 return;
 }

 touchXY(evt);
 }

 function touchXY(evt) {
 evt.preventDefault();
 if(lastPt!=null) {
 var touchX = evt.touches[0].pageX - canvas.offsetLeft;
 var touchY = evt.touches[0].pageY - canvas.offsetTop;
 }
 lastPt = {x:evt.touches[0].pageX, y:evt.touches[0].pageY};

 if (gameState == "game")
 {
 if (mousedownID == -1)
{
	mousedownID = setInterval(whilemousedown, 10);
}
 }

 if (gameState == "intro" || gameState == "end")
 {
    gameState = "game"
 }

}


 function KeyDown(evt)
 {
   
    mouseX = evt.clientX;
	 mouseY = evt.clientY;
    if (gameState == "game")
    {
if (mousedownID == -1)
{
	mousedownID = setInterval(whilemousedown, 10);
}
   }
   if (gameState == "intro" || gameState == "end")
   {
      gameState = "game"
   }

 }

 function whilemousedown()
 {

     if (mouseX > canvas.width/2 || lastPt.x > canvas.width/2)
   {
      //player.x = player.lerp(player.x, mouseX, 0.01);
      player.x += 5;
   }
   else if(mouseX < canvas.width/2 || lastPt.x < canvas.width/2)
   {
      //player.x = player.lerp(player.x, mouseX, 0.01);
      player.x -= 5;
   }
 }