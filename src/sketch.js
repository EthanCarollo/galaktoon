
function preload() {
  loadAssets(); // Launch the function load assets from ressource to load
  pixelFont = loadFont('../assets/fonts/PublicPixel.ttf');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  noSmooth();
  frameRate(fps);
  textFont(pixelFont) // Set the font 
}

function draw() {

    resetCanvasVar()

    updateAnimationIndex(); // Update the animation index 

    sceneManager(); // Manage to display which scene is selected (engine one or two)

    transitionManager(); // Apply transition effect on screen
    
}



function windowResized() {
  windowHeight = window.innerHeight
  windowWidth = window.innerWidth
	resizeCanvas(windowWidth, windowHeight);
  setVariablesOnResize();
} // Reset the size of the canvas to be responsive on se resize of the window

function resetCanvasVar(){
  canvas.mouseReleased(() => { }) // Resetting canvas function
  cursor('auto') // Resetting the cursor to auto
} // Function who reset canvas function cause we will overwrite them every frames
