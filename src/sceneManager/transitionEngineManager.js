// Engine One

const returnEngineOneAfterFight = () => {
    settingUpEngineOneScene();
    launchEngine(EngineStateEnum.EngineOne);
}

const settingUpEngineOneScene = () => {
    // If there is some things to set up before launching the engine, this will be here
}

// Engine Two

const launchFightOnEngineTwo = (idMapOfFight) => { // this take in parameters debug enemies for the prototype
    if(checkAllAlliesDead() === false)
    {
        actualMapEngineTwo = tacticalMapData[idMapOfFight]
        actualMapEngineTwoRessource = mapData[actualMapEngineTwo.attachedMap];
        setPlayerInActualMapEngineTwo();
        launchEngine(EngineStateEnum.EngineTwo);
    }
}

const setPlayerInActualMapEngineTwo = () => {
    actualMapEngineTwo.entityOnTactical[0].health = playerTeam[0].health
    actualMapEngineTwo.entityOnTactical[0].abilities = playerTeam[0].abilities
} // Set variables of the player in the entityOnTactical array of the map, in that order, we have the position defined by the map and the health and the ability set by the playerConfig

const launchEngine = (engineToLaunch) => {
    launchTransitionAndSetCallbackAfter(() => {
        // Function to do when transition ended
        actualEngine = engineToLaunch; 
    });
}

const launchTransitionAndSetCallbackAfter = (callbackFunction, idTransition = 15) => {

    callbackWhenTransitionFinish = callbackFunction
    transitionImageId = idTransition;
    uiData[idTransition].image.resize(window.innerWidth, window.innerHeight); // ! Set size for transition

    actualTransitionState = TransitionStateEnum.EnterIn
}

// ! Aesthetic transtion


const transitionManager = () => {
    switch(actualTransitionState)
    {
        case TransitionStateEnum.EnterIn : 
            enterInTransition()
            break;
        case TransitionStateEnum.GoOut :
            goOutTransition()
            break;
    }
}

const enterInTransition = () => {
   
    let alpha = Math.floor(transitionEngineIndex);
    let colorRectFill = color(255, alpha);
    tint(colorRectFill);
    createImageTransition();
        
    if(transitionEngineIndex < 500)
    {
        transitionEngineIndex+=10;
    }else{
        actualTransitionState = TransitionStateEnum.GoOut 
        callbackWhenTransitionFinish();
    }
}

const goOutTransition = () => {

    let alpha = Math.floor(transitionEngineIndex);
    let colorRectFill = color(255, alpha);
    tint(colorRectFill);
    createImageTransition();

    noTint();
    if(transitionEngineIndex > 0)
    {
        transitionEngineIndex-=10;
    }else{
        actualTransitionState = null
    }
}





// ! Tools used for transition

const createImageTransition = (id = 15) => {
    // ! 15 Is the id of the wallpaper in the uiData array
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    image(uiData[id].image , 0 ,0 ,width, height+1);

}