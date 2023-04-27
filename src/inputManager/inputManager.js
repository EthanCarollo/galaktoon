/**
 * * Set number of functions for the actualEngine setted in the variable
 */

const runInputManager = () => {
    switch(actualEngine){
        case EngineStateEnum.EngineOne :
            playerKeyPressedForEngineOne();
            playerInputForEngineOne();
            break;
        case EngineStateEnum.EngineTwo :
            playerInputForEngineTwo();
            playerKeyPressedForEngineTwo();
            keyPressedForEngineTwo();
            break;
        default :
            throw new Error("Actual engine isn't set, the game can't run")
    }
}
