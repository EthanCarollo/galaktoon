
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

    canvas.mouseReleased(() => { }) // Resetting canvas function

    cursor('auto') // Resetting the cursor to auto

    sceneManager();
}

function windowResized() {
  windowHeight = window.innerHeight
  windowWidth = window.innerWidth
	resizeCanvas(windowWidth, windowHeight);
}