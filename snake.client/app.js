
var gameService;
//Setup Canvas
function setup() {
    var canvas = createCanvas(300,300);
    canvas.parent('p5-holder');
    gameService= new GameService();


}
function draw() {
  background(51);
  drawSnakes();
}
function joinGame(player)
{
  gameService.startGame();
  console.log(gameService.players);
}
function drawSnakes(){
  for(var j = 0; j < gameService.players.length; j++)
  {
        fill(255);
        //draw Tail
        // for (var i = 0; i < this.total; i++) { 
        //     rect(this.tail[i].x, this.tail[i].y, scl, scl);
        // }
        //draw Head
        rect(gameService.players[j].x, gameService.players[j].y, gameService.gameScale, gameService.gameScale);
  }

}