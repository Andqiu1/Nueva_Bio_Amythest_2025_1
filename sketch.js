var screen=0
var particles=[]
var mouseClick=false
var objects=[]

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  background(22)
  objects[0]= new object("hi",width/2,height/2,20,20,true,[50,100,70])
}



function draw() {
  background(22);
//   particleDemo();
  
  
  
  
  runParticles()
  runObjects()
  mouseClick=false
}

function mouseClicked(){
  mouseClick=true
}