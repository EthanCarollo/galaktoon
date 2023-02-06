// DISCLAIMER, THIS IS A TEMP CODE FOR THE MAP CREATOR TOOLS, IM LITERALLY RUSHING THIS TOOL.. SRY I WILL IMPROVE THAT

function preload() {
    loadAssets();
  }
  
  
function setup() {
    canvas = createCanvas(window.innerWidth /1.335, window.innerHeight / 1.4);
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
  
function mouseClicked() {
  paintTileOnClickWithMousePos(tileSelected)
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

}

const paintTileOnClickWithMousePos = (tileSelectedByUser = tileSelected) => {
  let tileOnMouse = getTileWithScreenPosition(mouseX - xMapPos, mouseY - yMapPos);
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