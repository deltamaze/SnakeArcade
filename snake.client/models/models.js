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