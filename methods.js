function runObjects(){
  for(var i=0;i<objects.length;i++){
    objects[i].work()
  }
}

class object{
  constructor(a,b,c,d,e,f,g){
    this.type=a
    this.x=b
    this.y=c
    this.sizeX=d
    this.sizeY=e
    this.dragging=false
    this.clicks=0
    this.mouseOffsetX=0
    this.mouseOffsetY=0
    this.preX=a
    this.preY=b
    this.draggable=f
    this.particleColor=g //if this is set to [], no particles. For particles, it has to be a list of three colors(can be "random")
    // print("wsg")
  }
  display(){
    // print(this.particleColor)
    push()
    imageMode(CENTER)
    // image("molecule",this.x,this.y,this.sizeX,this.sizeY)
    ellipseMode(CENTER)
    fill("white")
    stroke("black")
    ellipse(this.x,this.y,this.sizeX,this.sizeY)
    pop()
  }
  work(){
    
    this.drag()
    this.click()
    this.display()
    this.preY=this.y
    this.preX=this.x
  }
  drag(){
    // print(mouseIsPressed)
    if(rectHit(this.x,this.y,mouseX,mouseY,this.sizeX,this.sizeY,0.5,0.5) && mouseIsPressed && !this.dragging && this.draggable){
      this.dragging=true
      this.mouseOffsetX=this.x-mouseX
      this.mouseOffsetY=this.y-mouseY
    }
    if(this.dragging && !mouseIsPressed){
      this.dragging=false
      
    }
    if(this.dragging && ((this.x==this.preX)||(this.y==this.preY))){
        this.x=pmouseX+this.mouseOffsetX
      this.y=pmouseY+this.mouseOffsetY
      if(this.particleColor != []){
        // print("particle")
        // print(this.particleColor)
        particleShower(this.x, this.y, 30, 5, max(this.sizeX,this.sizeY)*0.9, 0, sqrt((abs(this.x-this.preX))^2+(abs(this.y-this.preY))^2), 0.9, 0.99, 0.85, 0.87, this.particleColor[0],this.particleColor[1],this.particleColor[2], 15,29)
      }
      
      
    }
    
  }
  click(){
    if(rectHit(this.x,this.y,mouseX,mouseY,this.sizeX,this.sizeY,0.5,0.5) && mouseClick){
      this.clicks+=1
      particleShower(this.x, this.y, 100, 3, 15, 0, 4, 0.9, 0.99, 0.85, 0.87, this.particleColor[0],this.particleColor[1],this.particleColor[2], 10,20)
    }
  }
}

function runParticles(){
  for(var i=0;i<particles.length;i++){
    particles[i].work()
  }
  killParticles()
}

function particleShower(x,y,number,dMin,dMax,vMin,vMax,speedRatioMin,speedRatioMax,sizeRatioMin,sizeRatioMax,r,g,b,lifespanMin,lifespanMax){
  for(var i=0;i<number;i++){
    var velocity=random(vMin,vMax)
    var diameter=random(dMin,dMax)
    var angle=random(0,360)
    var xSpeed=cos(angle)*velocity
    var ySpeed=sin(angle)*velocity
    var speedRatio=random(speedRatioMin,speedRatioMax)
    var sizeRatio=random(sizeRatioMin,sizeRatioMax)
    var R=r
    var G=g
    var B=b
    if(r=="random"){
      R=random(0,255)
    }
    if(g=="random"){
      G=random(0,255)
    }
    if(b=="random"){
      B=random(0,255)
    }
    var lifespan=random(lifespanMin,lifespanMax)
    particles[particles.length]=new particle(x,y,diameter,xSpeed,ySpeed,speedRatio,sizeRatio,R+random(-80,80),G+random(-80,80),B+random(-80,80),lifespan)
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
  constructor(a,b,c,d,e,f,g,h,i,j,k){
    this.x=a
    this.y=b
    this.diameter=c
    this.xSpeed=d
    this.ySpeed=e
    this.speedRatio=f
    this.sizeRatio=g
    this.r=h //(r,g,b)
    this.g=i
    this.b=j
    this.lifespan=k
    this.ogLifespan=k
    this.opacity=80
  }
  display(){
    push()
    fill(this.r,this.g,this.b,this.opacity)//might be weird
    // fill("red")
    noStroke()
    ellipseMode(CENTER)
    ellipse(this.x,this.y,this.diameter)
    // ellipse(this.x,this.y,100)
    pop()
  }
  work(){
    this.x+=this.xSpeed + random(-0.05*this.xSpeed,0.05*this.xSpeed)
    this.y+=this.ySpeed + random(-0.05*this.ySpeed,0.05*this.ySpeed)
    this.xSpeed*=this.speedRatio
    this.ySpeed*=this.speedRatio
    // this.diameter*=this.sizeRatio
    this.opacity=(this.lifespan/this.ogLifespan)*100
    this.lifespan-=1
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