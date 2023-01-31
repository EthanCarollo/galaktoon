const displayUserInterfaceEngineTwo = () => {
    createLogDebugFight();
}

const createLogDebugFight = () => {
    text("fight log", 500, 300,300)
    for(let i = 0; i < fightLog.length; i++)
    {
        text(fightLog[i], 500, 350+50*i,650)
    }
}