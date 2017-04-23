var room = "Main2";

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
var p1CallBack;
var p2Ref = firebase.database().ref('players/' + room + '/' + 2);
var p2CallBack;
//var snakesRef = firebase.database().ref('snakes/'+room+'/'+1);
var foodRef = firebase.database().ref('food/' + room );
var foodCallBack;
var snakeRef = firebase.database().ref('snakes/' + room );
var snakeCallBack

var snakes = [new Snake()]
var food = new Vector();

//Client Function get player status
function setUpRefs() {
  //check p1
  p1CallBack = p1Ref.on('value', function (snapshot) {
    if (snapshot.val() === null) {
      $('#buttonP1').prop('disabled', false);
    }
    else {
      $('#buttonP1').prop('disabled', true);
    }

  });
  //check p2
  p2CallBack = p2Ref.on('value', function (snapshot) {
    if (snapshot.val() === null) {
      $('#buttonP2').prop('disabled', false);
    }
    else {
      $('#buttonP2').prop('disabled', true);
    }

  });
  //setupFood
  foodCallBack =foodRef.on('value', function (snapshot) {
    food = snapshot.val()});
  //setupSnakes
  snakeCallBack = snakeRef.on('value', function (snapshot) {
    snakes = snapshot.val();
  });
  //set up RoomLabel
  document.getElementById("currRoomLabel").innerHTML = "Current Room - "+room;
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
  
  player.playerNum = num;
  if (firebase.auth().currentUser)//if authenticated
  {
    firebase.database().ref('players/' + room + '/' + player.playerNum).set(player).then(res => setUpRefs());
  }
}
//Client Function: join start
function joinRoom() {
  //turn off current listeners to old room
  p1Ref.off('value', p1CallBack);
  p2Ref.off('value', p2CallBack);
  foodRef.off('value', foodCallBack);
  snakeRef.off('value', snakeCallBack);
  //room = textBox.text
  setUpRefs();

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