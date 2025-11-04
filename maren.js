var marenCarbonFixation=[200,1,20]
//two molecules up to middle enzyme, delete and break, two move out
var carbonFixationAnimation=new animation(marenCarbonFixation)

function marenSetup(){
  objects[objects.length]=new object("CO2",width/28,height/2,50,50,false,[250, 70, 70])
   objects[objects.length]=new object("RUBP", width/1.5,height/1.5,50,50,false,[10,40,40])
    objects[objects.length]=new object("Rubisco", width/3,height/4.5,50,50,false,[250,50,50])
  carbonFixationAnimation.running=true
}



function maren(){
  if(carbonFixationAnimation.running==true){
    if(carbonFixationAnimation.currentStage==0){
      // var changeXTotal=
    }
  }
}