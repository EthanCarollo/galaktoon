const displayUserInterfaceEngineTwo = () => {
    createLogDebugFight();
    if(fightIsEnd === true){
        displayEndFightMenu();
    }
}

const displayEndFightMenu = () => {
    background(0,0,0,75);

    // TEMP RETURN MAIN ENGINE BUTTON
    let sizeButtonTemp = 150
    rect(window.innerWidth /2 - sizeButtonTemp/2, window.innerHeight /2 - sizeButtonTemp/2, sizeButtonTemp, sizeButtonTemp)
    fill(255,255,255)
    createInputButtonWithCallback(window.innerWidth /2 - sizeButtonTemp/2, window.innerHeight /2 - sizeButtonTemp/2, sizeButtonTemp, sizeButtonTemp, returnMainEngine);
    noFill()
    // TEMP RETURN MAIN ENGINE BUTTON
}

const returnMainEngine = () => {
    launchEngineOne();
}

const createLogDebugFight = () => {
    let sizeX = 600;
    let sizeY = 400;
    let offsetXLog = (window.innerWidth/2) - sizeX /2;
    fill(100,100,100)
    rect(offsetXLog, window.innerHeight-sizeY,sizeX,sizeY)
    fill(0,255,0)
    text("fight log", offsetXLog, window.innerHeight-sizeY-50,300)
    for(let i = 0; i < fightLog.length; i++)
    {
        fill(255,0,0)
        text(fightLog[fightLog.length-1-i], offsetXLog, window.innerHeight-sizeY+50*i,sizeX)
    }
}