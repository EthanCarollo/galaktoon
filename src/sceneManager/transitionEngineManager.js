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
        launchEngineTwo();
    }
}

const launchEngineTwo = () => {
    actualEngine = EngineTwo;
}