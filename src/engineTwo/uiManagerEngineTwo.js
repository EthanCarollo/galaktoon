const displayEngineTwoUI = () => {
    switch(engineTwoState){
        case "startFight" :
            displayEngineTwoStartingFightUi();
            break;
        case "Playing" : 
            displayEngineTwoPlayingUi();
            break;
        case "Tutorial" :
            displayEngineTwoTutorialUi();
            break;
        case "endFight" :
            displayEngineTwoEndFightUi();
            break;
        default : 
            throw new Error("Engine Two State isn't set for UI : " + engineTwoState)
    }
}

//#region // * Different States UI Display Region


const displayEngineTwoStartingFightUi = () => {
    // TODO : Update the start of a fight engine
    background(240);
    if(actualMapEngineTwo.backgroundStartMap !== undefined)
    {
        image(uiData[actualMapEngineTwo.backgroundStartMap ].image,0,0,window.innerWidth,window.innerHeight)
    }
    
    showPlayer(500, 250, 250); 
    showEnemiesStartFight(500, window.innerWidth -250-500)
    displayVersusIcon();
    displayStartFightButton();
}

const displayEngineTwoPlayingUi = () => {
    switch(whichEntityTurn){
        case 0 :
            displayGameUi();
            // UI WHEN ITS PLAYER TURN
            break;
        default :
            // UI WHEN ITS IA TURN
            displayPlayerInformationUiEngineTwo();
            break;
    }
}

const displayEngineTwoTutorialUi = () => {
    if(isCinematicFightIsRunning()) return; // If there is a cinematic, i just return the function and don't show the reste of the UI
    switch(tutorialStep){
        case 0 :
            tutorialManagerState = TutorialManagerStateEnum.EngineTwoTutorial;
            canInputEngineTwo = false;
            displayPlayerInformationUiEngineTwo()
            displayEnemyInformationUiEngineTwo()
            break;
        case 1 :
            displayPlayerInformationUiEngineTwo()
            displayEnemyInformationUiEngineTwo()
            break;
        case 2 : 
            displayPlayerInformationUiEngineTwo()
            displayEnemyInformationUiEngineTwo()
            displayOpenAbility()
            displayAbility()
            break;
        case 3 : 
            displayPlayerInformationUiEngineTwo()
            displayEnemyInformationUiEngineTwo()
            break;
        case 4 : 
            displayPlayerInformationUiEngineTwo()
            displayEnemyInformationUiEngineTwo()
            break;
        case 5 :
            displayPlayerInformationUiEngineTwo()
            displayEnemyInformationUiEngineTwo()
            break;
        case 6 :
            displayPlayerInformationUiEngineTwo()
            displayEnemyInformationUiEngineTwo()
            displayEndTurnButton();
            break;
        case 7 : canInputEngineTwo = true; break;
        default :
            throw new Error("Tutorial step isn't set for the different case : " + tutorialStep)
    }
}


const displayEngineTwoEndFightUi = () => {
    background(240);
    if(actualMapEngineTwo.backgroundStartMap !== undefined)
    {
        imageMode(CORNER)
        image(uiData[actualMapEngineTwo.backgroundStartMap ].image,0,0,window.innerWidth,window.innerHeight)
    }
    displayEndFight();
}


//#endregion



// * -----------------------------



//#region // * StartGame UI Region


const displayVersusIcon = () => {
    let width = 500;
    let height = width;
    let xPosition = window.innerWidth / 2 - width / 2
    let yPosition = window.innerHeight / 2 - height / 2
    if(startUiIsShaking === true) {
        xPosition += getRandomInt(5) - getRandomInt(5);
        yPosition += getRandomInt(5) - getRandomInt(5);
    }
    image(uiData[46].image, xPosition, yPosition, width, height)
}

const displayStartFightButton = () => {
    let width = 750;
    let height = width/5;
    let xPosition = window.innerWidth / 2 - width / 2
    let yPosition = window.innerHeight - 300
    fill(255,255,255,255)
    startUiIsShaking = true
    image(uiData[18].image, xPosition, yPosition, width, height)
    if(mouseIsHover(xPosition, yPosition, width, height)){ 
        image(uiData[27].image, xPosition, yPosition, width, height);
        startUiIsShaking = false;
    }

    textAlign(CENTER,CENTER)
    text(startFightText,xPosition, yPosition, width, height)
    textAlign(LEFT,LEFT)
    switch(actualMapEngineTwo.fightType)
    {
        case "tutorial" :
            createInputButtonWithCallback(xPosition, yPosition, width, height, () => {
                engineTwoState = "Tutorial";
            })
            break;
        default :
            createInputButtonWithCallback(xPosition, yPosition, width, height, () => {
                engineTwoState = "Playing";
            })
            break;

    }
}


//#endregion



//#region // * PlayingGame UI Region



const displayGameUi = () => {
    if(isCinematicFightIsRunning()) return; // If there is a cinematic, i just return the function and don't show the reste of the UI
    displayOpenAbility()
    displayAbility()
    displayPlayerInformationUiEngineTwo()
    displayEnemyInformationUiEngineTwo()
    displayEndTurnButton();
}



const displayEnemyInformationUiEngineTwo = () => {
    for (let i = 1; i < actualMapEngineTwo.entityOnTactical.length; i++) {
        const entityToShow = actualMapEngineTwo.entityOnTactical[i];
        

        let tempSize = window.innerWidth/15;
        let padding = 25;
        let tempPosX = window.innerWidth - tempSize - padding
        let tempPosY = 0 + padding + (tempSize+25) * (i-1);
        let percentLifeOfEntity = entityToShow.health.actualHealth / entityToShow.health.maxHealth;

        if(percentLifeOfEntity > 0) { 
            showSpriteIconOnEngineTwo(tempPosX, tempPosY, tempSize, entityToShow.id) 
        } else {
            showDeadSpriteIconOnEngineTwo(tempPosX, tempPosY, tempSize, entityToShow.id)
        }
        image(uiData[36].image, tempPosX, tempPosY, tempSize, tempSize)

        let barSize = tempSize * 2;
        let xBar = tempPosX - barSize - tempSize * 0.15;
        let yBar = tempPosY + 10;
        tint(255,35,35)
        showBarWithPercentUi(xBar, yBar, barSize, percentLifeOfEntity+0.00001, { current : entityToShow.health.actualHealth, max : entityToShow.health.maxHealth});

        let percentPmOfPlayer = entityToShow.pm / 2 +0.00001;
        tint(35,210,35)
        showBarWithPercentUi(xBar, yBar+barSize/10, barSize, percentPmOfPlayer, { current : entityToShow.pm, max : 2});

        let percentPaOfPlayer = entityToShow.pa / 2 +0.00001;
        tint(35,35,255)
        showBarWithPercentUi(xBar, yBar+(barSize/10)*2, barSize, percentPaOfPlayer, { current : entityToShow.pa, max : 2});
    }
}


const displayPlayerInformationUiEngineTwo = () => {
    /**
     * * In this function, we just show the player informations 
     */

    checkAllAlliesDead();

    let tempSize = window.innerWidth/15;
    let padding = 25;
    let tempPosX = 0 + tempSize / 4
    let tempPosY = 0 + padding;
    let percentLifeOfPlayer = actualMapEngineTwo.entityOnTactical[0].health.actualHealth / actualMapEngineTwo.entityOnTactical[0].health.maxHealth +0.00001;

    showSpriteIconOnEngineTwo(tempPosX, tempPosY, tempSize, 0)

    let barSize = tempSize * 2;
    let xBar = tempPosX + tempSize * 1.15;
    let yBar = tempPosY + 10;
    
    tint(255,35,35)
    showBarWithPercentUi(xBar, yBar, barSize, percentLifeOfPlayer, { current : actualMapEngineTwo.entityOnTactical[0].health.actualHealth, max : actualMapEngineTwo.entityOnTactical[0].health.maxHealth});

    let percentPmOfPlayer = actualMapEngineTwo.entityOnTactical[0].pm / 2 +0.00001;
    tint(35,210,35)
    showBarWithPercentUi(xBar, yBar+barSize/10, barSize, percentPmOfPlayer, { current : actualMapEngineTwo.entityOnTactical[0].pm , max : 2});

    let percentPaOfPlayer = actualMapEngineTwo.entityOnTactical[0].pa / 2 +0.00001;
    tint(35,35,255)
    showBarWithPercentUi(xBar, yBar+(barSize/10)*2, barSize, percentPaOfPlayer, { current : actualMapEngineTwo.entityOnTactical[0].pa, max : 2});

}


// Icon in ui show
const showSpriteIconOnEngineTwo = (xStart, yStart, size, idSprite) => {
    let paddingSprite = +size*0.018;
    animationIdleSprite(xStart+paddingSprite, yStart+paddingSprite, size, [0, 1], idSprite)
    image(uiData[35].image, xStart, yStart , size, size)
}

const showDeadSpriteIconOnEngineTwo = (xStart, yStart, size, idSprite) => {
    let paddingSprite = +size*0.018;
    animationDeadSprite(xStart+paddingSprite, yStart+paddingSprite, size, idSprite)
    image(uiData[35].image, xStart, yStart , size, size)
}
// Icon in ui show

//#endregion



//#region // * EndGame UI Region

const displayEndFight = () => {
    let size = window.innerHeight/1.5;
    showEnemiesEndFightList(size);
    showEndPlayer(size);
    showButtonFightEnd();
}

const showEnemiesEndFightList = (size, xStart = window.innerWidth / 2 - size / 2 - 1, yStart = (window.innerHeight) / 2) => {
    let xPosition = xStart
    let yPosition = yStart
    imageMode(CENTER) // Set the image mode to center
    for(let i = 1; i < actualMapEngineTwo.entityOnTactical.length; i++)
    {
        let sizeIterate = i-1;
        let xPositionSprite = xPosition + size*sizeIterate
        textSize(26);
        textAlign(CENTER, TOP)
        let nameSprite = spritesData[actualMapEngineTwo.entityOnTactical[i].id].name
        fill(10,10,10)
        text(nameSprite, xPositionSprite - (size/1.25) / 2, yPosition-15 - (size/1.25) / 2 , size/1.25, (size/1.25))
        if(fightWinner !== "allies")
        {
            animationIdleSprite(xPositionSprite, yPosition, size/1.25, [0, 1], actualMapEngineTwo.entityOnTactical[i].id)
        }else{
            animationDeadSprite(xPositionSprite, yPosition, size/1.25, actualMapEngineTwo.entityOnTactical[i].id)
        }
    }
    imageMode(CORNER)
    noTint();
}

const showPlayer = (size, xStart = window.innerWidth / 2 - size / 2, yStart = window.innerHeight / 2 - size / 2) => {
    textSize(size/14);
    textAlign(CENTER, TOP)
    let nameSprite = spritesData[0].name
    fill(10,10,10)
    text(nameSprite, xStart+10, yStart-15, size, size)
    animationIdleSprite(xStart, yStart, size, [0, 1], 0)
    
}

const showEndPlayer = (size, xStart = window.innerWidth / 2 - size / 2, yStart = window.innerHeight / 2 - size / 2) => {
    textSize(size/14);
    textAlign(CENTER, TOP)
    let nameSprite = spritesData[0].name
    fill(10,10,10)
    text(nameSprite, xStart+10, yStart-15, size, size)

    if(fightWinner === "allies")
    {
        animationIdleSprite(xStart, yStart, size, [0, 1], 0)
    }else{
        animationDeadSprite(xStart, yStart, size, 0)
    }
}

const showEnemiesStartFight = (size, xStart = window.innerWidth / 2 + size / 2,  yStart = window.innerHeight / 2 - size / 2) => {
    for(let i = 1; i < actualMapEngineTwo.entityOnTactical.length; i++)
    {
        textSize(size/14);
        textAlign(CENTER, TOP)
        fill(10,10,10)
        text(spritesData[actualMapEngineTwo.entityOnTactical[i].id].name, xStart, yStart-15, size, size)
        animationIdleSprite(xStart, yStart, size, [0, 1], actualMapEngineTwo.entityOnTactical[i].id)
    }
}

const showButtonFightEnd = () => {
    let width = window.innerWidth / 3;
    let height = width/5;
    let xStart = (window.innerWidth/2) - (width/2)
    let yPosition = (window.innerHeight) - (height*1.5)
    fill(255,0,0,100)
    image(uiData[18].image, xStart, yPosition, width, height)
    if(mouseIsHover(xStart, yPosition, width, height) === true)
    {
        image(uiData[27].image, xStart, yPosition, width, height)
    }
    createInputButtonWithCallback(xStart ,yPosition ,width ,height, () => {
        exitFight()
    })
    textAlign(CENTER, CENTER)
    textSize(40); fill(255);
    text(endFightText, xStart, yPosition, width, height)
    textAlign(LEFT, CENTER)
}

const exitFight = () => {
    if(npcFighted !== null)
    {
        npcFighted.actualDialogIndex ++;
        actualDialog = 0;
    }
    launchEngine(EngineStateEnum.EngineOne);
    if(fightWinner === "allies") endEventFight(actualMapEngineTwo.endEvent);
}

//#endregion



// * -----------------------------



const displayEndTurnButton = () => {
    fill(255,0,255,100)
    let tempWidth = window.innerWidth/10;
    let tempHeight = tempWidth/1.8;
    let padding = 25;
    let tempPosX = window.innerWidth - tempWidth  * 1.4
    let tempPosY = window.innerHeight - tempHeight - padding;
    if(mouseIsHover(tempPosX, tempPosY, tempWidth, tempHeight) && mouseIsPressed === true ){
        image(uiData[39].image, tempPosX, tempPosY, tempWidth, tempHeight);
    }else{
        image(uiData[12].image, tempPosX, tempPosY, tempWidth, tempHeight);
    }
    createInputButtonWithCallback(tempPosX, tempPosY, tempWidth, tempHeight, () => {
        endTurn(); eventOnTheTutorialEngine("nextTurn");
    })
}

//#region // * display abilities region

const displayAbility = () => {
    setAbilityPosition();
    let abilitySizeX = abilitySize // Width of ability
    let abilitySizeY = abilitySizeX*1.2 // Height of ability
    if(abilityIsOpen === true)
    {
        imageMode(CENTER); // Set the image in the center cause it's with Vector point who need to be more precise
        fill(0,0,255,100)
        for(let i = 0; i < playerTeam[0].abilities.length; i ++)
        {   
            var context = document.querySelector("canvas").getContext("2d"); // Set the context that we will interact with for glowing image
            let x = abilityPosition[i].x;
            let y = abilityPosition[i].y;
            // There is new value cause the rect and the function who input isn't in CENTER MODE :(
            let xInteract = x - abilitySizeX / 2
            let yInteract =  y - abilitySizeY / 2
            // rect(xInteract,yInteract,abilitySizeX,abilitySizeY) Debug Rect
            if(playerTeam[0].abilities[i].isLocked === false){
                createInputButtonWithCallback(xInteract, yInteract,abilitySizeX,abilitySizeY, () => {
                    eventOnTheTutorialEngine("selected"+i);
                    abilityIsOpen = false;
                    selectAbility(i);
                })
                if(mouseIsHover(xInteract, yInteract,abilitySizeX,abilitySizeY)){ 
                    updateInteractionIndex(i)
                    if(actualMapEngineTwo.entityOnTactical[0].pa <= 0)
                    {
                        tint(255 - 10*transitionLight[i], 255-10*transitionLight[i], 255-10*transitionLight[i])
                    }
                } 
                abilitySizeX = abilitySize + transitionLight[i];
                abilitySizeY = abilitySizeX * 1.2
                context.shadowBlur = transitionLight[i];
                context.shadowColor = "white";
                image(uiData[playerTeam[0].abilities[i].id].image, x, y, abilitySizeX, abilitySizeY)
            }else{
                abilitySizeX = abilitySize + transitionLight[i];
                abilitySizeY = abilitySizeX * 1.2
                context.shadowBlur = transitionLight[i];
                context.shadowColor = "white";
                tint(15);
                image(uiData[playerTeam[0].abilities[i].id].image, x, y, abilitySizeX, abilitySizeY)
                noTint();
                image(uiData[16].image, x, y, abilitySizeX, abilitySizeY)
            }

            /* On Hover Effect */
            // Set transition on Thing 
            
            noTint()
            context.shadowBlur = 0;

            if(transitionLight[i] > 0)
            {
                transitionLight[i] -= transitionSpeed/2;
            }

            if(mouseIsHover(xInteract, yInteract,abilitySizeX,abilitySizeY) && actualMapEngineTwo.entityOnTactical[0].pa <= 0){ 
                image(uiData[16].image, x, y, abilitySizeX, abilitySizeY)
            }

            abilitySizeX = abilitySize
            abilitySizeY = abilitySizeX * 1.2
        }
        imageMode(CORNER);
        noFill()
    }else{
        imageMode(CENTER);
        fill(0,0,255,100)
        for(let i = 0; i < playerTeam[0].abilities.length; i ++)
        {   
            let x = abilityPosition[i].x;
            let y = abilityPosition[i].y;
            if(playerTeam[0].abilities[i].isLocked === false){
                image(uiData[playerTeam[0].abilities[i].id].image, x, y, abilitySizeX, abilitySizeY)
            }else{
                tint(15);
                image(uiData[playerTeam[0].abilities[i].id].image, x, y, abilitySizeX, abilitySizeY)
                noTint();
                image(uiData[16].image, x, y, abilitySizeX, abilitySizeY)
            }
        }
        imageMode(CORNER);
        noFill()
    }
}

let updateInteractionIndex = (indexOfTransition) => {
    if(transitionLight[indexOfTransition] < 10)
    {
        transitionLight[indexOfTransition] += transitionSpeed;
    }
}

const setAbilityPosition = () => {
    if(abilityIsOpen === true)
    {
        for(let i = 0; i < playerTeam[0].abilities.length; i ++)
        {   
            let x = (window.innerWidth/2) - (abilitySize*1.25) +abilitySize*(i*1.25);
            let y = window.innerHeight-(abilitySize*1.2)

            vectorToGo = createVector(x, y)
            let vectorMoove = p5.Vector.lerp(vectorToGo, abilityPosition[i], 0.95);
            
            abilityPosition[i] = vectorMoove;
        }
    }else{
        for(let i = 0; i < playerTeam[0].abilities.length; i ++)
        {   
            let x = (window.innerWidth/2) - (abilitySize*0.75) +abilitySize*(i*0.75);
            let y = window.innerHeight;

            vectorToGo = createVector(x, y)
            let vectorMoove = p5.Vector.lerp(vectorToGo, abilityPosition[i], 0.95);
            
            abilityPosition[i] = vectorMoove;
        }
    }
}

const displayOpenAbility = () => {


    fill(255,0,255,100)
    let widthButton = 400;
    let heightButton = 100;
    let xPosButton = window.innerWidth/2-widthButton/2;
    let yPosButton = window.innerHeight-heightButton;


    let widthHover = widthButton;
    let heightHover = heightButton;
    let xPosHoverButton = xPosButton;
    let yPosHoverButton = yPosButton;

    if(abilityIsOpen)
    {
        widthHover = widthButton * 2.5;
        heightHover = heightButton * 4;
        xPosHoverButton = window.innerWidth/2-widthHover/2;
        yPosHoverButton = yPosButton-heightButton*2.6;
    }

    // rect(xPosHoverButton, yPosHoverButton, widthHover, heightHover) // Debug Display
   

    if(mouseIsHover(xPosHoverButton, yPosHoverButton, widthHover, heightHover) === true)
    {
        abilityIsOpen = true
    }else{
        abilityIsOpen = false
    }
    noFill()
}

const selectAbility = (ability) => {
    if(actualMapEngineTwo.entityOnTactical[0].pa > 0)
    {
        switch(playerTeam[0].abilities[ability].type)
        {
            case "heal":
                attackWithTheCurrentAbility(actualMapEngineTwo.entityOnTactical[0], ability, actualMapEngineTwo.entityOnTactical[0])
                break;
            default :
                resetMovableAndEntityVar();
                getAttackableCase(actualMapEngineTwo.entityOnTactical[0].pos[0], actualMapEngineTwo.entityOnTactical[0].pos[1], playerTeam[0].abilities[ability].range)
                selectedAbility = ability;
                break;
        }
    }
}

//#endregion
