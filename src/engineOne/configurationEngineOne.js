
let playerVector;
let cameraVector;
let mapVector;

// Player Var
let playerSpriteSize = 100;
let playerCanMove = true;
let cameraSmoothStep = 0.98;

let playerIsExploringMap = false;

// Player anim
let playerIsMooving = false;
let playerAnimationIndex = 0;
const playerAnimationLength = 4;
let playerDirection = [0, 0]; // stock the direction of the player in a array
let playerLastDirection = [0, 1]; // orientation naturally down
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

// PLayer can fight
const playerCanFight = () => playerTeam[0].hp.current > 0
// PLayer can fight

// Player dialog

let playerIsInDialog = false;

// Player dialog