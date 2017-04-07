var room = "Main";

var player = {
  playerNum: null,
  user: null,
  x: 0,
  y: 0
}

var roomPing = {
  user: null,
  timestamp: firebase.database.ServerValue.TIMESTAMP
};

var p1Ref = firebase.database().ref('players/' + room + '/' + 1);
var p2Ref = firebase.database().ref('players/' + room + '/' + 2);
//var snakesRef = firebase.database().ref('snakes/'+room+'/'+1);
//var food = firebase.database().ref('food/'+room+'/'+2);
var snakes = [new Snake()]
var food = new Food();

var gameInProgress = false;
//Client Function get player status
function checkExistingPlayers() {
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
}
//Authenticate
firebase.auth().signInAnonymously().then(function () {
  userId = firebase.auth().currentUser.uid;
  roomPing.user = userId;
  player.user = userId;
  checkExistingPlayers()
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
  gameService.startGame();
  player.playerNum = num;
  if (firebase.auth().currentUser)//if authenticated
  {
    firebase.database().ref('players/' + room + '/' + player.playerNum).set(player).then(res => checkExistingPlayers());
  }
}
//Update Direction
function setCourse(x, y) {
  if (player.playerNum != null) {
    player.x = x;
    player.y = y;
  }
  else {
    return;
  }
  if (firebase.auth().currentUser)//if authenticated
  {
    firebase.database().ref('players/' + room + '/' + player.playerNum).set(player);
  }
}