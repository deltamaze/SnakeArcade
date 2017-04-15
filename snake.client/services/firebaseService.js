var room = "Main";

var player = {
  playerNum: null,
  user: null,
  xSpeed: 0,
  ySpeed: 0
}

var roomPing = {
  user: null,
  timestamp: firebase.database.ServerValue.TIMESTAMP
};

var p1Ref = firebase.database().ref('players/' + room + '/' + 1);
var p2Ref = firebase.database().ref('players/' + room + '/' + 2);
//var snakesRef = firebase.database().ref('snakes/'+room+'/'+1);
var foodRef = firebase.database().ref('food/' + room );
var snakeRef = firebase.database().ref('snakes/' + this.room );
var snakes = [new Snake()]
var food = new Vector();

var gameInProgress = false;
//Client Function get player status
function setUpRefs() {
  //check p1
  p1Ref.on('value', function (snapshot) {
    if (snapshot.val() === null) {
      $('#buttonP1').prop('disabled', false);
      gameInProgress = false;
    }
    else {
      $('#buttonP1').prop('disabled', true);
      gameInProgress = true;
    }

  });
  //check p2
  //setupFood
  foodRef.on('value', function (snapshot) {
    food = snapshot.val()});
  //setupSnakes
  snakeRef.on('value', function (snapshot) {
    snakes = snapshot.val();
    console.log(snakes);});
}
//Authenticate
firebase.auth().signInAnonymously().then(function () {
  userId = firebase.auth().currentUser.uid;
  roomPing.user = userId;
  player.user = userId;
  setUpRefs();
})
  .catch(function (error) {
    this.handleError(error);
  });


//Client Function pings so it knows that someone is using the game Room
setInterval(function () {
  if (firebase.auth().currentUser)//if authenticated
  {
    firebase.database().ref('rooms/' + room).set(roomPing);
  }
}, 5000);


//Client Function: join start
function joinGame(num) {
  gameService.startGame(room);
  player.playerNum = num;
  if (firebase.auth().currentUser)//if authenticated
  {
    firebase.database().ref('players/' + room + '/' + player.playerNum).set(player).then(res => setUpRefs());
  }
}
//Update Direction
function setCourse(x, y) {
  if (player.playerNum != null) {
    player.xSpeed = x;
    player.ySpeed = y;
  }
  else {
    return;
  }
  if (firebase.auth().currentUser)//if authenticated
  {
    firebase.database().ref('players/' + room + '/' + player.playerNum).set(player);
  }
}