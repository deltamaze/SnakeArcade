function GameService()
{
    this.gameStarted = false;
    this.players = [new Snake(),new Snake()]
    this.gameUpdateTime = 100;
    this.canvasHeight = 300;
    this.canvasWidth = 300;
    this.gameScale = 10;//how large game pixel is
    this.cols = Math.floor(this.canvasHeight/this.gameScale);
    this.rows = Math.floor(this.canvasWidth/this.gameScale);
    this.food = new Food();
    this.room = 'Main';
    //p1InputRef
    //p2InputRef
    var p1Ref = firebase.database().ref('players/' + this.room + '/1');
    var p2Ref = firebase.database().ref('players/' + this.room + '/2');
    var foodRef = firebase.database().ref('food/' + this.room );
    var p1;
    var p2;

    this.startGame= function (){
        this.gameStarted = true;
        this.resetPlayerPosition(-1);
        this.spawnFood();
        this.setPlayers();
        setInterval(this.myTimer, this.gameUpdateTime);
    }
    this.setPlayers = function(){
        p1Ref.on("value", function(snapshot) {
            p1 = snapshot.val();
        });
        p2Ref.on("value", function(snapshot) {
            p2 = snapshot.val();
        });
    }

    this.myTimer = function() {
        if(this.eat())
        {
            this.spawnFood();
        }
        
    }

    this.spawnFood = function()  {
        
        this.food.x = (Math.floor(Math.random() * (this.cols - 0 + 1)) + 0)* this.gameScale;
        this.food.y=  (Math.floor(Math.random() * (this.rows - 0 + 1)) + 0)* this.gameScale;
        foodRef.set(this.food);
    }
    this.eat = function() {
        consumed = false;
        for(var j = 0;j<=this.players.Length;j++)
        {
            var d = this.calcDist(this.players[j].x, this.players[j].y, food.x, food.y);
            if (d < 1) {
                this.players[j].total++;
                consumed = true;
            }
        }
        return consumed;
    }
    this.gameOver = function() {
        for(var j = 0;j<=this.players.Length;j++)
        {

        //nested innerloop to test both 
        for(var i = 0;i<=this.players.Length;i++)//See if Snake[i]'s head is overlapping with any tail position of any other snake.
        {
            for(var j = 0;j<=this.players.Length;j++)//grab all snakes(j) to see if the head of snake i is ontop of the body of snake j
            {
                 for (var k = 0; k < this.players[j].tail.length; k++)//test all possible tail positions for snake J
                {
                    var pos = this.tail[k];
                    console.log(this.tail);
                    var d = dist(this.x,this.y,pos.x,pos.y);
                    if(d<1){
                        this.total = 0;
                        this.tail = [];
                    }
                }

            }
        }



        // for (var i = 0; i < this.tail.length; i++)
        // {
        //     var pos = this.tail[i];
        //     console.log(this.tail);
        //     var d = dist(this.x,this.y,pos.x,pos.y);
        //     if(d<1){
        //         this.total = 0;
        //         this.tail = [];
        //     }
        // }
        //delete player

    }
    this.updateSnake = function() {
        for(var x = 0;x<=this.players.Length;x++)
        {}
        var d = calcDist(this.x, this.y, food.x, food.y);Math.sqrt( a*a + b*b );
        if (d < 1) {
            this.total++;
            return true;
        }
        else {
            return false;
        }
        //save to firebase
    }
    this.calcDist = function(x1,y1,x2,y2){
        var a = x1 - x2
        var b = y1 - y2

        var c = Math.sqrt( a*a + b*b );
        return c;
    }
    this.resetPlayerPosition = function (playerNum) {
        if (playerNum ===0 || playerNum ===-1 )
        {
            this.players[0].x = 0
            this.players[0].y = 0

        }
        if (playerNum ===1 || playerNum ===-1 )
        {
            this.players[1].x = this.canvasWidth - this.gameScale;//player 1 default spot is set to 0,0 p2 is on the opposite side
            this.players[1].y = 0
        }
    }

    this.saveSnakeLocation = function(snakes)
    {
        
    }


}

