// Engine One

const returnEngineOneAfterFight = () => {
    settingUpEngineOneScene();
    launchEngineOne();
}

const settingUpEngineOneScene = () => {
    // If there is some things to set up before launching the engine, this will be here
}

const launchEngineOne = () => {
    actualEngine = EngineOne;
}

// Engine Two

const launchFightOnEngineTwo = () => { // this take in parameters debug enemies for the prototype
    if(checkAllAlliesDead() === false)
    {
        actualMapEngineTwo = mapData[4];
        setPlayerInActualMapEngineTwo();
        launchEngineTwo();
    }
}

const setPlayerInActualMapEngineTwo = () => {
    actualMapEngineTwo.entityOnTactical[0].health = playerTeam[0].health
    actualMapEngineTwo.entityOnTactical[0].abilities = playerTeam[0].abilities
} // Set variables of the player in the entityOnTactical array of the map, in that order, we have the position defined by the map and the health and the ability set by the playerConfig

const launchEngineTwo = () => {
    actualEngine = EngineTwo;
}

// ! Aesthetic transtion


let actualTransitionState = null;
const transitionManager = () => {
    switch(actualTransitionState)
    {
        default : 
            break;
    }
}