

let actualMapEngineTwo;

let vectorCameraEngineTwo;

let selectedChar = null;
let selectedEntity = null;

let whichEntityTurn = 0;
let selectedAbility = 0;

let canAttackCase = []

// * ENGINE TWO UI CONFIGURATION :

let transitionLight = [0, 0, 0];
let transitionSpeed = 1;
let abilitySize = window.innerWidth/10.5;
let abilityPosition = [];
let abilityIsOpen = false;

// Cinematic fight View Config :

let fightCinematicViewState = FightCinematicViewStateEnum.NoAnim;