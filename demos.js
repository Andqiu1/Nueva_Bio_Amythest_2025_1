function particleDemo(){
  /*Arguments: x,y,number,dMin,dMax,vMin,vMax,speedRatioMin,speedRatioMax,sizeRatioMin,sizeRatioMax,r,g,b,lifespanMin,lifespanMax*/
  
  var state=false
  
  if((state && mouseClick)||(!state&&mouseIsPressed)){
     // particleShower(mouseX, mouseY, 50, 10, 13, 1, 2, 0.99, 0.995, 0.6, 0.67, 255,0,0, 200);
    particleShower(mouseX, mouseY, 500, 10, 23, 3, 5, 0.9, 0.99, 0.85, 0.87, "random","random","random", 20,80)
  }
    
}