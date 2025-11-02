
let zoeIntro
let zoeInstructions
let zoeSceneIAmInevitable = 1
let zoeCollisionA
let zoeCollisionB
let zoeCollisionC
let zoePhotonDint


class zoeTextBox {
  constructor(lines, requiredAction) {
    this.lines = lines;
    this.currentIndex = 0;
    this.visible = true;
    this.requiredAction = requiredAction;
  }

  draw() {
    if (this.visible == true) {
      fill(0, 0, 0, 50);
      stroke(255, 255, 255);
      rect(10, 10, 780, 100, 10);

      textSize(20);
      fill(255, 255, 255);
      text(this.lines[this.currentIndex], 20, 30);
    }
  }

  nextLine() {
    if (this.currentIndex < this.lines.length - 1) {
      this.currentIndex++;
    } else {
      this.visible = false;
      zoeSceneIAmInevitable += 1
      // zoeScene ++
      console.log("Scene: " + zoeSceneIAmInevitable)
    }
    if (zoeSceneIAmInevitable == 2) {
        // Draw Photons
    zoePhotonDint = new object("photon", 35, 140, 30, 30, true, [
      255,
      255,
      0,
    ]);
    objects.push(zoePhotonDint)
    }
  }
  
  keyPressed() {
    console.log("A key was pressed. Which one was it?????")
    if (this.requiredAction == "space" && key == " ") {
      console.log("space key pressed!");
      
      if (zoeSceneIAmInevitable == 1 ) {
        zoeIntro.nextLine();
      } 
    }
  }
}



function zoeSetup() {
  
  noStroke()
  
  // Draw the phospholipids
  for (let i = 0; i < 800; i += 40) {
    console.log("phospholipids drawn");
    objects[objects.length] = new object(
      "phospholipid",
      i,
      400,
      40,
      80,
      false,
      [255, 0, 0]
    );
  }

  for (i = 0; i < 800; i += 40) {
    console.log("phospholipids drawn");
    objects[objects.length] = new object(
      "phospholipid",
      i,
      500,
      40,
      80,
      false,
      [255, 0, 0]
    );
  }

  // Draw photosystems

  objects[objects.length] = new object("PSII", 100, 450, 150, 200, false, [
    0,
    255,
    0,
  ]);

  objects[objects.length] = new object("PSI", 500, 450, 150, 200, false, [
    0,
    255,
    0,
  ]);
  
  // Draw protein complexes
  
  objects[objects.length] = new object("Channel Protein", 300,450,100,200,false,[255,0,255])
  objects[objects.length] = new object("ETC1", 180,400,50,50,false,[76, 150, 224])
  objects[objects.length] = new object("ETC2", 360,500,50,50,false,[76, 150, 224])
  objects[objects.length] = new object("ETC3", 600,400,50,50,false,[76,150,224])
  
  // ATP synthase
  
  objects[objects.length] = new object("Channel Protein", 725,450,100,250,false,[255,0,255]);
  
  zoeIntro = new zoeTextBox([
    "WELCOME USER\n:)",
    "This is the first stage of photosynthesis, the light dependent reactions!",
    "In the light dependent reactions, photons from the sunlight energy are taken in by organelles\n in the plant's cells called chloroplasts. The reactants, or inputs, of the reaction is sunlight,\n and the products, or outputs, of the reaction are oxygen in the form of O2, NADPH, which is \nan electron carrier, and ATP, an energy currency for the plant.","Photons from the sun come and hit the photosystems, which excites electrons. Those electrons\n then go through an electron transport chain, using energy to pump hydrogen ions against their\n gradient. After that, the electrons go in NADP+ with H+, which makes NADPH. The H+ ions \ngo through the ATP synthase, which rotates and uses that energy to make ATP."
  ],"space");
  // let textboxzoeTextbox([":) :) :) :) :)", ":O :O :O :O :O :O", ":D :D :D :D :D"])
    
      
    zoeInstructions = new zoeTextBox(["First, the energy from the sun shoots into photosystem II.", "Drag the photon to photosystem II."],"Photon collides with PSII")


  
}

function zoe() {
  if (zoeSceneIAmInevitable == 1) {
    zoeIntro.draw()
  } else if (zoeSceneIAmInevitable == 2) {
    zoeInstructions.draw()
    
    for (var i = 0; i<objects.length;i++) {
    if (objects[i].type == "PSII") {
      zoeDetectCollision(objects[i],zoePhotonDint)
    }
  }
    
  }
  
   
   
  
}

function keyPressed() {
  
  zoeIntro.keyPressed()
  zoeInstructions.keyPressed()
}

function zoeDetectCollision(object1,object2) {
  console.log('Detecting collision between: ' + object1 + ' and: ' + object2);
  zoeCollisionA = pow(object2.x - object1.x, 2);
  zoeCollisionB = pow(object2.y - object1.y, 2);
  zoeCollisionC = Math.sqrt(zoeCollisionA + zoeCollisionB);
  
  if (zoeCollisionC < (object1.sizeX + object1.sizeY)/4 + (object2.sizeX + object2.sizeY)/4) {
    console.log('!*!*@*#@#*@!!!!!!! Collision imminent: ' + object1 + " collided with " + object2)
  }
}
