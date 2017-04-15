function GameService()
{
    this.gameStarted = false;
    this.snakes = [new Snake(),new Snake()]
    
    this.snak
    this.gameUpdateTime = 100;
    this.canvasHeight = 300;
    this.canvasWidth = 300;
    this.gameScale = 10;//how large game pixel is
    this.cols = Math.floor(this.canvasHeight/this.gameScale);
    this.rows = Math.floor(this.canvasWidth/this.gameScale);
    this.food = new Vector();
    this.room = 'Main';
    //p1InputRef
    //p2InputRef
    this.p1Ref = firebase.database().ref('players/' + this.room + '/1');
    this.p2Ref = firebase.database().ref('players/' + this.room + '/2');
    this.foodRef = firebase.database().ref('food/' + this.room );
    this.snakeRef = firebase.database().ref('snakes/' + this.room );
    this.p1 ;
    this.p2 ;

    this.startGame= function (roomName){

        this.room = roomName
        this.gameStarted = true;
        this.setPlayers();
        this.resetPlayerPosition(-1);
        this.spawnFood();
        this.saveSnakeLocation();
        setInterval(this.myTimer.bind(this), this.gameUpdateTime);
    }
    this.setPlayers = function(){
        
        
        this.snakes[0].playerNum = 1 //set up p1
        this.snakes[1].playerNum = 2 //set up p2
        this.p1Ref.on("value", function(snapshot) {
            this.p1 = snapshot.val();
        }.bind(this));
        this.p2Ref.on("value", function(snapshot) {
            this.p2 = snapshot.val();
        }.bind(this));
       
    }

    this.myTimer = function() {
        if(this.eatFood())
        {
            console.log("spawnfood");
            this.spawnFood();
        }
        this.checkGameOver();//check to see if players lost
        this.updateSnake();


        this.saveSnakeLocation();
    }

    this.spawnFood = function()  {
        
        this.food.x = (Math.floor(Math.random() * (this.cols - 0 + 1)) + 0)* this.gameScale;
        this.food.y=  (Math.floor(Math.random() * (this.rows - 0 + 1)) + 0)* this.gameScale;
        this.foodRef.set(this.food);
    }

    this.eatFood = function() {
        consumed = false;
        for(var j = 0;j<this.snakes.length;j++)
        {
            console.log(this.snakes[j]);
            var d = this.calcDist(this.snakes[j].vect.x, this.snakes[j].vect.y, food.x, food.y);
            if (d < 1) {
                this.snakes[j].total++;
                consumed = true;
            }
        }
        return consumed;
    }

    this.checkGameOver = function() {
        for(var j = 0;j<=this.snakes.Length;j++)
        {

            //nested innerloop to test both 
            for(var i = 0;i<=this.snakes.length;i++)//See if Snake[i]'s head is overlapping with any tail position of any other snake.
            {
                for(var j = 0;j<=this.snakes.length;j++)//grab all snakes(j) to see if the head of snake i is ontop of the body of snake j
                {
                    for (var k = 0; k < this.snakes[j].tail.length; k++)//test all possible tail positions for snake J
                    {
                        var pos = this.snakes[j].tail[k];
                        var d = this.calcDist(this.snakes[i].vect.x,this.snakes[i].vect.y,pos.x,pos.y);
                        if(d<1){
                            this.snakes[i].total = 0;
                            this.snakes[i].tail = [];
                            this.snakes[i].gameOver = true;
                        }
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
        
        for(var j = 0; j < this.snakes.length; j++)
        {
            //    if(this.snakes[j].total=== this.snakes[j].tail.length){
            //         for (var i = 0; i < this.snakes[j].tail.length; i++) {
            //             this.tail[i] = this.tail[i+1];
            //     }}
            //     else
            //     {
            //     }
            //     this.snakes[j].tail[this.total-1] = createVector(this.x,this.y)
                
                
                if (this.p1 !== null)
                {
                    this.snakes[j].vect.x = this.snakes[j].vect.x + this.p1.xSpeed * this.gameScale;
                    this.snakes[j].vect.y = this.snakes[j].vect.y + this.p1.ySpeed * this.gameScale;
                }
               
                
                if(this.snakes[j].vect.x > (this.canvasWidth - this.gameScale))
                {
                    this.snakes[j].vect.x = (this.canvasWidth - this.gameScale);//limit x to canvas width
                }
                if(this.snakes[j].vect.y > (this.canvasHeight - this.gameScale))
                {
                    this.snakes[j].vect.y = (this.canvasHeight - this.gameScale);//limit y to canvas height
                }
                if(this.snakes[j].vect.x < (0))
                {
                    this.snakes[j].vect.x = 0;//limit x to canvas width
                }
                if(this.snakes[j].vect.y < (0))
                {
                    this.snakes[j].vect.y = (0);//limit y to canvas height
                }
                //this.snakes[j].x = constrain(this.x, 0, width - this.gameScale)
                //this.y = constrain(this.y, 0, height - scl)

            
        }
       
    }
    this.calcDist = function(x1,y1,x2,y2){
        var a = x1 - x2
        var b = y1 - y2

        var c = Math.sqrt( a*a + b*b );
        return c;
    }
    this.resetPlayerPosition = function (playerNum) {
        
        if (playerNum ===1 || playerNum ===-1 )
        {
            this.snakes[0].vect.x = 0
            this.snakes[0].vect.y = 0

        }
        if (playerNum ===2 || playerNum ===-1 )
        {
            this.snakes[1].vect.x = this.canvasWidth - this.gameScale;//player 1 default spot is set to 0,0 p2 is on the opposite side
            this.snakes[1].vect.y = 0
        }
    }

    this.saveSnakeLocation = function(snakes)
    {
        this.snakeRef.set(this.snakes);
    }


}

