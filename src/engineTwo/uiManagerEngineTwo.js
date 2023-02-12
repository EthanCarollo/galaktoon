const displayUserInterfaceEngineTwo = () => {
    createLogDebugFight();
    if(fightIsEnd === true){
        displayEndFightMenu(whoWin);
    }
}

const displayEndFightMenu = (whoWin) => {
    let sizeButtonTemp = 150
    let xPosButton = window.innerWidth /2 - sizeButtonTemp/2;
    let yPosButton = window.innerHeight /2 - sizeButtonTemp/2;

    background(0,0,0,75);


    // TEMP RETURN MAIN ENGINE BUTTON for debug
    rect(xPosButton, yPosButton, sizeButtonTemp*2, sizeButtonTemp)
    fill(255,255,255)
    createInputButtonWithCallback(xPosButton, yPosButton, sizeButtonTemp*2, sizeButtonTemp, returnMainEngine);
    text(whoWin + " win the fight.", xPosButton+sizeButtonTemp, yPosButton+sizeButtonTemp/2)
    noFill()
    // TEMP RETURN MAIN ENGINE BUTTON for debug
}

const returnMainEngine = () => {
    launchEngineOne();
}

const createLogDebugFight = () => {
    let sizeX = 600;
    let sizeY = 400;
    let textDebugLogSize = 20;
    let marginTextSize = 8;
    let offsetXLog = (window.innerWidth/2) - sizeX /2;
    let offsetYLog = window.innerHeight-sizeY;
    fill(100,100,100)
    rect(offsetXLog, offsetYLog,sizeX,sizeY)
    fill(0,255,0)
    textSize(textDebugLogSize)
    text("fight log", offsetXLog, offsetYLog,300)
    for(let i = 0; i < fightLog.length; i++)
    {
        fill(255,0,0)
        text(fightLog[fightLog.length-1-i], offsetXLog+marginTextSize, offsetYLog+textDebugLogSize+marginTextSize+(textDebugLogSize+marginTextSize)*i,sizeX)
    }
}