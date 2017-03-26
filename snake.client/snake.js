
function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 0;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];

    this.update = function () {
        
        if(this.total=== this.tail.length){
            for (var i = 0; i < this.tail.length; i++) {
                this.tail[i] = this.tail[i+1];
        }}
        else
        {
            console.log(this.total);
            console.log(this.tail);

        }
        console.log(this.total);
        this.tail[this.total-1] = createVector(this.x,this.y)
        
        //console.log(this.x);
        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        this.x = constrain(this.x, 0, width - scl)
        this.y = constrain(this.y, 0, height - scl)

        

    }

    this.show = function () {
        fill(255);
        for (var i = 0; i < this.total; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
    }

    this.dir = function (x, y) {
        //   if(this.xspeed !=x || this.yspeed !=y){
        //       console.log(this.x);
        //       console.log(this.y);
        //   }
        this.xspeed = x;
        this.yspeed = y;
    }

    this.eat = function (food) {
        var d = dist(this.x, this.y, food.x, food.y);
        if (d < 1) {
            this.total++;
            return true;
        }
        else {
            return false;
        }
    }
    this.checkGameOver = function () {
        for (var i = 0; i < this.tail.length; i++)
        {
            var pos = this.tail[i];
            console.log(this.tail);
            var d = dist(this.x,this.y,pos.x,pos.y);
            if(d<1){
                this.total = 0;
                this.tail = [];
            }
        }
    }
}