// launch figth on engine two

const launchFightOnEngineTwo = (idMapOfFight) => { // this take in parameters debug enemies for the prototype
    if(checkAllAlliesDead() === false && actualTransitionState === null)
    {
        actualMapEngineTwo = JSON.parse(JSON.stringify(tacticalMapData[idMapOfFight]))
        actualMapEngineTwoRessource = mapData[actualMapEngineTwo.attachedMap];
        engineTwoState = "startFight";
        playerFightAnimationIndex = 0;
        whichEntityTurn = 0; // Reset turn to 0
        resetEveryEntityValue(actualMapEngineTwo)
        setPlayerInActualMapEngineTwo();
        launchEngine(EngineStateEnum.EngineTwo);
        if(npcDialoged !== null)
        {
            npcFighted = npcDialoged;
        }else{
            npcFighted = null;
        }
        return true;
    }
    return false;
}

const setPlayerInActualMapEngineTwo = () => {
    actualMapEngineTwo.entityOnTactical[0].health = playerTeam[0].health
    actualMapEngineTwo.entityOnTactical[0].abilities = playerTeam[0].abilities
} // Set variables of the player in the entityOnTactical array of the map, in that order, we have the position defined by the map and the health and the ability set by the playerConfig

// * Global Logics

/**
 * @param {EngineStateEnum} engineToLaunch this take in parameters an element of the enumeration of the EngineStateEnum, if the engine State doesn't
 * exist, the function just return an error
 */
const launchEngine = (engineToLaunch) => {
    /**
     * * This is use the function launchTransitionAndSetCallbackAfter who launch the transition and when the state if the transition swap, it just call
     * * the function passed in parameters, it's the easiest way i found to make personnalized transition with differents event
     */
    if(!verifyValueIsInEnum(EngineStateEnum, engineToLaunch))
    {
        throw new Error("EngineStateEnum doesn't have the state : " + engineToLaunch)
    }

    launchTransitionAndSetCallbackAfter(() => {
        // Function to do when transition ended
        actualScene = SceneManagerStateEnum.Engine;
        actualEngine = engineToLaunch; 
    });
}

/**
 * @param {function} callbackFunction the function called at the end of the transition
 * @param {idOfImageTransition} idTransition the id of the image of the transition
 */
const launchTransitionAndSetCallbackAfter = (callbackFunction) => {
    /**
     * * This function set the global variable of the transition, this don't give any problems cause we can only have one transition at the same time or
     * * it will just return an error
     */
    if(actualTransitionState !== null)
    {
        throw new Error("The actual transition state is already set so we can't launch transition : " + actualTransitionState)
    }

    callbackWhenTransitionFinish = callbackFunction
    transitionImageId = getRandomBackGroundId();

    actualTransitionState = TransitionStateEnum.EnterIn
}

// * Aesthetic transtion part

const transitionManager = () => {
    /**
     * * A classic switch for both transition, we actually have only 2, the enterIn classic and the goOut classic too
     * TODO : Create more functions and transitions
     */
    switch(actualTransitionState)
    {
        case TransitionStateEnum.EnterIn : 
            resetCanvasVar()
            enterInTransition()
            break;
        case TransitionStateEnum.GoOut :
            goOutTransition()
            resetCanvasVar()
            break;
    }
}



const getRandomBackGroundId = () => {
    const arrayId = [31, 15, 33]
    return arrayId[getRandomInt(arrayId.length)];
} 



//#region // * Different transition states function

const enterInTransition = () => {
   
    let alpha = Math.floor(transitionEngineIndex);
    let colorRectFill = color(255, alpha);
    tint(colorRectFill);
    createImageTransition();
    showTextOnTransition();
    if(transitionEngineIndex < 500)
    {
        transitionEngineIndex+=10;
    }else{
        actualTransitionState = TransitionStateEnum.GoOut 
        callbackWhenTransitionFinish();
    }
}

const showTextOnTransition = () => {
    textAlign(CENTER, CENTER)
    fill(255)
    textSize(32)
    text("loading...", window.innerWidth-350, window.innerHeight-100, 300, 100)
    textAlign(CORNER, TOP)
}

const goOutTransition = () => {

    let alpha = Math.floor(transitionEngineIndex);
    let colorRectFill = color(255, alpha);
    tint(colorRectFill);
    createImageTransition();
    showTextOnTransition();
    noTint();
    if(transitionEngineIndex > 0)
    {
        transitionEngineIndex-=10;
    }else{
        actualTransitionState = null
    }
}

//#endregion



/**
 * @param {int} id it's the actually id taken in parameters lied to the ui
 */
const createImageTransition = (id = transitionImageId) => {
    /**
     * * 15 Is the id of the wallpaper in the uiData array
     * * This set the image on the full size of the window
     */
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    image(uiData[id].image , 0 ,0 ,width, height+100);
    image(uiData[32].image , 0 ,0 ,width, height+100);

}