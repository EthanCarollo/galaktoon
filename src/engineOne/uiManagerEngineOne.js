// * Display Screen

const displayUserInterfaceEngineOne = () => {
    displayPlayerInformationUI()
    if(playerIsExploringMap === true){
        displayExploringMenu();
    }
}

// * Display Screen

// * Player Information

const displayPlayerInformationUI = () => {

    let tempSize = 150
    let tempPosX = window.innerWidth - tempSize - 40 
    let tempPosXForHealth = tempPosX-12.5;
    let tempPosY = 20;
    let percentLifeOfPlayer = playerTeam[0].hp.current / playerTeam[0].hp.max +0.00001;
    image(uiData[7].image, tempPosX, tempPosY ,tempSize, tempSize)
    showHealthBehindRectUI(tempPosXForHealth, tempPosY, tempSize, percentLifeOfPlayer)
    showLevelUI(tempPosX, tempPosY, tempSize, playerTeam[0].level);

}

const showLevelUI = (x, y, spriteSize, level) => {
    let characterLevel = level;
    let caseLevel = uiData[8].image;
    let caseSize = 35;
    let xCase = x+spriteSize-caseSize;
    let yCase = y+spriteSize-(caseSize/1.75);
    image(caseLevel, xCase, yCase, caseSize, caseSize)
    textAlign(CENTER, CENTER)
    fill(255)
    textSize(12)
    text(characterLevel, xCase, yCase, caseSize, caseSize)
    textAlign(LEFT, BASELINE)
}


const showHealthBehindRectUI = (posX, posY, size, percentOfLife) => {
    image(uiData[3].image, posX, posY+5, size+25, size+25)
    image(uiData[0].image, posX, posY+5, (size+25)*percentOfLife, size+25)
    image(uiData[2].image, posX, posY+5, size+25, size+25)
}

const showBarWithPercentUi = (posX, posY, size, percentOfLife) => {
    image(uiData[14].image, posX, posY+5, (size)*percentOfLife, size/12)
    noTint()
    image(uiData[13].image, posX, posY+5, size, size/12)
}

// * Player Information

// * Exploring Menu 

const displayExploringMenu = () => {
    fill(0,0,0,155)
    rect(50,50,400,800)
    for(let i =0; i < planetsData.length; i++)
    {
        createPlanetMenuObject(75,75+125*i,350,100, i)
    }
    exitCross();
}

const createPlanetMenuObject = (x, y, sizeX, sizeY, planetID) => {
    fill(200,55,55)
    rect(x,y,sizeX,sizeY)
    noFill()
    fill(55,200,55)
    textSize(40);
    textAlign(CENTER, CENTER)
    text(planetsData[planetID].name, x, y, sizeX, sizeY)
    textAlign(LEFT, BASELINE)
    noFill()
    let mapToExplore = mapData[planetsData[planetID].map]
    
    createShowTextOnHover(x, y, sizeX, sizeY, "Voyager vers")
    createInputButtonWithCallback(x, y, sizeX, sizeY, () => {loadMapAndExitExploringMenu(mapToExplore)})

}

const loadMapAndExitExploringMenu = (mapToExplore) => {
    loadNewMap(mapToExplore, mapToExplore.start)
    exitExploringMenu()
}

const exitCross = () => {
    fill(255,150,150)
    rect(75,20,40,40)
    createInputButtonWithCallback(75, 20, 40, 40, exitExploringMenu)
    textSize(20);
    fill(150,150,255)
    textAlign(LEFT,TOP);
    text("quit menu", 75, 20, 150,40)
    // text is temporary
    noFill()
}

const exitExploringMenu = () => {
    playerCanMove = true;
    playerIsExploringMap = false;
}

// * Exploring Menu 
