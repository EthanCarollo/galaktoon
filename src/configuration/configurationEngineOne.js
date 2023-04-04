
let playerVector;
let cameraVector;
let mapVector;

// Player Var
let playerState = "normal";

let playerSpriteSize = 100;
let playerCanMove = true;
let cameraSmoothStep = 0.98;

let playerIsExploringMap = false;

// Player anim
let playerIsMooving = false;
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
const playerCanFight = () => playerTeam[0].health.actualHealth > 0
// PLayer can fight

// Player dialog

let npcDialoged = null;
let actualDialog = 0;

// Player dialog

