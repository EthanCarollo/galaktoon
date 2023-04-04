const sceneManager = () => {
    if(ressourceIsLoaded === true){
        switch(actualScene){
            case "engine" :
                runEngine();
                break;
            default :
                throw new Error("actualScene isn't set, check the scene manager")
        }
        runInputManager();
    }
}

const runEngine = () => {
    switch(actualEngine){
        case EngineStateEnum.EngineOne :
            // Code executing if actualEngine is the first one (in this case it's the 2D Top down Engine)
            runEngineOne()
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

const setVariablesOnResize = () => {
    abilitySize = window.innerWidth/10.5;
}