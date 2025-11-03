let zoeIntro
let zoeSceneIAmInevitable = 1
let zoeCollisionA
let zoeCollisionB
let zoeCollisionC
let zoeTextboxes = []

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
      noStroke()
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
      
    } else if (zoeSceneIAmInevitable == 3) {
      
    } else if (zoeSceneIAmInevitable == 4) {
      // zoeExcitedElectron = new object("excited electron",75,400,30,30,true,[0,0,255],true)
      // objects.push(zoeExcitedElectron)
      // zoeElectron.working = false

    }
  }
  
  keyPressed() {
    console.log("A key was pressed. Which one was it?????")
    if (this.requiredAction == "space" && key == " ") {
      console.log("space key pressed!");
        this.nextLine()
    }
  }
}



function zoeSetup() {
    
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
      [255, 0, 0],
      true
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
      [255,0,0],
      true
    );
  }

  // Draw photosystems

  objects[objects.length] = new object("PSII", 100, 450, 150, 200, false, [
    0,
    255,
    0,
  ],true);

  objects[objects.length] = new object("PSI", 500, 450, 150, 200, false, [
    0,
    255,
    0,
  ],true);
  
  // Draw protein complexes
  
  objects[objects.length] = new object("Channel Protein", 300,450,100,200,false,[255,0,255],true)
  objects[objects.length] = new object("ETC1", 180,400,50,50,false,[76, 150, 224],true)
  objects[objects.length] = new object("ETC2", 360,500,50,50,false,[76, 150, 224],true)
  objects[objects.length] = new object("ETC3", 600,400,50,50,false,[76,150,224],true)
  
  // ATP synthase
  
  objects[objects.length] = new object("ATPSynthase1", 725,450,100,250,false,[255,0,255],true);
  
  // H+ ions
  
  zoeH = new object("H",100,150,30,30,false,[255,0,0],true)
  objects.push(zoeH)
  
  zoeHFromWater = new object("H",60,550,30,30,false,[255,0,0],false)
  zoeHFromWater1 = new object("H",90,550,30,30,false,[255,0,0],false)
  objects.push(zoeHFromWater)
  objects.push(zoeHFromWater1)
  
       // Draw Photons
    zoePhotonDint = new object("photon", 35, 140, 30, 30, true, [
      255,
      255,
      0,
    ],false);
    objects.push(zoePhotonDint)
  
  // Chlorophyll
  
  zoeChlorophyll = new object("chlorophyll",90,430,50,50,false,[0,255,0],true)
  objects.push(zoeChlorophyll)
  
  //Unexcited Electron
  zoeElectron = new object("electron",75,400,30,30,false,[0,0,255],false)
  objects.push(zoeElectron)
  
  zoeElectronFromWater = new object("electron",130,550,30,30,false,[0,0,255],false)
  objects.push(zoeElectronFromWater)
  
  // Excited Electron
  
  zoeExcitedElectron = new object("excited electron",75,400,30,30,true,[0,0,255],false)
  objects.push(zoeExcitedElectron)
  
   // Water
  
  zoeWater = new object("H2O",20,750,50,50,true,[156, 229, 255],false)
  objects.push(zoeWater)
  
  // Oxygen
  
  zoeOxygen = new object("O2",60,575,50,50,false,[208, 230, 238],false)
  objects.push(zoeOxygen)
  
  // ==================================== LOAD TEXTBOXES ====================================
  
  zoeIntro = new zoeTextBox([
    "This is the first stage of photosynthesis, the light dependent reactions! (Space to continue)",
    "In the light dependent reactions, photons from the sunlight energy are taken in by organelles\n in the plant's cells called chloroplasts. The reactants, or inputs, of the reaction is sunlight\n and water, and the products, or outputs, of the reaction are oxygen in the form of O2, NADPH,\n which is a primary electron carrier, and ATP, an energy currency for the plant.","This is the thylakoid membrane. In chloroplasts, there are stacks of disk-shaped things called \nthylakoids. These stacks are called grana. Each thylakoid has a membrane covering it. This is\n the side view of the thylakoid membrane.","Photons from the sun come and hit the photosystems, which excites electrons. Those electrons\n then go through an electron transport chain, using energy to pump hydrogen ions against their\n gradient. After that, the electrons go in NADP+ with H+, which makes NADPH. The H+ ions \ngo through the ATP synthase, which rotates and uses that energy to make ATP."
  ],"space");
  zoeTextboxes.push(zoeIntro)
      
    zoeInstructions1 = new zoeTextBox(["First, the energy from the sun shoots into photosystem II. (Drag the photon)"],"Photon collides with PSII")
  zoeTextboxes.push(zoeInstructions1)
  
  zoeInstructions2 = new zoeTextBox(["Then, the light energy from the photon excites an electron from a chlorophyll molecule, or a\n green pigment inside the photosystem. (Space to continue)","When the electron in the chlorophyll gets excited, it jumps up a level in the chlorophyll\n molecule.","Usually, the electron would go back to its original state and release the energy gained, but\n in the thylakoid membrane, there is a series of proteins that carry the electron in a system \ncalled an electron transport chain."],"space")
  zoeTextboxes.push(zoeInstructions2)

  zoeInstructions3 = new zoeTextBox(["The electrons go from the chlorophyll molecule through a series of complex proteins. One of\n those proteins is the channel protein."],"electron collides with protein")
  zoeTextboxes.push(zoeInstructions3)
  
  zoeInstructions4 = new zoeTextBox(["The energy from the excited electron gets used to pump H+ into the lumen against its \nconcentration gradient.","H+ collides with lumen"])
  zoeTextboxes.push(zoeInstructions4)
  
  zoeInstructions5 = new zoeTextBox(["Water then comes in from the roots of the plants and travels to the leaves using a xylem inside\n the plant's stem.","Water collides with PSII"])
  zoeTextboxes.push(zoeInstructions5)
  
  zoeInstructions6 = new zoeTextBox(["The water gets split by a water-splitting section in the photosystem into one electron, one \noxygen, and 2 hydrogens."],"space")
  zoeTextboxes.push(zoeInstructions6)
  
  zoeInstructions7 = new zoeTextBox(["The H+ ions add to the concentration of H+ ions inside the lumen."],"space")
  zoeTextboxes.push(zoeInstructions7)
  
  zoeInstructions8 = new zoeTextBox(["The oxygen molecule combines with another oxygen molecule (once this cycle has happened\n twice) and leaves the plant through pores in the plant's leaves called stomata."],"space")
  zoeTextboxes.push(zoeInstructions8)
  
  zoeInstructions9 = new zoeTextBox(["The electron goes to replace the lost electron in the chlorophyll."],"space")
  zoeTextboxes.push(zoeInstructions9)
  
  
}
  

function zoe() {
  
  text("Lumen (Thylakoid Space)",300,650)
  text("Stroma(Space inside the Chloroplast)",250,200)
  
  if (zoeSceneIAmInevitable == 1) {
    zoeIntro.draw()
  } else if (zoeSceneIAmInevitable == 2) {
    zoeInstructions1.draw()
    
    zoePhotonDint.working = true
    
    for (var i = 0; i<objects.length;i++) {
    if (objects[i].type == "PSII") {
     if ( zoeDetectCollision(objects[i],zoePhotonDint) == objects[i] + zoePhotonDint) {
       zoeInstructions1.nextLine()
     }
    }
  }
    
  } else if (zoeSceneIAmInevitable == 3) {
    
    zoeElectron.working = true
    zoePhotonDint.working = false
    zoeInstructions2.draw()
   
    
  } else if (zoeSceneIAmInevitable == 4) {
    
   zoeElectron.working = false
    zoeExcitedElectron.working = true
    zoeInstructions3.draw()
    
    
    for (j = 0;j<objects.length;j++) {
      if (objects[j].type == "Channel Protein") {
        if (zoeDetectCollision(objects[j],zoeExcitedElectron) == objects[j] + zoeExcitedElectron) {
          zoeInstructions3.nextLine()
          zoeExcitedElectron.draggable = false
        }
      }
    }
    
    
    
  } else if (zoeSceneIAmInevitable == 5) {
    zoeInstructions4.draw()
    zoeH.draggable = true
    zoeElectron.working = false
    
    
    
     for (m = 0;m<objects.length;m++) {
      if (objects[m].type == "H") {
        if (objects[m].y > 550) {
          console.log("H moved into the lumen")
          zoeInstructions4.nextLine()
        }
      }
    }
    
  } else if (zoeSceneIAmInevitable == 6) {
    zoeInstructions5.draw()
    zoeWater.working = true
    
    for (j = 0;j<objects.length;j++) {
      if (objects[j].type == "PSII") {
        if (zoeDetectCollision(objects[j],zoeWater) == objects[j] + zoeWater) {
          zoeInstructions5.nextLine()
        }
      }
    }
    
  } else if (zoeSceneIAmInevitable == 7) {
    zoeInstructions6.draw()
    zoeWater.working = false
    
    zoeHFromWater.working = true
    zoeHFromWater1.working = true
    zoeOxygen.working = true
    zoeElectronFromWater.working = true
    
  } else if (zoeSceneIAmInevitable == 8) {
    zoeInstructions7.draw()
    
    zoeHFromWater.x = 200
    zoeHFromWater.y = 700
    zoeHFromWater1.x = 450
    zoeHFromWater1.y = 675
    
  } else if (zoeSceneIAmInevitable == 9) {
    
    zoeOxygen.working = false
    zoeInstructions8.draw()
    
  } else if (zoeSceneIAmInevitable == 10) {
    
    zoeElectron.working = true
    zoeElectronFromWater.working = false
    zoeInstructions9.draw()
    
  }
  
   
   
  
}

function keyPressed() {

  zoeTextboxes[zoeSceneIAmInevitable-1].keyPressed()
}

function zoeDetectCollision(object1,object2) {
  console.log('Detecting collision between: ' + object1 + ' and: ' + object2);
  zoeCollisionA = pow(object2.x - object1.x, 2);
  zoeCollisionB = pow(object2.y - object1.y, 2);
  zoeCollisionC = Math.sqrt(zoeCollisionA + zoeCollisionB);
  
  if (zoeCollisionC < (object1.sizeX + object1.sizeY)/4 + (object2.sizeX + object2.sizeY)/4) {
    console.log('!*!*@*#@#*@!!!!!!! Collision imminent: ' + object1 + " collided with " + object2)
    return object1 + object2
  }
}
