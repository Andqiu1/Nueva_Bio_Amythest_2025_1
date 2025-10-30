let zoeTextNum = 0;
let zoetextShown = "";
let zoeTextShowingOnScreen = true;
let zoeTextBoxNumber = 1;
let zoeIntro

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
    }
  }
}

// function zoeTextbox(text) {
//   if (zoeTextNum > text.length) {
//     zoetextShown = "";
//     zoeTextShowingOnScreen = false;
//     // zoeTextBoxNumber += 1;
//     zoeTextNum = 0;
//   }
//   zoetextShown = text[zoeTextNum];

//   // console.log(zoeTextBoxNumber)
// }

function zoeSetup() {
  // Draw the phospholipids
  for (let i = 0; i < 800; i += 40) {
    console.log("phospholipids drawn");
    objects[objects.length] = new object(
      "phospholipid",
      i,
      200,
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
      300,
      40,
      80,
      false,
      [255, 0, 0]
    );
  }

  // Draw photosystems

  objects[objects.length] = new object("PSII", 200, 250, 150, 200, false, [
    0,
    255,
    0,
  ]);

  objects[objects.length] = new object("PSI", 600, 250, 150, 200, false, [
    0,
    255,
    0,
  ]);

  // Draw Photons
  objects[objects.length] = new object("photon", 10, 10, 30, 30, true, [
    255,
    255,
    0,
  ]);
  
  
  zoeIntro = new zoeTextBox([
    "WELCOME USER\n:)",
    "This is the first stage of photosynthesis, the light dependent reactions!",
    "In the light dependent reactions, photons from the sunlight energy are taken in by organelles\n in the plant's cells called chloroplasts. The reactants, or inputs, of the reaction is sunlight,\n and the products, or outputs, of the reaction are oxygen in the form of O2, NADPH, which is \nan electron carrier, and ATP, an energy currency for the plant.","Photons from the sun come and hit the photosystems, which excites electrons. Those electrons\n then go through an electron transport chain, using energy to pump hydrogen ions against their\n gradient. After that, the electrons go in NADP+ with H+, which makes NADPH. The H+ ions \ngo through the ATP synthase, which rotates and uses that energy to make ATP."
  ],"space");
  // let textboxzoeTextbox([":) :) :) :) :)", ":O :O :O :O :O :O", ":D :D :D :D :D"])
 
  
  
}

function zoe() {
   zoeIntro.draw()
  
}

function keyPressed() {
  if (key == " ") {
    console.log("space key pressed!");
    // zoeTextNum += 1;
    // console.log(zoeTextNum);
    zoeIntro.nextLine();
  }
}
