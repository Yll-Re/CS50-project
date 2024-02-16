let rna = 0;
let maxRNA = 100;
let membrane = 5;
let membranesCreated = 0;
let dna = 0;
let maxDNA = 100;
let eukaryotic = 10;
let eukaryoticCreated = 0;
let organellesInterval;
let rnaPerSecond=0;
let dnaPerSecond = 0;
let zzero = 0;

const messageLog = document.getElementById('messageLog');

const rnaPS = document.getElementById('rnaPS');

const rnaButton = document.getElementById("rnaButton");
const dnaButton = document.getElementById('dnaButton');
const rnaDisplay = document.getElementById("rnaDisplay");
const dnaDisplay = document.getElementById("dnaDisplay");
const rnaMaxDisplay = document.getElementById("rnaMAX");
const dnaMaxDisplay = document.getElementById("dnaMAX");
const membraneButton = document.getElementById("membraneButton");
const organellesButton = document.getElementById("OrganellesButton");
const NucleusButton = document.getElementById("NucleusButton");
const eukaryoticButton = document.getElementById("EukaryoticButton");
const mitochondriaButton = document.getElementById("MitochondriaButton");
const ReproductionButton = document.getElementById("ReproductionButton");
const PhagocytosisButton = document.getElementById("PhagocytosisButton");
const multicellularButton = document.getElementById("MulticellularButton");
const BilateralSymmetryButton = document.getElementById("BilateralSymmetryButton");
const mammalsButton = document.getElementById("Mammals");
const messageContainer = document.getElementById("messageContainer");
const progressContainer = document.querySelector('.progress-container');
const progressBar = document.getElementById('progressBar');
const buttons = document.querySelectorAll('.defualtButton');
const membraneTooltip = document.getElementById("membraneTooltip")
const EukaryoticTooltip = document.getElementById("EukaryoticTooltip")
let progressPercentage = 0;


rnaButton.addEventListener('click', function() {
  if(rna >= maxRNA){
    logMessage('Maximum RNA capacity');
    return;
  }

  if(rna >= 0){
    dnaButton.style.display = "inline-block";
  }

  if(rna >= 8){
    membraneButton.style.display = "inline-block";
  }
  
  rna += 2;
  rnaDisplay.textContent = rna;
  updateStats();
  logMessage('Gained 2 RNA');

});

dnaButton.addEventListener('click', function() {
  if(rna < 2){
    updateStats();
    logMessage('Not enough RNA');
    return;
  }

  if(dna >= maxDNA){
    logMessage('Maximum DNA capacity');
    return;
  }

  if(dna >= 3){
    OrganellesButton.style.display = "inline-block";
  }

  rna -=2;
  dna += 1;
  rnaDisplay.textContent = rna;
  dnaDisplay.textContent = dna;
  updateStats();
  logMessage('Gained 1 DNA');
});

membraneButton.addEventListener('click', function(){
  if(rna < 2){
    updateStats();
    logMessage('Not enough RNA');
    return;
  }


  rna -= 2;
  maxRNA = maxRNA + membrane;

  rnaMaxDisplay.textContent = maxRNA;

  updateStats();
  logMessage('Gained 5 max RNA space');
})

organellesButton.addEventListener('click', function() {
  if (rna < 12 || dna < 4) {
    logMessage('Not enough resources for Organelles');
    return;
  }

  rna -= 12;
  dna -= 4;
  updateStats();
  logMessage('Organelles created');

  rnaPerSecond += 1;
  document.getElementById("rnaPS").textContent = rnaPerSecond + "/s";

  if (rnaPerSecond >= 2){
    NucleusButton.style.display = "inline-block";
  }

  organellesInterval = setInterval(function() {
    if (rna < maxRNA) {
      rna++;
      rnaDisplay.textContent = rna;
      updateStats();
    }
  }, 1000);
});

NucleusButton.addEventListener('click', function() {
  if (rna < 38 || dna < 18) {
    logMessage('Not enough resources for Nucleus');
    return;
  }

  rna -= 38;
  dna -= 18; 
  
  dnaDisplay.textContent = dna;
  rnaDisplay.textContent = rna;
  updateStats();
  logMessage('Nucleus created');

  dnaPerSecond += 1;
  document.getElementById("dnaPS").textContent = dnaPerSecond + "/s";

  if (dnaPerSecond >= 1){
    EukaryoticButton.style.display = "inline-block";
  }

  setInterval(function() {
    if (rna >= 2 && dna < maxDNA) {
      rna -= 2;
      dna += 1;
      dnaDisplay.textContent = dna;
      rnaDisplay.textContent = rna;
      updateStats();
    }
  }, 1000);
});

eukaryoticButton.addEventListener('click', function() {
  if (rna < 46 || dna < 26) {
    logMessage('Not enough resources for Eukaryotic Cell');
    return;
  }

  if (mitochondriaButton.style.display = "none"){
    mitochondriaButton.style.display = "inline-block"
  }

  rna -= 46;
  dna -= 26;
  maxDNA = maxDNA + eukaryotic;
  dnaMaxDisplay.textContent = maxDNA;
  rnaDisplay.textContent = rna;
  dnaDisplay.textContent = dna;
  updateStats();
  logMessage('Eukaryotic Cell created');
});

mitochondriaButton.addEventListener('click', function() {
  if (rna < 75 || dna < 65) {
    logMessage('Not enough resources for Mitochondria');
    return;
  }

  rna -= 75;
  dna -= 65;

  membrane = membrane*2;
  eukaryotic = eukaryotic*2;

  let temp = maxRNA - 100;
  maxRNA = maxRNA + temp;

  temp = maxDNA - 100;
  maxDNA = maxDNA + temp;
  
  rnaMaxDisplay.textContent = maxRNA;
  dnaMaxDisplay.textContent = maxDNA;

  membraneTooltip.textContent = "Increase RNA capacity by " +  membrane + "|| Costs 2 RNA";

  if(zzero == 0){
    ReproductionButton.style.display = "inline-block";
    zzero = 1;
  }
  
  updateStats();
  logMessage('Mitochondria created');
});

ReproductionButton.addEventListener('click', function() {
  if (dna < 150) {
    logMessage('Not enough DNA for Reproduction');
    return;
  }

  dna -= 150;

  rnaPerSecond = rnaPerSecond*2;

  document.getElementById("rnaPS").textContent = rnaPerSecond + "/s";

  
  PhagocytosisButton.style.display = "inline-block";
  progressContainer.style.display = "inline-block";
  ReproductionButton.style.display = "none";
  

  organellesInterval = setInterval(function() {
    if (rna < maxRNA) {
      rna += 2;
      rnaDisplay.textContent = rna;
      updateStats();
    }
  }, 1000);

  progressPercentage = 20;
  progressBar.style.width = progressPercentage + '%';
  progressBar.textContent = 'Evolving 20%';

  logMessage('Reproduction created');
});

PhagocytosisButton.addEventListener('click', function(){
  if (dna < 175) {
    logMessage('Not enough DNA for Phagocytosis');
    return;
  }

  dna -= 175;

  MulticellularButton.style.display = "inline-block";
  PhagocytosisButton.style.display = "none";

  progressPercentage = 40;
  progressBar.style.width = progressPercentage + '%';
  progressBar.textContent = 'Evolving 40%';

  logMessage('Phagocytosis created');
})

multicellularButton.addEventListener('click', function() {
  if (dna < 200) {
    logMessage('Not enough DNA for Multicellular');
    return;
  }

  dna -= 200;
  dnaPerSecond = dnaPerSecond*2;

  document.getElementById("dnaPS").textContent = dnaPerSecond + "/s";

  multicellularButton.style.display = "none";
  BilateralSymmetryButton.style.display = "inline-block";

  progressPercentage = 60;
  progressBar.style.width = progressPercentage + '%';
  progressBar.textContent = 'Evolving 60%';
  
  updateStats();
  logMessage('Multicellular created');
});

BilateralSymmetryButton.addEventListener('click', function() {
  if (dna < 230) {
    logMessage('Not enough resources for Bilateral Symmetry');
    return;
  }

  dna -= 230;

  eukaryotic = eukaryotic*2;

  temp = maxDNA - 100;
  maxDNA = maxDNA + temp;

  eukaryotic.textContent = "Increase DNA capacity by" + eukaryotic +"|| Costs 46 RNA, 26 DNA"
  
  rnaMaxDisplay.textContent = maxRNA;
  dnaMaxDisplay.textContent = maxDNA;

  BilateralSymmetryButton.style.display = "none";
  Mammals.style.display = "inline-block";

  progressPercentage = 80;
  progressBar.style.width = progressPercentage + '%';
  progressBar.textContent = 'Evolving 80%';

  updateStats();
  logMessage('Bilateral Symmetry created');
});  

mammalsButton.addEventListener('click', function() {
  if (dna < 250) {
    logMessage('Not enough DNA to evolve into mammals');
    return;
  }

  progressPercentage = 100;
  progressBar.style.width = progressPercentage + '%';
  progressBar.textContent = 'Evolving 100% || Thank you for playing';

  logMessage('Attempted evolution into mammals');
});



function updateStats() {
  dnaDisplay.textContent = dna;
  rnaDisplay.textContent = rna;
}

function logMessage(message) {
  const li = document.createElement('li');
  li.textContent = message;
  messageLog.insertBefore(li, messageLog.firstChild);
}