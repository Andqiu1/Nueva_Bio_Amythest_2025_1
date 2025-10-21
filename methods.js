/*
//Button class example
//Makes creating and using buttons easy
//Credit to Hanson for Empty Console

var butt = new button(200,105,200,90);
//first value is middle x of the rectangle, second value is middle y of the rectange, third value is width, fourth value is height

function draw(){
  push();
  butt.work();
  fill(20)
  stroke(255);
  strokeWeight(5);
  translate(butt.x,butt.y);
  scale(butt.size,butt.size);
  rect(0,0,butt.sizeX,butt.sizeY,5);
  textSize(60);
  fill(255);
  noStroke();
  text("CLICK",0,0);
  pop();
}
*/

class button{
  constructor(a,b,c,d){
    this.x=a;
    this.y=b;
    this.sizeX=c;
    this.sizeY=d;
    this.size=1;
    this.sizev=0.1;
    this.dragv = 1.5;
    this.drag = 1.4;
    this.clicks = 0;
    this.clicked = false;
    this.hover = false;
    this.last = false;
    this.held = false;
    this.heldFor = 0;
    this.state = false;
  }
  work(){
    //this.size-=sin((frameCount-1)/20)/50;
    if(rectHit(this.x,this.y,mouseX,mouseY,this.sizeX,this.sizeY,0,0)){
      this.sizev=max(0.05,this.sizev);
      this.hover = true;
    }else{
      this.hover = false;
    }
    this.sizev/=this.drag;
    this.size=1+(this.size-1)/this.drag;
    this.size+=this.sizev;
    //this.size+=sin(frameCount/20)/50;
    if(rectHit(this.x,this.y,mouseX,mouseY,this.sizeX,this.sizeY,0,0)&&!this.last&&mouseIsPressed){
      this.last = true;
      this.clicked = true;
      this.clicks++;
      this.state=!this.state;
      this.sizev=this.sizev+=0.1;
    }else{
      this.clicked = false;
    }
    if(!rectHit(this.x,this.y,mouseX,mouseY,this.sizeX,this.sizeY,0,0)||!mouseIsPressed){
      this.last = false;
    }
    if(rectHit(this.x,this.y,mouseX,mouseY,this.sizeX,this.sizeY,0,0)&&mouseIsPressed){
      this.held = true;
      this.heldFor++;
      this.sizev=max(0.08,this.sizev);
    }else{
      this.held = false;
      this.heldFor = 0;
    }
  }
}

/*
//rectHit function example
//returns whether or not two rectangles are colliding
//Credit to Hanson for Empty Console

function draw(){
  if(rectHit(200,300,250,500,30,80,100,300)){
  //first value is the middle x position of the first rectangle, second value is the middle y position of the first rectangle, third value is the middle x position of the second rectange, fourth value is the middle y position of the second rectangle, fifth value is the width of the first rectangle, sixth value is the height of the first rectange, seventh value is the width of the second rectangle, eight value is the height of the second rectangle
    print("hitting")
  }
}
*/

function rectHit(x,y,x2,y2,xs,ys,xs2,ys2){
  return(abs(x-x2)<xs/2+xs2/2&&abs(y-y2)<ys/2+ys2/2);
}