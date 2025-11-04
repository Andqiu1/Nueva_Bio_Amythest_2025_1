//credit to handosn for minor debuging
var objects = [];
// var screen = 0;
var click;
var phosphorylated = false;
var phospho = 0;
let px = 0;        
let py = 0;        
let vx = 5;       
let vy = -15;     
let gravity = 0.5;

function leoSetup(){
  createCanvas(800, 600);

  button = createButton("Phosphorylation");
  button.position(20, 20);
  button.mousePressed(startPhosphorylation); // call function on click
  button.style("font-size", "24px");
  button.style("padding","15px")
  button.style("border-radius", "10px");
  
  // Glucose
  objects[objects.length] = new object(
    "Glucose",
    100, // x
    300, // y
    100,  // width
    100,  // height
    true,// draggable
    [255, 0, 0], // color
    true,
    0
  );

  // ATP
  objects[objects.length] = new object(
    "ATP",
    600, 
    320, 
    120,  
    100,  
    true,
    [],
    true,
    0
  );
  
  objects[objects.length] = new object(
    "ATP",
    650, 
    220, 
    120,  
    100,  
    true,
    [],
    true,
    0
  );
  
  objects[objects.length] = new object(
    "ADP",
    200, 
    400,
    100,  
    100,  
    true,
    [],
    true,
    0
  );
  
  objects[objects.length] = new object(
    "Phosphate group",
    400, // x
    200, // y
    40,  // width
    40,  // height
    true,// draggable
    [0, 255, 0], // color
    true,
    0
  );
}

function startPhosphorylation(){
  phosphorylated = true; 
}
  
function leo(){
  background(220)
  var glucose = objects[0];
  var atp1 = objects[1];
  var atp2 = object[2];
  var adp = object[3];
  var phosphate = object[4]

  if (phosphorylated == true){
    let d1 = dist(atp1.x, atp1.y, glucose.x, glucose.y);
    let d2 = dist(objects[2].x, objects[2].y, glucose.x, glucose.y);
    
    if (d1 > 80){
      atp1.x += (glucose.x - atp1.x) * 0.05;
      atp1.y += (glucose.y - atp1.y) * 0.05;
    }
    else{
      glucose.x = atp1.x+70
      //glucose.particleColor = [0, 0, 255]; 
      //atp1.particleColor = [0,255,50];
    }
    if (d2 > 90){
      objects[2].x += (glucose.x - objects[2].x) * 0.05;
      objects[2].y += (glucose.y - objects[2].y) * 0.05;
    }
    else{
      objects[2].x=glucose.x+75
      objects[2].y=glucose.y+2
      phospho = 1
    }
    
    if (phospho == 1){
      
    }
  }
  if (phosphorylated){
    push();
    textSize(50);
    fill("orange");
    stroke("red");
    strokeWeight(5);
    text("Phosphorylation!",300, 100);
    pop();
  }
}