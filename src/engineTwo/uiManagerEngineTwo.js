const displayEngineTwoUI = () => {
    switch(engineTwoState){
        case "Playing" : 
            displayEngineTwoPlayingUi();
            break;
        case "endFight" :
            displayEngineTwoEndFightUi();
            break;
        default : 
            throw new Error("Engine Two State isn't set for UI : " + engineTwoState)
    }
}

const displayEngineTwoPlayingUi = () => {
    switch(whichEntityTurn){
        case 0 :
            displayDebug();
            // UI WHEN ITS PLAYER TURN
            break;
        default :
            // UI WHEN ITS IA TURN
            break;
    }
}

const displayEngineTwoEndFightUi = () => {
    console.log("display end")
    displayEndDebug();
}

const displayEndDebug = () => {
    let size = 200;
    let x = (window.innerWidth/2) - (size/2)
    let y = (window.innerHeight/2) - (size/2)
    fill(255,0,0,100)
    rect(x ,y ,size ,size)
    createInputButtonWithCallback(x ,y ,size ,size, () => {
        returnEngineOneAfterFight();
    })
}

const displayDebug = () => {
    fill(255,0,0,100)
    text("Actual turn is " + whichEntityTurn, 0, 0)
    text("Actual selected ability is " + selectedAbility, 0, 25)
    text("Actual PM of the player is " + actualMapEngineTwo.entityOnTactical[0].pm, 0, 50)
    text("Actual Player Health is " + playerTeam[0].hp.current, 0, 75)
    noFill()
    displayAbility()
    displayEndTurnButton()
}

const displayAbility = () => {
    let size = 100;
    fill(0,0,255,100)
    for(let i = 0; i < playerTeam[0].abilities.length; i ++)
    {   
        let x = 0+size*(i*1.25);
        image(uiData[playerTeam[0].abilities[i].id].image, x, window.innerHeight-size, size, size)
        rect(x,window.innerHeight-size,size,size)
        createInputButtonWithCallback(x, window.innerHeight-size,size,size, () => {
            console.log("they got clicked here wtf")
            getAttackableCase(actualMapEngineTwo.entityOnTactical[0].pos[0], actualMapEngineTwo.entityOnTactical[0].pos[1], playerTeam[0].abilities[i].range)
            selectAbility(i);
        })
    }
    noFill()
}

const displayEndTurnButton = () => {
    fill(255,0,255,100)
    let width = 300;
    let height = 100;
    rect(window.innerWidth-width, window.innerHeight-height, width, height)
    createInputButtonWithCallback(window.innerWidth-width, window.innerHeight-height, width, height, () => {
        endTurn();
    })
    noFill()
}

const selectAbility = (ability) => {
    if(selectedAbility === ability)
    {
        resetMovableAndEntityVar();
        return;
    }
    selectedAbility = ability;
}