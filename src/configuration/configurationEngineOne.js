
let playerVector;
let cameraVector;
let mapVector;

// Player Var
let playerState = "normal";

let cameraSmoothStep = 0.98;


// Player Var

// Map Var
let playerOnMap;
let actualPlayerMap;
let tileSize = 65;
let spriteSizeCut = 30;
// Map Var

// Construction Mode

let constructionMode = false;
let destructionMode = false;

// Construction Mode



// Player dialog

let npcDialoged = null;
let actualDialog = 0;

// Player dialog

// Cinematic var

let vectorDestinationCinemation = [Math.floor(window.innerWidth/2), Math.floor(window.innerHeight/2)] // We need to floors if we want this to works
let ySizeBorderCinematic = window.innerHeight/9;
let positionBorderCinematic = [-ySizeBorderCinematic, window.innerHeight]

// Cinematic var

