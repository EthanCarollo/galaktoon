
function preload() {
  loadAssets(ressourceToLoad);
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  noSmooth();
  frameRate(fps);
  textFont(pixelFont)
}

function draw() {
    cursor('auto') // Resetting the cursor to auto
    sceneManager();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}