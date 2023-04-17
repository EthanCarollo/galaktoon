// * CNV VAR

let canvas;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
const fps = 60;

// * CNV VAR

// * SCENE MANAGER

let actualScene = SceneManagerStateEnum.StartMenu

// * SCENE MANAGER

// * ENGINE MANAGER

let actualEngine = EngineStateEnum.EngineOne;

// * ENGINE MANAGER

// * GLOBAL ANIMATION VAR

let playerFightAnimationIndex = 0;
let playerAnimationIndex = 0;
const playerAnimationLength = 4;
let specificAnimationIndex = 0

// * GLOBAL ANIMATION VAR

// * GLOBAL TRANSITION VAR

let actualTransitionState = null;
let callbackWhenTransitionFinish = () => { }; // The variable that hold the arrow function to launch at the end of the transition function
let transitionEngineIndex = 0;
let transitionImageId = 15;

// * GLOBAL TRANSITION VAR