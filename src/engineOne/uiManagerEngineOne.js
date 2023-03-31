// * Display Screen

const displayUserInterfaceEngineOne = () => {
    displayPlayerInformationUI()
    displayExploringMenu();
    if(playerIsExploringMap === true){
        setVectorLerpEaseInExploringMenu();
    }else{
        setVectorLerpEaseOutExploringMenu();
        showQuestList();
    }
}

// * Display Screen

// * Player Information

const displayPlayerInformationUI = () => {

    let tempSize = 150
    let tempPosX = window.innerWidth - tempSize - 40 
    let tempPosXForHealth = tempPosX-12.5;
    let tempPosY = 20;
    let percentLifeOfPlayer = playerTeam[0].health.actualHealth / playerTeam[0].health.maxHealth +0.00001;
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


let vector2ExploringMenu;
const displayExploringMenu = () => {
    fill(0,0,0,155)
    let xSizeBg = window.innerHeight /1.75;
    let ySizeBg = window.innerHeight;

    let xPosition = vector2ExploringMenu.x;

    let padding = 100;
    let paddingInner = 40;
    image(uiData[23].image, xPosition+padding/2,padding/2,xSizeBg-padding,ySizeBg-padding)
    for(let i =0; i < planetsData.length; i++)
    {
        let xSizePlanets = xSizeBg-padding-paddingInner;
        let ySizePlanets = (xSizeBg-padding-paddingInner)/3.85;
        createPlanetMenuObject(xPosition+padding/2+paddingInner/2,(padding/2+paddingInner/2)+125*i,xSizePlanets, ySizePlanets, i)
    }
    exitCross();
}

const setVectorLerpEaseInExploringMenu = () => {
    vectorToCover = createVector(0, 0);
    vectorMoove = p5.Vector.lerp(vectorToCover, vector2ExploringMenu, 0.8);
    vector2ExploringMenu = vectorMoove;
}
const setVectorLerpEaseOutExploringMenu = () => {
    vectorToCover = createVector(-500, 0);
    vectorMoove = p5.Vector.lerp(vectorToCover, vector2ExploringMenu, 0.8);
    vector2ExploringMenu = vectorMoove;
}

const createPlanetMenuObject = (x, y, sizeX, sizeY, planetID) => {
    image(uiData[22].image, x, y, sizeX, sizeY)
    noFill()
    fill(255,255,255)
    textSize(25);
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
    image(uiData[24].image, 75+vector2ExploringMenu.x,15,45,45)
    createInputButtonWithCallback(75, 20, 45, 45, exitExploringMenu)
    textSize(20);
}

const exitExploringMenu = () => {
    vector2ExploringMenu.x = 0;
    playerCanMove = true;
    playerIsExploringMap = false;
}

// * Exploring Menu 
