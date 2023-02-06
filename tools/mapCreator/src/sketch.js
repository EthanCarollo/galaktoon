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
  paintTilesOnClick(tileSelected)
}

const paintTilesOnClick = (tileSelectedByUser = tileSelected) => {
  let tileOnMouse = getTileWithScreenPosition(mouseX, mouseY);
  switch(selectedLayer){
    case "ground" :
      mapLayers.ground[tileOnMouse[0]][tileOnMouse[1]] = tileSelectedByUser
      break;
    case "object" :
      mapLayers.object[tileOnMouse[0]][tileOnMouse[1]] = tileSelectedByUser
      break;
    default :
      throw new Error("Layer isn't defined")
  }
}