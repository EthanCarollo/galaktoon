// DISCLAIMER, THIS IS A TEMP CODE FOR THE MAP CREATOR TOOLS, IM LITERALLY RUSHING THIS TOOL.. SRY I WILL IMPROVE THAT

function preload() {
    loadAssets();
  }
  
  let canvasSize = [window.innerWidth /1.335, window.innerHeight / 1.4]

function setup() {
    
    canvas = createCanvas(canvasSize[0], canvasSize[1]);
    noSmooth();
    frameRate(60);
    resizeArrayMap()
  }

function draw(){
  if(imageIsLoaded === true){
    displayMap();
  }
  inputManager()
}

function inputManager() {
  
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // When players touch left arrow or Q
    xMapPos+=2;
  }
  if (keyIsDown(LEFT_ARROW) || keyIsDown(81)) { // When players touch left arrow or Q
    xMapPos-=2;
  }
  if(keyIsDown(UP_ARROW) || keyIsDown(90)) { // When players touch up arrow or Z
    yMapPos-=2;
  }
  if(keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // When players touch down arrow or S
    yMapPos+=2;
  }

  if (mouseIsPressed === true) {
    paintTileOnClickWithMousePos(tileSelected)
  }
}

const paintTileOnClickWithMousePos = (tileSelectedByUser = tileSelected) => {
  let tileOnMouse = getTileWithScreenPosition(mouseX - xMapPos, mouseY - yMapPos);
  if(tileOnMouse === false || mouseY > canvasSize[1] || mouseX > canvasSize[0]){
    return;
  }
  switch(selectedLayer){
    case "groundLayer" :
      mapLayers.groundLayer[tileOnMouse[1]][tileOnMouse[0]] = tileSelectedByUser
      break;
    case "objectLayer" :
      mapLayers.objectLayer[tileOnMouse[1]][tileOnMouse[0]] = tileSelectedByUser
      break;
    default :
      throw new Error("Layer isn't defined")
  }
}