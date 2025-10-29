let zoetextShown = "hello!";

function zoeTextbox(text) {
  let zoeTextNum = 0;
  console.log(zoeTextNum);

  if (zoeTextNum < text.length) {
    if (keyIsPressed == true && key == " ") {
      colsole.log("space key pressed!");
      zoeTextNum += 1;
    }
    zoetextShown = text[zoeTextNum];
  } else {
    zoetextShown = "";
  }
}

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
  zoeTextbox(["hello!", "welcome to the light dependent reaction!"]);
}

function zoe() {
  fill(255, 255, 255);
  text(zoetextShown, 30, 30);
}
