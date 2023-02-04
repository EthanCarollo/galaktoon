function preload() {
    loadAssets();
  }
  
  
function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    noSmooth();
    frameRate(60);
  }

function draw(){
  if(imageIsLoaded === true){
    displayMap();
  }
}
  
function mouseClicked() {
  console.log(getTileWithScreenPosition(mouseX, mouseY))
}
