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
    console.log("display end")
    displayEndDebug();
}

const displayGameUi = () => {
    displayOpenAbility()
    displayAbility()
    displayPlayerInformationUiEngineTwo()
    displayEndTurnButton();
}

const displayEndDebug = () => {
    let size = 200;
    let x = (window.innerWidth/2) - (size/2)
    let y = (window.innerHeight) - (size)
    fill(255,0,0,100)
    rect(x ,y ,size ,size)
    createInputButtonWithCallback(x ,y ,size ,size, () => {
        returnEngineOneAfterFight();
    })
}

// * -----------------------------
// * -----------------------------

const displayPlayerInformationUiEngineTwo = () => {

    let tempSize = 125
    let padding = 25;
    let tempPosX = window.innerWidth/2 - tempSize *3.6
    let tempPosY = window.innerHeight - tempSize - padding;
    let percentLifeOfPlayer = playerTeam[0].hp.current / playerTeam[0].hp.max +0.00001;
    image(uiData[7].image, tempPosX, tempPosY ,tempSize, tempSize)
    let barSize = tempSize * 2;
    let xBar = tempPosX - barSize*1.05;
    let yBar = tempPosY;
    console.log(percentLifeOfPlayer)
    showBarWithPercentUi(xBar, yBar, barSize, percentLifeOfPlayer);

    let percentPmOfPlayer = actualMapEngineTwo.entityOnTactical[0].pm / 2 +0.00001;
    tint(35,255,35)
    showBarWithPercentUi(xBar, yBar+barSize/10, barSize, percentPmOfPlayer);

    let percentPaOfPlayer = actualMapEngineTwo.entityOnTactical[0].pa / 2 +0.00001;
    tint(35,35,255)
    showBarWithPercentUi(xBar, yBar+(barSize/10)*2, barSize, percentPaOfPlayer);

}

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
            context.shadowBlur = 0;
            if(transitionLight[i] > 0)
            {
                transitionLight[i] -= transitionSpeed/2;
            }
            noTint()
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

//

const displayOpenAbility = () => {


    fill(255,0,255,100)
    let widthButton = 400;
    let heightButton = 100;
    let xPosButton = window.innerWidth/2-widthButton/2;
    let yPosButton = window.innerHeight-heightButton;


    /*createInputButtonWithCallback(xPosButton, yPosButton, widthButton, heightButton, () => {
        endTurn();
    })*/

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

const displayEndTurnButton = () => {
    fill(255,0,255,100)
    let tempSize = 125
    let padding = 25;
    let tempPosX = window.innerWidth/2 + tempSize *3.6 - tempSize
    let tempPosY = window.innerHeight - tempSize - padding;

    image(uiData[12].image, tempPosX, tempPosY, tempSize, tempSize);
    createInputButtonWithCallback(tempPosX, tempPosY, tempSize, tempSize, () => {
        endTurn();
    })
}

const selectAbility = (ability) => {
    if(actualMapEngineTwo.entityOnTactical[0].pa > 0)
    {
        resetMovableAndEntityVar();
        getAttackableCase(actualMapEngineTwo.entityOnTactical[0].pos[0], actualMapEngineTwo.entityOnTactical[0].pos[1], playerTeam[0].abilities[ability].range)
        selectedAbility = ability;
    }
}