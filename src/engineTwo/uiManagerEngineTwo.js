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

//#region // * Different States UI Display Region


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

const displayEngineTwoEndFightUi = () => {
    displayEndFight();
}



//#endregion



//#region // * PlayingGame UI Region



const displayGameUi = () => {
    if(isCinematicFightIsRunning()) return; // If there is a cinematic, i just return the function and don't show the reste of the UI
    displayOpenAbility()
    displayAbility()
    displayPlayerInformationUiEngineTwo()
    displayEnnemyInformationUiEngineTwo()
    displayEndTurnButton();
}



const displayEnnemyInformationUiEngineTwo = () => {
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
        console.log(xBar)
        showBarWithPercentUi(xBar, yBar, barSize, percentLifeOfEntity+0.00001);

        let percentPmOfPlayer = entityToShow.pm / 2 +0.00001;
        tint(35,255,35)
        showBarWithPercentUi(xBar, yBar+barSize/10, barSize, percentPmOfPlayer);

        let percentPaOfPlayer = entityToShow.pa / 2 +0.00001;
        tint(35,35,255)
        showBarWithPercentUi(xBar, yBar+(barSize/10)*2, barSize, percentPaOfPlayer);
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
    
    showBarWithPercentUi(xBar, yBar, barSize, percentLifeOfPlayer);

    let percentPmOfPlayer = actualMapEngineTwo.entityOnTactical[0].pm / 2 +0.00001;
    tint(35,255,35)
    showBarWithPercentUi(xBar, yBar+barSize/10, barSize, percentPmOfPlayer);

    let percentPaOfPlayer = actualMapEngineTwo.entityOnTactical[0].pa / 2 +0.00001;
    tint(35,35,255)
    showBarWithPercentUi(xBar, yBar+(barSize/10)*2, barSize, percentPaOfPlayer);

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


const displayEndFight = () => {
    let size = window.innerHeight/1.5;
    showEnemiesEndFightList(size);
    showPlayer(size);
    showButtonFightEnd();
}

const showEnemiesEndFightList = (size) => {
    let xPosition = window.innerWidth / 2 - size / 2 - 1
    let yPosition = (window.innerHeight) / 2
    imageMode(CENTER)
    for(let i = 1; i < actualMapEngineTwo.entityOnTactical.length; i++)
    {
        let sizeIterate = i-1;
        let xPositionSprite = xPosition + size*sizeIterate
        animationIdleSprite(xPositionSprite, yPosition, size/1.25, [0, 1], actualMapEngineTwo.entityOnTactical[i].id)
    }
    imageMode(CORNER)
    noTint();
}

const showPlayer = (size) => {
    let x = window.innerWidth / 2 - size / 2
    let y = (window.innerHeight) / 2 - size / 2
    animationIdleSprite(x, y, size, [0, 1], 0)
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
        launchEngine(EngineStateEnum.EngineOne);
    })
    textAlign(CENTER, CENTER)
    textSize(40); fill(255);
    text("End Fight", xStart, yPosition, width, height)
    textAlign(LEFT, CENTER)
}


// * -----------------------------
// * -----------------------------

const displayEndTurnButton = () => {
    fill(255,0,255,100)
    let tempSize = window.innerWidth/12;
    let padding = 25;
    let tempPosX = window.innerWidth - tempSize  * 1.5
    let tempPosY = window.innerHeight - tempSize - padding;

    image(uiData[12].image, tempPosX, tempPosY, tempSize, tempSize);
    createInputButtonWithCallback(tempPosX, tempPosY, tempSize, tempSize, () => {
        endTurn();
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

            createInputButtonWithCallback(xInteract, yInteract,abilitySizeX,abilitySizeY, () => {

                abilityIsOpen = false;
                selectAbility(i);
            })

            if(mouseIsHover(xInteract, yInteract,abilitySizeX,abilitySizeY)){ 
                updateInteractionIndex(i)
                if(actualMapEngineTwo.entityOnTactical[0].pa <= 0)
                {
                    tint(255 - 10*transitionLight[i], 255-10*transitionLight[i], 255-10*transitionLight[i])
                }
            } /* On Hover Effect */
            // Set transition on Thing 
            abilitySizeX = abilitySize + transitionLight[i];
            abilitySizeY = abilitySizeX * 1.2
            context.shadowBlur = transitionLight[i];
            context.shadowColor = "white";

            image(uiData[playerTeam[0].abilities[i].id].image, x, y, abilitySizeX, abilitySizeY)
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
            image(uiData[playerTeam[0].abilities[i].id].image, x, y, abilitySizeX, abilitySizeY)
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
        resetMovableAndEntityVar();
        getAttackableCase(actualMapEngineTwo.entityOnTactical[0].pos[0], actualMapEngineTwo.entityOnTactical[0].pos[1], playerTeam[0].abilities[ability].range)
        selectedAbility = ability;
    }
}

//#endregion
