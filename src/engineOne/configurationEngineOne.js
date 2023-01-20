let playerVector;
let cameraVector;
let mapVector;

// Player Var
let playerSpeed = 5;
let playerSpriteSize = 95;
let playerCanMove = true;
let cameraSmoothStep = 0.98;

// Player anim
let playerIsMooving = false;
let playerAnimationIndex = 0;
let playerAnimationLength = 4;
let playerDirection = ["right"]; // stock the direction of the player in a array
let playerLastDirection = [0,1]; // orientation naturally down
// Player anim

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

// Player interaction

let playerCanInteract = true;

// Player interaction