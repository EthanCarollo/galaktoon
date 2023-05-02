
let playerVector;
let cameraVector;
let mapVector;
let vector2ExploringMenu;

// Player Var
let engineOneState = EngineOneStateEnum.Playing;

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
var playerCanExplore = false;

// Construction Mode

// Quest var

let freeBobKidHappens = false;
let questList = [];
let animationIndexUiQuestGoal = 0;
let toggleAnimationQuestIndex = false;

// Quest var

// Player dialog

let npcDialoged = null;
let actualDialog = 0;
let firstDialog = true;
let refuseIsShaking = false;
let refuseText = "Refuse";
let acceptText = "Accept";
let finishQuestText = "Finish Quest";

// Player dialog

// Cinematic var

let vectorDestinationCinemation = [Math.floor(window.innerWidth/2), Math.floor(window.innerHeight/2)] // We need to floors if we want this to works
let ySizeBorderCinematic = window.innerHeight/9;
let positionBorderCinematic = [-ySizeBorderCinematic, window.innerHeight]

// Cinematic var


// Tutorial variable

let uiEngineOneState = UiEngineOneStateEnum.Normal;
let tutorialInteractText = null;
let isInTutorial = false;
let keyboardIsShowing = true;

let bedIsAlreadyUsed = false;
let playerAlreadyExplore = false;


// Tutorial variable