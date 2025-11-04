var shaayerScreen=0
var shaayerNextAnimation=new animation([100,1,68])
var shaayerNxtBtn;
var oxalocetateBondingAnimation;

function shaayerSetup(){
  
  objects=[]
  shaayerNxtBtn= new button(width-150,height-80,185,70)
  
  
  
  objects[0]=new object("ATP",width/6,500-30,width/3,width/3,false,[],true,0)
  objects[1]=new object("NADH",width/6*3,500-30,width/3,width/3,false,[],true,0)
  objects[2]=new object("FADH",width/6*5,500-30,width/3,width/3,false,[],true,0)
}

function shaayer(){
  if(shaayerScreen==0){
    push()
    fill("white")
    textSize(40)
    textAlign(CENTER)
    text("The krebs cycle is a critical part of cellular\nrespiration. It completes the breakdown of\nglucose in order to produce high energy\nmolcules and energy carriers such as:",width/2,100)
    objects[0].rotation=(cos(frameCount*2.5)*15)
    text("ATP",width/6,650)
    objects[1].rotation=(cos(frameCount*2.5)*15)
    text("NADH",width/6*3,650)
    objects[2].rotation=(cos(frameCount*2.5)*15)
    text("FADH₂",width/6*5,650)
    pop()
    shaayerNextButton()
  }else if(shaayerScreen==1){
    //Acetyl CoA bonds with oxalocetate and water through citrate synthase. This creates CoA and Citrate
  }
  
  // shaayerNextButton()
  shaayerNextButtonWork()
  shaayerNextAnimation.work()
}


function shaayerNextButtonWork(){
  if(shaayerNextAnimation.running && shaayerNextAnimation.count>0){
    shaayerNextAnimation.count+=1
    if(shaayerNextAnimation.currentStage==0){
      // print("happening")
      push()
      ellipseMode(CENTER)
      fill("green")
      // fill(random(0,255),random(0,255),random(0,255),random(0,255))
      ellipse(width/2,height/2,shaayerNextAnimation.count*max(width,height)/shaayerNextAnimation.stages[0]*1.5)
      pop()
    }else if(shaayerNextAnimation.currentStage==1){
      // print("Second")
      shaayerScreen+=1
      objects=[]
      push()
      ellipseMode(CENTER)
      fill("green")
      // fill(random(0,255),random(0,255),random(0,255),random(0,255))
      ellipse(width/2,height/2,shaayerNextAnimation.count*max(width,height)/shaayerNextAnimation.stages[0]*1.5)
      pop()
    }else if(shaayerNextAnimation.currentStage==2){
      // print("third")
      // print("2")
      push()
      ellipseMode(CENTER)
      fill("green")
      // fill(random(0,255),random(0,255),random(0,255),random(0,255))
      ellipse(width/2,height/2,max(width,height)*1.5-((shaayerNextAnimation.count-shaayerNextAnimation.stages[0]-shaayerNextAnimation.stages[1])*max(width,height)/shaayerNextAnimation.stages[2])*1.5)
      pop()
    }
  }
}

function shaayerNextButton(){
  push()
  translate(shaayerNxtBtn.x,shaayerNxtBtn.y)
  rectMode(CENTER)
  fill("black")
  strokeWeight(10)
  stroke("white")
  if(shaayerNxtBtn.hover){
    shaayerNxtBtn.sizev=max(0.05,shaayerNxtBtn.sizev);
    scale(shaayerNxtBtn.size,shaayerNxtBtn.size);
  }else{
    shaayerNxtBtn.sizev=min(0.01,shaayerNxtBtn.sizev)
    scale(shaayerNxtBtn.size,shaayerNxtBtn.size)
  }
  rect(0,0,shaayerNxtBtn.sizeX,shaayerNxtBtn.sizeY,5)
  textAlign(CENTER)
  textSize(50)
  fill("white")
  noStroke()
  rotate(cos(frameCount*2)*5)
  text("NEXT",0,12,shaayerNxtBtn.sizeX,shaayerNxtBtn.sizeY)
  pop()
  shaayerNxtBtn.work()
  if(shaayerNxtBtn.clicked){
     shaayerNextAnimation.running=true
    shaayerNextAnimation.count+=1
  }
}

function shaayerSetupScreens(){
  if(shaayerScreen==1){
    objects=[]
    oxalocetateBondingAnimation=[70,1,70] //inputs come together, pause, outputs come out
    // objects[0]=new object("Oxyloacetate")
    
  }
}