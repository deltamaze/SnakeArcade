
var gameService;
var p1Color;
var p2Color;
var foodColor;
var gameScale;
//Setup Canvas
function setup() {
    var canvas = createCanvas(300,300);
    canvas.parent('p5-holder');
    gameService= new GameService();
    p1Color =  color(0, 102, 255)//blue
    p2Color = color(255, 0, 0);//red
    foodColor = color(255,0,100);//pink
    gameScale = 10;


}
function draw() {
  background(51);
  if(gameInProgress)
  {
    drawSnakes();
    drawFood();
  }
}

function drawSnakes(){
  if (snakes === null)
  {
    return;
  }
  for(var j = 0; j < snakes.length; j++)
  {
        
        if(snakes[j].playerNum==1)//p1 color
        {
          fill(p1Color);
        }
        else if(snakes[j].playerNum==2)//p2 color
        {
          fill(p2Color);
        }
        else
        {
          fill(255);//white
        }
        //draw Head
        rect(snakes[j].vect.x, snakes[j].vect.y, gameScale, gameScale);
        //draw Tail
        if(typeof snakes[j].tail === 'undefined')
        {
          continue; //if tail does not exist, continue loop
        }
        for (var i = 0; i < snakes[j].tail.length; i++) { 
            rect(snakes[j].tail[i].x, snakes[j].tail[i].y, gameScale, gameScale);
        }
        
    }
  }
  function drawFood(){
    fill(foodColor);
    rect(food.x, food.y, gameScale, gameScale);
    //console.log(gameService.food.x);
  }
  function keyPressed(){
  if(keyCode ===UP_ARROW || keyCode ===87){
    setCourse(0,-1);
  }
  else if(keyCode ===DOWN_ARROW || keyCode ===83){
    setCourse(0,1);
  }
  else if(keyCode ===LEFT_ARROW || keyCode ===65){
    setCourse(-1,0);
  }
  else if(keyCode ===RIGHT_ARROW || keyCode ===68){
    setCourse(1,0);
  }
}
