const sceneManager = () => {
    /**
     * * Launch the engine if all ressource has been loaded
     */
    if(totalLoadCounter > 1){
        switch(actualScene){
            case SceneManagerStateEnum.Engine :
                runEngine();
                runInputManager();
                break;
            case SceneManagerStateEnum.StartMenu :
                runStartMenu();
                break;
            default :
                throw new Error("actualScene isn't set, check the scene manager")
        }
    }
}

const runEngine = () => {
    /** 
     * * Run Engine on different EngineStateEnum
     */
    switch(actualEngine){
        case EngineStateEnum.EngineOne :
            // Code executing if actualEngine is the first one (in this case it's the 2D Top down Engine)
            runEngineOne();
            break;
        case EngineStateEnum.EngineTwo :
            // Code executing if actualEngine is the second one
            runEngineTwo()
            break;
        default :
            throw new Error("Actual Engine isnt set");
            break;
    }
}

const runStartMenu = () => {
    showStartMenu();
}

const setVariablesOnResize = () => {
    abilitySize = window.innerWidth/10.5;
}