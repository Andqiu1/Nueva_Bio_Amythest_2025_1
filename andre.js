// Electron Transport Chain Simulation for andre.js

var waterCount = 0

// ETC State Variables
var etcState = {
  initialized: false,
  proteinComplexes: [],
  electrons: [],
  protons: [],
  atpMolecules: [],
  oxygenMolecules: [],
  waterMolecules: [],
  nadh: [],
  fadh2: [],
  atpSynthase: null,
  membraneY: 0,
  matrixY: 0,
  intermembraneY: 0,
  protonGradient: 0,
  atpCount: 0,
  electronCount: 0,
  timeCounter: 0,
  paused: false
};

function initializeETC() {
  etcState.initialized = true;
  etcState.membraneY = height * 0.5;
  etcState.matrixY = height * 0.7;
  etcState.intermembraneY = height * 0.3;
  
  // Create 4 protein complexes in the membrane
  let totalWidth = width - 300; // Leave space on both sides
  let spacing = totalWidth / 5;
  for (let i = 0; i < 4; i++) {
    etcState.proteinComplexes.push({
      x: 150 + spacing * (i + 1),
      y: etcState.membraneY,
      width: 80,
      height: 100,
      active: false,
      type: i + 1,
      electronQueue: []
    });
  }
  
  // ATP Synthase on the far right with more spacing
  etcState.atpSynthase = {
    x: width - 100,
    y: etcState.membraneY,
    width: 60,
    height: 120,
    rotation: 0,
    active: false
  };
  
  // Starting NADH and FADH2
  for (let i = 0; i < 3; i++) {
    etcState.nadh.push({
      x: 80,
      y: etcState.matrixY + random(-20, 20),
      size: 30,
      hasElectrons: true,
      moving: false,
      targetComplex: 0
    });
  }
  
  etcState.fadh2.push({
    x: 80,
    y: etcState.matrixY + 40,
    size: 30,
    hasElectrons: true,
    moving: false,
    targetComplex: 1
  });
}

function andre() {
  if (!etcState.initialized) {
    initializeETC();
  }
  
  etcState.timeCounter++;
  

  
  // Draw membrane
  drawMembrane();
  
  // Draw protein complexes
  drawProteinComplexes();
  
  // Draw ATP Synthase
  drawATPSynthase();
  
  // Update and draw all molecules
  updateNADH();
  updateFADH2();
  updateElectrons();
  updateProtons();
  updateOxygen();
  updateWater();
  updateATP();
  
  
  
  // Auto-generate NADH/FADH2 periodically
  if (!etcState.paused && etcState.timeCounter % 180 == 0) {
    if (etcState.nadh.length < 5) {
      etcState.nadh.push({
        x: 50,
        y: etcState.matrixY + random(-30, 30),
        size: 30,
        hasElectrons: true,
        moving: false,
        targetComplex: 0
      });
    }
  }
  
  if (!etcState.paused && etcState.timeCounter % 300 == 0) {
    if (etcState.fadh2.length < 3) {
      etcState.fadh2.push({
        x: 50,
        y: etcState.matrixY + 50,
        size: 30,
        hasElectrons: true,
        moving: false,
        targetComplex: 1
      });
    }
  }
  
  // Auto-add oxygen - much more frequently
  if (!etcState.paused/* && etcState.timeCounter % 15 == 0*/) {
    if (etcState.oxygenMolecules.length < 20) {
      etcState.oxygenMolecules.push({
        x: etcState.proteinComplexes[3].x + random(80, 150),
        y: etcState.matrixY + random(-40, 40),
        size: 25,
        vx: random(-0.5, 0.5),
        vy: random(-0.5, 0.5)
      });
    }
  }
    // Draw compartment labels and backgrounds
  drawCompartments();
  // Draw UI elements
  drawInfoPanel();
  drawControls();
}

function drawCompartments() {
  // Intermembrane space (top)
  push();
  fill(100, 150, 200, 30);
  noStroke();
  rect(0, 0, width, etcState.membraneY - 50);
  
  fill(255);
  textSize(16);
  textAlign(LEFT);
  text("Intermembrane Space", 20, 30);
  text("H+ Concentration: " + etcState.protons.length, 20, 50);
  pop();
  
  // Matrix (bottom)
  push();
  fill(150, 100, 150, 30);
  noStroke();
  rect(0, etcState.membraneY + 50, width, height);
  
  fill(255);
  textSize(16);
  textAlign(LEFT);
  text("Mitochondrial Matrix", 20, etcState.membraneY + 100);
  pop();
}

function drawMembrane() {
  push();
  fill(80, 60, 40);
  noStroke();
  rect(0, etcState.membraneY - 50, width, 100);
  
  // Membrane texture
  for (let i = 0; i < 50; i++) {
    fill(100, 80, 60, 30);
    ellipse(random(width), etcState.membraneY + random(-40, 40), random(5, 15));
  }
  
  fill(255);
  textSize(14);
  textAlign(CENTER, CENTER);
  text("Inner Mitochondrial Membrane", width/8, etcState.membraneY);
  pop();
}

function drawProteinComplexes() {
  for (let i = 0; i < etcState.proteinComplexes.length; i++) {
    let complex = etcState.proteinComplexes[i];
    
    push();
    translate(complex.x, complex.y);
    
    // Complex body
    if (complex.active) {
      fill(255, 150, 50, 200);
    } else {
      fill(100, 100, 150, 200);
    }
    stroke(255);
    strokeWeight(2);
    rect(-complex.width/2, -complex.height/2, complex.width, complex.height, 10);
    
    // Label
    fill(255);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text("Complex " + complex.type, 0, 0);
    
    // Activity indicator
    if (complex.active) {
      fill(255, 200, 0);
      ellipse(0, -complex.height/2 - 10, 10, 10);
    }
    
    pop();
  }
}

function drawATPSynthase() {
  let synthase = etcState.atpSynthase;
  
  push();
  translate(synthase.x, synthase.y);
  
  // Membrane portion
  fill(150, 100, 200, 200);
  stroke(255);
  strokeWeight(2);
  rect(-synthase.width/2, -synthase.height/2, synthase.width, synthase.height, 10);
  
  // Rotating head
  rotate(synthase.rotation);
  fill(255, 150, 200);
  ellipse(0, 0, 40, 40);
  stroke(255);
  strokeWeight(3);
  line(0, 0, 15, 0);
  line(0, 0, -10, 10);
  line(0, 0, -10, -10);
  
  pop();
  
  push();
  fill(255);
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text("ATP\nSynthase", synthase.x-70, synthase.y );
  pop();
}

function updateNADH() {
  for (let i = etcState.nadh.length - 1; i >= 0; i--) {
    let nadh = etcState.nadh[i];
    
    // Draw NADH
    push();
    if (nadh.hasElectrons) {
      fill(255, 100, 100);
    } else {
      fill(150, 150, 150);
    }
    stroke(255);
    strokeWeight(2);
    ellipse(nadh.x, nadh.y, nadh.size);
    
    fill(255);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text(nadh.hasElectrons ? "NADH" : "NAD+", nadh.x, nadh.y);
    pop();
    
    if (etcState.paused) continue;
    
    // Move toward Complex I
    if (nadh.hasElectrons && !nadh.moving && etcState.timeCounter % 60 == 0) {
      nadh.moving = true;
    }
    
    if (nadh.moving) {
      let target = etcState.proteinComplexes[nadh.targetComplex];
      let dx = target.x - nadh.x;
      let dy = target.y + 40 - nadh.y;
      let dist = sqrt(dx*dx + dy*dy);
      
      if (dist > 5) {
        nadh.x += dx / dist * 2;
        nadh.y += dy / dist * 2;
      } else {
        // Deliver electrons
        if (nadh.hasElectrons) {
          nadh.hasElectrons = false;
          nadh.moving = false;
          
          // Create electron
          etcState.electrons.push({
            x: nadh.x,
            y: nadh.y,
            size: 8,
            currentComplex: 0,
            targetComplex: 1,
            speed: 1.5
          });
          
          etcState.proteinComplexes[0].active = true;
          etcState.electronCount++;
          
          // Deactivate after a short time
          setTimeout(() => {
            etcState.proteinComplexes[0].active = false;
          }, 500);

          
          // Create protons
          for (let j = 0; j < 2; j++) {
            setTimeout(() => {
              etcState.protons.push({
                x: target.x + random(-20, 20),
                y: target.y,
                size: 12,
                targetY: etcState.intermembraneY,
                pumped: false
              });
            }, j * 300);
          }
        }
        
        // Move back to matrix
        if (!nadh.hasElectrons) {
          nadh.x = 50;
          nadh.y = etcState.matrixY + random(-30, 30);
          nadh.hasElectrons = true;
        }
      }
    }
  }
}

function updateFADH2() {
  for (let i = etcState.fadh2.length - 1; i >= 0; i--) {
    let fadh = etcState.fadh2[i];
    
    // Draw FADH2
    push();
    if (fadh.hasElectrons) {
      fill(100, 255, 100);
    } else {
      fill(150, 150, 150);
    }
    stroke(255);
    strokeWeight(2);
    ellipse(fadh.x, fadh.y, fadh.size);
    
    fill(255);
    noStroke();
    textSize(9);
    textAlign(CENTER, CENTER);
    text(fadh.hasElectrons ? "FADH2" : "FAD", fadh.x, fadh.y);
    pop();
    
    if (etcState.paused) continue;
    
    // Move toward Complex II
    if (fadh.hasElectrons && !fadh.moving && etcState.timeCounter % 90 == 0) {
      fadh.moving = true;
    }
    
    if (fadh.moving) {
      let target = etcState.proteinComplexes[1];
      let dx = target.x - fadh.x;
      let dy = target.y + 40 - fadh.y;
      let dist = sqrt(dx*dx + dy*dy);
      
      if (dist > 5) {
        fadh.x += dx / dist * 2;
        fadh.y += dy / dist * 2;
      } else {
        if (fadh.hasElectrons) {
          fadh.hasElectrons = false;
          fadh.moving = false;
          
          etcState.electrons.push({
            x: fadh.x,
            y: fadh.y,
            size: 8,
            currentComplex: 1,
            targetComplex: 2,
            speed: 1.5
          });
          
          etcState.proteinComplexes[1].active = true;
          etcState.electronCount++;
          
          // Deactivate after a short time
          setTimeout(() => {
            etcState.proteinComplexes[1].active = false;
          }, 500);

        }
        
        if (!fadh.hasElectrons) {
          fadh.x = 50;
          fadh.y = etcState.matrixY + 50;
          fadh.hasElectrons = true;
        }
      }
    }
  }
}

function updateElectrons() {
  for (let i = etcState.electrons.length - 1; i >= 0; i--) {
    let electron = etcState.electrons[i];
    
    // Draw electron
    push();
    fill(255, 255, 0);
    stroke(255, 200, 0);
    strokeWeight(2);
    ellipse(electron.x, electron.y, electron.size);
    
    // Glow effect
    noStroke();
    fill(255, 255, 0, 50);
    ellipse(electron.x, electron.y, electron.size * 2);
    pop();
    
    if (etcState.paused) continue;
    
    // Move to next complex
    if (electron.targetComplex < etcState.proteinComplexes.length) {
      let target = etcState.proteinComplexes[electron.targetComplex];
      let dx = target.x - electron.x;
      let dy = target.y - electron.y;
      let dist = sqrt(dx*dx + dy*dy);
      
      if (dist > 5) {
        electron.x += dx / dist * electron.speed;
        electron.y += dy / dist * electron.speed;
      } else {
        electron.currentComplex = electron.targetComplex;
        electron.targetComplex++;
        
        etcState.proteinComplexes[electron.currentComplex].active = true;
        
        // Pump protons at complexes 0, 2, 3
        if (electron.currentComplex == 0 || electron.currentComplex == 2 || electron.currentComplex == 3) {
          for (let j = 0; j < 2; j++) {
            setTimeout(() => {
              etcState.protons.push({
                x: target.x + random(-20, 20),
                y: target.y,
                size: 12,
                targetY: etcState.intermembraneY,
                pumped: false
              });
            }, j * 200);
          }
        }
        
        setTimeout(() => {
          etcState.proteinComplexes[electron.currentComplex].active = false;
        }, 500);
      }
    } else {
      // Electron reaches oxygen - actively seek it out
      let nearestOxygen = null;
      let minDist = Infinity;
      
      for (let j = 0; j < etcState.oxygenMolecules.length; j++) {
        let oxy = etcState.oxygenMolecules[j];
        let d = dist(electron.x, electron.y, oxy.x, oxy.y);
        if (d < minDist) {
          minDist = d;
          nearestOxygen = j;
        }
      }
      
      if (nearestOxygen !== null) {
        let oxy = etcState.oxygenMolecules[nearestOxygen];
        let dx = oxy.x - electron.x;
        let dy = oxy.y - electron.y;
        let d = sqrt(dx*dx + dy*dy);
        
        // Increased capture range and speed
        if (d > 10) {
          electron.x += dx / d * (electron.speed * 1.5);
          electron.y += dy / d * (electron.speed * 1.5);
        } else {
          // Create water
          etcState.waterMolecules.push({
            x: electron.x,
            y: electron.y,
            size: 20,
            life: 180
          });
          waterCount++
          
          etcState.electrons.splice(i, 1);
          etcState.oxygenMolecules.splice(nearestOxygen, 1);
        }
      } else {
        // No oxygen available - move toward typical oxygen zone
        let targetX = etcState.proteinComplexes[3].x + 120;
        let targetY = etcState.matrixY;
        let dx = targetX - electron.x;
        let dy = targetY - electron.y;
        let d = sqrt(dx*dx + dy*dy);
        
        if (d > 5) {
          electron.x += dx / d * 0.5;
          electron.y += dy / d * 0.5;
        }
      }
    }
  }
}

function updateProtons() {
  for (let i = etcState.protons.length - 1; i >= 0; i--) {
    let proton = etcState.protons[i];
    
    // Draw proton
    push();
    fill(255, 50, 150);
    stroke(255);
    strokeWeight(1);
    ellipse(proton.x, proton.y, proton.size);
    
    fill(255);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text("H+", proton.x, proton.y);
    pop();
    
    if (etcState.paused) continue;
    
    // Pump to intermembrane space
    if (!proton.pumped && proton.y > proton.targetY) {
      proton.y -= 1.5;
      if (proton.y <= proton.targetY) {
        proton.pumped = true;
        proton.floatX = random(-0.5, 0.5);
        proton.floatY = random(-0.5, 0.5);
      }
    }
    
    // Float in intermembrane space
    if (proton.pumped) {
      proton.x += proton.floatX;
      proton.y += proton.floatY;
      
      // Proton-proton repulsion
      for (let j = 0; j < etcState.protons.length; j++) {
        if (i !== j && etcState.protons[j].pumped) {
          let other = etcState.protons[j];
          let dx = proton.x - other.x;
          let dy = proton.y - other.y;
          let d = sqrt(dx*dx + dy*dy);
          
          // Repel if too close
          if (d < 120 && d > 0) {
            let force = sqrt((120 - d)*(120 - d))/120 * 5;
            proton.x += (dx / d) * force;
            proton.y += (dy / d) * force;
          }
        }
      }
      
      // Keep protons in bounds
      let margin = proton.size;
      if (proton.x < margin) {
        proton.x = margin;
        proton.floatX = abs(proton.floatX);
      }
      if (proton.x > width - margin) {
        proton.x = width - margin;
        proton.floatX = -abs(proton.floatX);
      }
      if (proton.y < margin) {
        proton.y = margin;
        proton.floatY = abs(proton.floatY);
      }
      if (proton.y > etcState.membraneY - 50) {
        proton.y = etcState.membraneY - 50;
        proton.floatY = -abs(proton.floatY);
      }
      
      // Attracted to ATP Synthase - reduced threshold for activation
      if (etcState.protons.length > 3) {
        let dx = etcState.atpSynthase.x - proton.x;
        let dy = etcState.atpSynthase.y - 40 - proton.y;
        let d = sqrt(dx*dx + dy*dy);
        
        // Increased attraction range and speed - overrides repulsion when close
        if (d < 700) {
          let attractForce = 0.6 * max(0.5, sqrt((490000 - (d*d)))/700); // Stronger attraction
          let attractX = dx / d * attractForce;
          let attractY = dy / d * attractForce;
          
          // Override float velocities near ATP synthase
          proton.x += attractX;
          proton.y += attractY;
          
          // Much larger capture radius
          if (d < height/20) {
            // Proton goes through ATP Synthase
            proton.y = etcState.matrixY - 80;
            proton.pumped = false;
            etcState.atpSynthase.active = true;
            etcState.atpSynthase.rotation += 30;
            
            // Create ATP
            etcState.atpMolecules.push({
              x: etcState.atpSynthase.x,
              y: etcState.atpSynthase.y + 60,
              size: 25,
              life: 200,
              vx: random(-1, 1),
              vy: random(0.5, 1.5)
            });
            
            etcState.atpCount++;
            etcState.protons.splice(i, 1);
          }
        }
      }
    }
  }
}

function updateOxygen() {
  for (let i = 0; i < etcState.oxygenMolecules.length; i++) {
    let oxy = etcState.oxygenMolecules[i];
    
    // Draw oxygen
    push();
    fill(100, 200, 255);
    stroke(255);
    strokeWeight(2);
    ellipse(oxy.x, oxy.y, oxy.size);
    ellipse(oxy.x + 8, oxy.y, oxy.size * 0.8);
    
    fill(255);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text("O2", oxy.x + 4, oxy.y);
    pop();
    
    if (!etcState.paused) {
      oxy.x += oxy.vx;
      oxy.y += oxy.vy;
      
      // Boundary check
      if (oxy.x < 0 || oxy.x > width) oxy.vx *= -1;
      if (oxy.y < etcState.membraneY + 50 || oxy.y > height) oxy.vy *= -1;
    }
  }
}

function updateWater() {
  for (let i = etcState.waterMolecules.length - 1; i >= 0; i--) {
    let water = etcState.waterMolecules[i];
    
    // Draw water
    push();
    fill(150, 220, 255, map(water.life, 0, 180, 50, 200));
    stroke(255, map(water.life, 0, 180, 50, 200));
    strokeWeight(1);
    ellipse(water.x, water.y, water.size);
    
    fill(255, map(water.life, 0, 180, 100, 255));
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text("H2O", water.x, water.y);
    pop();
    
    water.life--;
    if (water.life <= 0) {
      etcState.waterMolecules.splice(i, 1);
    }
  }
}

function updateATP() {
  for (let i = etcState.atpMolecules.length - 1; i >= 0; i--) {
    let atp = etcState.atpMolecules[i];
    
    // Draw ATP
    push();
    fill(255, 200, 0, map(atp.life, 0, 200, 100, 255));
    stroke(255, 150, 0);
    strokeWeight(2);
    
    // ATP symbol (three circles)
    for (let j = 0; j < 3; j++) {
      ellipse(atp.x + j * 8, atp.y, 10);
    }
    
    fill(0);
    noStroke();
    textSize(9);
    textAlign(CENTER, CENTER);
    text("ATP", atp.x + 8, atp.y);
    pop();
    
    if (!etcState.paused) {
      atp.x += atp.vx;
      atp.y += atp.vy;
      atp.life--;
    }
    
    if (atp.life <= 0) {
      etcState.atpMolecules.splice(i, 1);
    }
  }
}

function drawInfoPanel() {
  push();
  fill(0, 0, 0, 180);
  noStroke();
  rect(10, height - 120, 250, 110, 10);
  
  fill(255);
  textSize(14);
  textAlign(LEFT);
  text("Electron Transport Chain", 20, height - 100);
  textSize(12);
  text("Electrons: " + etcState.electronCount, 20, height - 75);
  text("ATP Produced: " + etcState.atpCount, 20, height - 55);
  text("H+ Gradient: " + etcState.protons.length, 20, height - 35);
  text("Water Made: " + waterCount, 20, height - 15);
  pop();
}

function drawControls() {
  push();
  fill(0, 0, 0, 180);
  noStroke();
  rect(width - 210, height - 80, 200, 70, 10);
  
  fill(255);
  textSize(12);
  textAlign(LEFT);
  text("Click to " + (etcState.paused ? "Resume" : "Pause"), width - 200, height - 55);
  text("Oxygen enters automatically", width - 200, height - 35);
  pop();
  
  // Pause button
  if (mouseIsPressed && mouseX > width - 210 && mouseX < width - 10 && 
      mouseY > height - 80 && mouseY < height - 10) {
    etcState.paused = !etcState.paused;
  }
}
