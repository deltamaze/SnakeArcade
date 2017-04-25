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
var foodRef = firebase.database().ref('food/' + room);
var foodCallBack;
var snakeRef = firebase.database().ref('snakes/' + room);
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
  foodCallBack = foodRef.on('value', function (snapshot) {
    food = snapshot.val()
  });
  //setupSnakes
  snakeCallBack = snakeRef.on('value', function (snapshot) {
    snakes = snapshot.val();
  });
  //set up RoomLabel
  document.getElementById("currRoomLabel").innerHTML = "Current Room - " + room;
  //refresh game room list
  getActiveRooms();
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
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://snakearcade-45688.appspot.com/startgame/"+room, false);
  xhr.send();
}
//Client Function: join start
function joinRoom(roomName) {
  //turn off current listeners to old room
  

  p1Ref.off('value', p1CallBack);
  p2Ref.off('value', p2CallBack);
  foodRef.off('value', foodCallBack);
  snakeRef.off('value', snakeCallBack);
  if (roomName == null||roomName == '') {
    room = document.getElementById("textboxRoom").value;
  }
  else {
    room=roomName;
  }

  setUpRefs();
}
function getActiveRooms() {
  firebase.database().ref('rooms/')

  var list = document.getElementById('roomList');
  list.innerText = '';
  var startAtDate = new Date().getTime();
  startAtDate = startAtDate - 30000//get rooms with activity 30 seconds ago, so remove 30000 miliseconds
  firebase.database().ref('rooms').orderByChild("timestamp").startAt(startAtDate).once("value", function(snapshot) {
    snapshot.forEach(function(child) {
      console.log(child.key+': '+child.val());
      var li = document.createElement('li');
      li.innerHTML = child.key +' - '
      var btn = document.createElement('button');
      btn.type = "button";
      btn.className = "btn btn-primary btn-sm";
      btn.onclick = function() { // Note this is a function
        joinRoom(child.key);
      };
      btn.innerText = "Join"
          
      li.appendChild(btn);
      // +" <button id = 'buttonP1' type='button' class='btn btn-primary btn-sm'  onclick='joinRoom("+child.key+")>Join</button>";
      //td.innerText = child.val().email + " --- " + JSON.stringify(child.val());
      list.appendChild(li);
    });
  });
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