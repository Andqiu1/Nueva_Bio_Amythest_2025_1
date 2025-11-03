var screen=0
var particles=[]
var mouseClick=false
var objects=[]
var nextBtn;
var nextAnim=[100,1,68]
var nextAnimationSequence=new animation(nextAnim)

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  background(22)
  objects[0]= new object("hi",width/2,height/2,20,20,true,[50,100,70])
  nextBtn= new button(width-150,height-80,185,70)
  textFont("Itim")
}



function draw() {
  background(22);
//   particleDemo();
  
  if(screen==-1){
    start()
  }else if(screen==0){
    zoe()
  }else if(screen==1){
    maren()
  }else if(screen==2){
    avi()
  }else if(screen==3){
    leo()
  }else if(screen==4){
    shaayer()
  }else if(screen==5){
    andre()
  }else if(screen==6){
    conclusion()
  }
  
  
  runParticles()
  runObjects()
  nextAnimationSequence.work()
  nextButtonWork()
  mouseClick=false
}

function mouseClicked(){
  mouseClick=true
}
