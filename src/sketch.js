
function preload() {
  loadAssets();
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  noSmooth();
  frameRate(fps);

  // For Engine One
  cameraVector = createVector(windowWidth/2, windowHeight/2);
  playerVector = createVector(playerOnMap.start[0], playerOnMap.start[1]);
  mapVector = createVector(0,0);
  // For Engine One

}

function draw() {
    if(ressourceIsLoaded === true){
        switch(actualEngine){
            case EngineOne :
                // Code executing if actualEngine is the first one (in this case it's the 2D Top down Engine)
                runEngineOne()
                break;
            case EngineTwo :
                // Code executing if actualEngine is the second one

                break;
            default :
                throw new Error("Actual Engine isnt set");
        }
    }
}