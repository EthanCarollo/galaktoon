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
  let tileOnMouse = getTileWithScreenPosition(mouseX, mouseY);
  console.log(tileOnMouse)
  mapLayer[tileOnMouse[0]][tileOnMouse[1]] = tileSelected
}
