
var gameService;
var p1Color;
var p2Color;
var foodColor
//Setup Canvas
function setup() {
    var canvas = createCanvas(300,300);
    canvas.parent('p5-holder');
    gameService= new GameService();
    p1Color =  color(0, 102, 255)//blue
    p2Color = color(255, 0, 0);//red
    foodColor = color(255,0,100);//pink


}
function draw() {
  background(51);
  if(gameService.gameStarted)
  {
    drawSnakes();
    drawFood();
  }
}
function joinGame(player)
{
  gameService.startGame();
  console.log(gameService.players);
}
function drawSnakes(){
  for(var j = 0; j < gameService.players.length; j++)
  {
        if(j==0)//p1 color
        {
          fill(p1Color);
        }
        else if(j==1)//p2 color
        {
          fill(p2Color);
        }
        else
        {
          fill(255);
        }
        //draw Tail
        for (var i = 0; i < gameService.players[j].tail.length; i++) { 
            rect(gameService.players[j].tail[i].x, gameService.players[j].tail[i].y, gameService.gameScale, gameService.gameScale);
        }
        //draw Head
        rect(gameService.players[j].x, gameService.players[j].y, gameService.gameScale, gameService.gameScale);
    }
  }
  function drawFood(){
    fill(foodColor);
    rect(gameService.food.x, gameService.food.y, gameService.gameScale, gameService.gameScale);
    //console.log(gameService.food.x);
  }