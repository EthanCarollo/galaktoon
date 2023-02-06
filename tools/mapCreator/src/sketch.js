// DISCLAIMER, THIS IS A TEMP CODE FOR THE MAP CREATOR TOOLS, IM LITERALLY RUSHING THIS TOOL.. SRY I WILL IMPROVE THAT

function preload() {
    loadAssets();
  }
  
  
function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    noSmooth();
    frameRate(60);
    resizeArrayMap()
  }

function draw(){
  if(imageIsLoaded === true){
    displayMap();
  }
}
  
function mouseClicked() {
  paintTileOnClickWithMousePos(tileSelected)
}

const paintTileOnClickWithMousePos = (tileSelectedByUser = tileSelected) => {
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