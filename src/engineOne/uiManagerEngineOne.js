

const displayUserInterfaceEngineOne = () => {
    /**
     * * Display the normal user interface for the engine One
     */
    switch(uiEngineOneState)
    {
        case UiEngineOneStateEnum.Normal :
            displayPlayerInformationUI();
            displayExploringMenu();
            showKeyboardPlayer();
            setVectorLerpEaseOutExploringMenu();
            showQuestList();
            break;
        case UiEngineOneStateEnum.IsExploring :
            displayPlayerInformationUI();
            displayExploringMenu();
            showKeyboardPlayer();
            setVectorLerpEaseInExploringMenu();
            break;
        case UiEngineOneStateEnum.Tutorial :
            showQuestList();
            showTutorialInterface();
            setVectorLerpEaseInExploringMenu();
            break;
        case UiEngineOneStateEnum.Dialoging :
            displayPlayerInformationUI();
            setVectorLerpEaseOutExploringMenu();
            showQuestList();
            break;
    }
}



//#region // * Player Informations Ui region

const displayPlayerInformationUI = () => {

    let tempSize = 150
    let tempPosX = window.innerWidth - tempSize - 40 
    let tempPosXForHealth = tempPosX-12.5;
    let tempPosY = 20;
    let percentLifeOfPlayer = playerTeam[0].health.actualHealth / playerTeam[0].health.maxHealth +0.00001;
    image(uiData[7].image, tempPosX, tempPosY ,tempSize, tempSize)
    showHealthBehindRectUI(tempPosXForHealth, tempPosY, tempSize, percentLifeOfPlayer)
}

const showHealthBehindRectUI = (posX, posY, size, percentOfLife, color = [255, 0, 0]) => {
    image(uiData[3].image, posX, posY+5, size+25, size+25)
    tint(color[0], color[1], color[2])
    image(uiData[0].image, posX, posY+5, (size+25)*percentOfLife, size+25)
    noTint()
    image(uiData[2].image, posX, posY+5, size+25, size+25)
}

/**
 * @param {int} posX 
 * @param {int} posY 
 * @param {int} size 
 * @param {int} percentOfLife 
 * @param {Object} innerValue is an object that contain : { current : 50, max : 100 }
 */
const showBarWithPercentUi = (posX, posY, size, percentOfLife, innerValue = null) => {
    image(uiData[14].image, posX, posY+5, (size)*percentOfLife, size/12)
    noTint()
    image(uiData[13].image, posX, posY+5, size, size/12)
    if(innerValue !== null)
    {
        fill(255)
        textAlign(CENTER, CENTER)
        textSize(12)
        text(innerValue.current + " / " + innerValue.max, posX, posY+5, size, size/12)
        textAlign(LEFT, TOP)
    }
}

//#endregion



//#region // * Exploring Menu Region


const displayExploringMenu = () => {
    fill(0,0,0,155)
    let xSizeBg = window.innerHeight /1.75;
    let ySizeBg = window.innerHeight;

    let xPosition = vector2ExploringMenu.x;

    let padding = 100;
    let paddingInner = 40;
    image(uiData[23].image, xPosition+padding/2,padding/2,xSizeBg-padding,ySizeBg-padding)
    let planetToExplore = planetsData.filter(value => {
        return playerOnMap.id !== value.map && value.isExplorable === true
    })
    for(let i =0; i < planetToExplore.length; i++)
    {
        let xSizePlanets = xSizeBg-padding-paddingInner;
        let ySizePlanets = (xSizeBg-padding-paddingInner)/3.85;
        createPlanetMenuObject(xPosition+padding/2+paddingInner/2,(padding/2+paddingInner/2)+125*i,xSizePlanets, ySizePlanets, planetToExplore[i])
    }
    exitCross();
}

const setVectorLerpEaseInExploringMenu = () => {
    vectorToCover = createVector(0, 0);
    vectorMoove = p5.Vector.lerp(vectorToCover, vector2ExploringMenu, 0.88);
    vector2ExploringMenu = vectorMoove;
}
const setVectorLerpEaseOutExploringMenu = () => {
    vectorToCover = createVector(-window.innerHeight /1.75, 0);
    vectorMoove = p5.Vector.lerp(vectorToCover, vector2ExploringMenu, 0.88);
    vector2ExploringMenu = vectorMoove;
}

const createPlanetMenuObject = (x, y, sizeX, sizeY, planet) => {
    image(uiData[22].image, x, y, sizeX, sizeY)
    if(mouseIsHover(x, y, sizeX, sizeY)){
        image(uiData[25].image, x, y, sizeX, sizeY)
    }
    noFill()
    fill(255,255,255)
    textSize(25);
    textAlign(CENTER, CENTER)
    text(planet.name, x, y, sizeX, sizeY)
    textAlign(LEFT, BASELINE)
    noFill()
    let mapToExplore = mapData[planet.map]
    //createShowTextOnHover(x, y, sizeX, sizeY, "Voyager vers")
    createInputButtonWithCallback(x, y, sizeX, sizeY, () => {loadMapAndExitExploringMenu(mapToExplore)})

}

const loadMapAndExitExploringMenu = (mapToExplore) => {
    loadNewMap(mapToExplore, mapToExplore.start)
    exitExploringMenu()
}

const exitCross = () => {
    fill(255,150,150)
    image(uiData[24].image, 75+vector2ExploringMenu.x,15,45,45)
    createInputButtonWithCallback(75+vector2ExploringMenu.x, 20, 45, 45, exitExploringMenu)
    textSize(20);
}

const exitExploringMenu = () => {
    vector2ExploringMenu.x = 0;
    playerCanMove = true;
    uiEngineOneState = UiEngineOneStateEnum.Normal
}

//#endregion



//#region // * Key Show Region



const showKeyboardPlayer = () => {
    if(keyboardIsShowing === false) return;
    let sizeKey = 100;
    let padding = 15
    showKeyOnScreen(window.innerWidth - (sizeKey + padding) , 
                    window.innerHeight- (sizeKey + padding) ,
                    sizeKey,
                    68,
                    "D")
    showKeyOnScreen(window.innerWidth - (sizeKey + padding) * 2, 
                    window.innerHeight - (sizeKey + padding) ,
                    sizeKey,
                    83,
                    "S")
    showKeyOnScreen(window.innerWidth - (sizeKey + padding) * 3, 
                    window.innerHeight - (sizeKey + padding) ,
                    sizeKey,
                    81,
                    "Q")
    showKeyOnScreen(window.innerWidth - (sizeKey + padding) * 2, 
                    window.innerHeight - (sizeKey + padding) * 2,
                    sizeKey,
                    90,
                    "Z")
    showKeyOnScreen(window.innerWidth - (sizeKey + padding), 
                    window.innerHeight - (sizeKey + padding) * 2,
                    sizeKey,
                    69,
                    "E")
}

const showKeyOnScreen = (xShow, yShow, size, inputKeyCode, keyName) => {
    textAlign(CENTER, CENTER)

    if(keyIsDown(inputKeyCode))
    {
        image(uiData[38].image, xShow, yShow - size * 0.1, size, size * 1.1)
        fill(0, 0, 0)
        text(keyName,xShow, yShow, size, size)

    }else{
        image(uiData[37].image, xShow, yShow - size * 0.1, size, size * 1.1)
        fill(255, 255, 255)
        text(keyName, xShow, yShow - size * 0.1, size, size)
    }

    noFill()
    textAlign(CORNER, CORNER)
}



//#endregion



//#region 



const launchTutorial = (tutorialText = null) => {
    if(tutorialText === null) throw new Error("Tutorial text isn't set, you need to set a text in parameter of the function.");
    tutorialInteractText = tutorialText
    uiEngineOneState = UiEngineOneStateEnum.Tutorial
    playerCanMove = false;
    playerCanInteract = false;
}

const showTutorialInterface = () => {
    let xSizeBg = window.innerHeight /1.75;
    let ySizeBg = window.innerHeight;
    let xPosition = window.innerWidth - (xSizeBg + vector2ExploringMenu.x);
    let padding = 100;

//
    fill(0, 150);
    let tutorialPosition = [(tileSize * playerLastDirection[0]) / 1.25, (tileSize * playerLastDirection[1])]
    let sizeRect = 250;
    rect(0, 0, window.innerWidth/2-sizeRect/2+tutorialPosition[0], window.innerHeight) // Border left
    rect(window.innerWidth/2+sizeRect/2+tutorialPosition[0], 0, window.innerWidth/2, window.innerHeight) // Border right
    
    rect(window.innerWidth/2-sizeRect/2+tutorialPosition[0],0,sizeRect,window.innerHeight/2-sizeRect/2 + tutorialPosition[1]) // top
    rect(window.innerWidth/2-sizeRect/2+tutorialPosition[0],window.innerHeight/2+sizeRect/2+tutorialPosition[1],sizeRect,window.innerHeight/2-sizeRect/2 - tutorialPosition[1]) // bot
//

    image(uiData[23].image, xPosition+padding/2, padding/2, xSizeBg-padding, ySizeBg-padding)
    fill(255); textSize(16); textAlign(CENTER)
    text(tutorialInteractText, xPosition+padding/2+50/2, padding/2+50/1.5, xSizeBg-padding-50, ySizeBg-padding-50)
    noFill(); textSize(15);
    showExitButtonOnTutorialInterface(xPosition+padding/2, padding/2, xSizeBg-padding, ySizeBg-padding)
}

const showExitButtonOnTutorialInterface = (x, y, width, height) => {
    let widthButton = 350;
    let heightButton = widthButton/5;

    let xPosition = x + width / 2 - widthButton / 2;
    let yPosition = y + height - heightButton * 1.5;
    image(uiData[18].image, xPosition, yPosition, widthButton, heightButton)
    if(mouseIsHover(xPosition, yPosition, widthButton, heightButton))
    {
        image(uiData[27].image, xPosition, yPosition, widthButton, heightButton)
    }
    textAlign(CENTER, CENTER)
    fill(255, 255, 255)
    text(quitTutorial, xPosition, yPosition, widthButton, heightButton)
    textAlign(LEFT, LEFT)
    noFill()

    createInputButtonWithCallback(xPosition, yPosition, widthButton, heightButton, endActualTutorial)
}

const endActualTutorial = () => {
    uiEngineOneState = UiEngineOneStateEnum.Normal
    playerCanMove = true;
    playerCanInteract = true;
    vector2ExploringMenu.x = -500;
}



//#endregion
