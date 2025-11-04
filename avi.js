var aviscreen = 2;
var screen1textline1 = "Photorespiration is what happens when in the \nCalvin Cycle, Oxygen goes in as an input \ninstead of carbon dioxide, which creates a \nmajor flaw in the photosyntheis. What happens \nis: when photorespiration happens, the plant \ncan no longer produce its 12 3-PGA, only \n6 3-PGA and 6 Phosphoglycolate, a two carbon \nmolecule. The plant has a net -3 carbons ending \nup with 9 carbons instead of 12, which causes \nthe plant to not be able to produce glucose. For \nthe RuBP to regenerate, the plant needs 10 G3P \ncarbons, and with only 9, it cannot regenerate\n its own carbon fixation system, and doesn't \ncome close to the two more carbons needed to \ncreate glucose. This ends up with the plant not \nbeing able to perform photosynthesis."

var avinextButton;



function aviSetup(){
  objects[7] = new object("Glucose",300,370,90,80,true,[105,121, 300], false, 0)
  objects[6] = new object("Rubisco",500,500,90,80,true,[105,121, 300], false, 0)
  objects[5] = new object("Malate",600,250,90,80,true,[105,121, 300], false, 0)
  objects[4] = new object("Oxyloacetate",600,125,90,80,true,[105, 60, 67],false,0) 
  objects[3] = new object("Pyruvate",75,400,90,80,true,[105,60,67], false, 0)
  objects[2] = new object("PEP carboxylase",350,180,90,80,true,[10, 120, 130],false,0)
  objects[1] = new object("CO2", 350, 75, 90, 80, true, [10, 240, 110], false, 0)
  objects[0] = new object( "ATP",75,200,100,80,true,[10, 240, 110],false, 0)
}
function avi() {
  background("white");
  
  avinextButton= new button(690,750,185, 70)
    

  if (aviscreen == 1) {
    
    background("white")
    textSize(35)
    text(screen1textline1, 30, 40)
    avinextBtn()
  }
  
if (aviscreen == 2) {
background("white")
fill(0,255,0,127)
rect(25, 25, 750, 300)
fill(10, 150, 10, 127)
rect(25, 350, 750, 400)
fill("black")
textSize(30)
text("Mesophyll Cell", 580, 60)
text("Bundle-Sheath Cell", 530, 390)
objects[0].working=true
objects[1].working=true
objects[2].working=true
objects[3].working=true
objects[4].working=true
objects[5].working=true
objects[6].working=true
  }
}

function avinextBtn(){
  push()
  translate(avinextButton.x,avinextButton.y)
  rectMode(CENTER)
  fill("black")
  strokeWeight(10)
  stroke("white")
  if(avinextButton.hover){
    avinextButton.sizev=max(0.05,avinextButton.sizev);
    scale(avinextButton.size,avinextButton.size);
  }else{
    avinextButton.sizev=min(0.01,avinextButton.sizev)
    scale(avinextButton.size,avinextButton.size)
  }
  rect(0,0,avinextButton.sizeX,avinextButton.sizeY,5)
  textAlign(CENTER)
  textSize(50)
  fill("white")
  noStroke()
  rotate(cos(frameCount*2)*5)
  text("NEXT",0,12,avinextButton.sizeX,avinextButton.sizeY)
  pop()
  avinextButton.work()
  if(avinextButton.clicked){
   aviscreen+=1
  }
  
}