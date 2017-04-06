
//Properties
var s;
var scl = 10;
var food;
var userId; // my auth.uid
var roomPing = {
    user: null,
    timestamp: firebase.database.ServerValue.TIMESTAMP
};
var player = {
  playerNum: null,
  user:null,
  x:0,
  y:0
}
var room = "Main";

//Authenticate
firebase.auth().signInAnonymously().then(function(){
  userId = firebase.auth().currentUser.uid;
  roomPing.user = userId;
  player.user = userId;
  $('button').prop('disabled', false);
})
.catch(function(error) {
          this.handleError(error);
        });

//Send Server pings so it knows that someone is using the game Room
setInterval(function () {
  if(firebase.auth().currentUser)//if authenticated
  {
    firebase.database().ref('rooms/'+room).set(roomPing);
  }
}, 5000);

function joinGame(num)
{
  player.playerNum = num;
  if(firebase.auth().currentUser)//if authenticated
  {
    firebase.database().ref('players/'+room).set(player);
  }

}
//Setup Canvas
function setup() {
    var canvas = createCanvas(300,300);
    canvas.parent('p5-holder');
    s = new Snake();
    frameRate(10);
    //food = createVector(random(width),random(height));
    pickLocation();
}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)),floor(random(rows)));
  food.mult(scl);
}

function draw() {
  background(51);
  if(s.eat(food))
  {
    pickLocation();
  }
  s.checkGameOver();
  s.update();
  s.show();

  
  

  fill(255,0,100)
  rect(food.x,food.y, scl, scl);
}
function keyPressed(){
  if(keyCode ===UP_ARROW || keyCode ===87){
    s.dir(0,-1);
  }
  else if(keyCode ===DOWN_ARROW || keyCode ===83){
    s.dir(0,1);
  }
  else if(keyCode ===LEFT_ARROW || keyCode ===65){
    s.dir(-1,0);
  }
  else if(keyCode ===RIGHT_ARROW || keyCode ===68){
    s.dir(1,0);
  }
}
function handleError(error)
{
  console.error(error);
}