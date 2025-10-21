function particleShower(x,y,number,dMin,dMax,vMin,vMax,speedRatioMin,speedRatioMax,sizeRatioMin,sizeRatioMax,color1,lifespan){
  for(var i=0;i<number;i++){
    var velocity=random(vMin,vMax)
    var diameter=random(dMin,dMax)
    var angle=random(0,360)
    var xSpeed=cos(angle)*velocity
    var ySpeed=sin(angle)*velocity
    var speedRatio=random(speedRatioMin,speedRatioMax)
    particles[particles.length]=new particle(x,y,diameter,xSpeed,ySpeed,speedRatio,color1,lifespan)
  }
}

function killParticles(){
  for(var i=0;i<particles.length;i++){
    if(particles[i].lifespan<=0){
      particles.splice(i,1)
      i--
    }
  }
}

class particle{
  constructor(a,b,c,d,e,f,g,h,i){
    this.x=a
    this.y=b
    this.diameter=c
    this.xSpeed=d
    this.ySpeed=e
    this.speedRatio=f
    this.sizeRatio=g
    this.color1=h //(r,g,b)
    this.lifespan=i
    this.ogLifespan=i
    this.opacity=255
  }
  display(){
    push()
    fill(this.color1,opacity)//might be weird
    noStroke()
    ellipseMode(CENTER)
    ellipse(this.x,this.y,this.diameter)
    pop()
  }
  work(){
    this.x+=xSpeed + random(-0.05*xSpeed,0.05*xSpeed)
    this.y+=ySpeed + random(-0.05*ySpeed,0.05*ySpeed)
    this.xSpeed*=this.speedRatio
    this.ySpeed*=this.speedRatio
    this.diameter*=this.sizeRatio
    this.opacity=(lifespan/ogLifespan)*255
    this.lifeSpan-=1
    this.display()
    this.isDead()
  }
  isDead(){
    if(this.diameter<0){
      this.lifespan=-100000
    }
  }
}

//Credit to Hanson
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

//Credit to Hanson
function rectHit(x,y,x2,y2,xs,ys,xs2,ys2){
  return(abs(x-x2)<xs/2+xs2/2&&abs(y-y2)<ys/2+ys2/2);
}