var marenCarbonFixation=[200,1,20]
//two molecules up to middle enzyme, delete and break, two move out
var carbonFixationAnimation=new animation(marenCarbonFixation)
var substage1 = 0
function marenSetup(){
  background("white")
  objects[objects.length]=new object(
    "CO2",
    width/28,
    height/2,
    50,
    50,
    false,
    true,
    [250, 70, 70],
    0)
   objects[objects.length]=new object(
     "RUBP",
     width/1.5,
     height/1.5,
     50,
     50,
     false,
     true,
     [10,40,40],
     0)
    objects[objects.length]=new object("Rubisco", width/3,height/4.5,80,80,false,true,[250,50,50],0)
  carbonFixationAnimation.running=true

}



function maren(){
  background("white")
  if(carbonFixationAnimation.running==true){
    if(carbonFixationAnimation.currentStage==0){
      var obj1 = objects[0]
      var obj2 = objects[1]
      var obj3 = objects[2]
      var d1 = sqrt(((obj3.x - obj1.x)*(obj3.x - obj1.x)) + ((obj3.y - obj1.y)*(obj3.y - obj1.y)))
      var d2 = sqrt(((obj3.x - obj2.x)*(obj3.x - obj2.x)) + ((obj3.y - obj2.y)*(obj3.y - obj2.y)))
      if(d1>=60){
        objects[0].x += (obj3.x - obj1.x)/60
        objects[0].y += (obj3.y - obj1.y)/60
      }
      if(d2>=60){
        objects[1].x += (obj3.x - obj2.x)/60
        objects[1].y += (obj3.y - obj2.y)/60
      }
      if(d1 <= 60 && d2 <= 60){
        if(substage1 == 0){
          objects[2].type="3PG"
        objects[0].type = "ATP"
        objects[0].x = width/28
        objects[0].y = height/2
        objects[1].type = "NADH"
        objects[1].x = width/1.5
        objects[1].y = height/1.5
          substage1 = 1
        }
        else if(substage1 == 1){
          objects[2].type = "G3P"
          objects[0].working = false;
          objects[1].working = false;
        }
      }
    }
  }
}
