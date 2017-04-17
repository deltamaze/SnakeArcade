var functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
//var Observable = require('rxjs/Observable').Observable;
//// patch Observable with appropriate methods
//require('rxjs/add/observable/timer');
// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions

exports.startGame =functions.database.ref('/players/{pushId}/')
    .onWrite(event => {
        // Only edit data when it is first created.
        if (event.data.previous.exists()) {
            return;
        }
        // Exit when the data is deleted.
        if (!event.data.exists()) {
            return;
        }
        var eventSnapshot = event.data;
        const original = event.data.val();
        console.log("console log test");
        var x = 1
        admin.database().ref('/test/').set(event.params.pushId);
        // setTimeout(function(){
        //     admin.database().ref('/test/').set({foo:'bar2'});
        // }, 10000);
        // Observable.timer(3000, 1000).subscribe(x => {
        //     admin.database().ref('/test/').set({foo:'bar'+x});
        //     x++;
        // });
    
        return;
    }); 
      
function Snake()
{
    this.vect = new Vector();
    this.xSpeed = 0;
    this.ySpeed= 0;
    this.tail = []
    this.playerNum = 0;
    this.total = 0;
    this.gameOver = false;
}
function Vector()
{
    this.x = 0;
    this.y= 0;
}
