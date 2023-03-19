// Engine One

const returnEngineOneAfterFight = () => {
    settingUpEngineOneScene();
    launchEngineOne();
}

const settingUpEngineOneScene = () => {
    // If there is some things to set up before launching the engine, this will be here
}

const launchEngineOne = () => {
    launchTransitionAndSetCallbackAfter(() => {
        // Function to do when transition ended
        actualEngine = EngineOne;

    });
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
    launchTransitionAndSetCallbackAfter(() => {
        // Function to do when transition ended
        actualEngine = EngineTwo; 

    });
}

const launchTransitionAndSetCallbackAfter = (callbackFunction, idTransition = 15) => {

    callbackWhenTransitionFinish = callbackFunction
    transitionImageId = idTransition;
    uiData[idTransition].image.resize(window.innerWidth, window.innerHeight); // ! Set size for transition

    actualTransitionState = "enterIn"
}

// ! Aesthetic transtion


let actualTransitionState = null;
let callbackWhenTransitionFinish = () => { };
let transitionEngineIndex = 0;
let transitionImageId = 15;
const transitionManager = () => {
    switch(actualTransitionState)
    {
        case "enterIn" : 
            enterInTransition()
            break;
        case "goOut" :
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
        actualTransitionState = "goOut"
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