var screen=0
var particles=[]
var mouseClick=false

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES)
  background(22)
}



function draw() {
  background(22);
  particleDemo();
  
  
  
  
  runParticles()
  mouseClick=false
}

function mouseClicked(){
  mouseClick=true
}