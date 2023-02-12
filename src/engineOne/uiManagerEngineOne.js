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
    // Show Health Bar
    image(uiData[3].image, tempPosXForHealth, 25, tempSize+25, tempSize+25)
    image(uiData[0].image, tempPosXForHealth, 25, (tempSize+25)*percentLifeOfPlayer, tempSize+25)
    image(uiData[2].image, tempPosXForHealth, 25, tempSize+25, tempSize+25)
    // Show Health Bar

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
    text("quit menu", 75, 20, 150,40)
    // text is temporary
    noFill()
}

const exitExploringMenu = () => {
    playerCanMove = true
    playerIsExploringMap = false;
}

// * Exploring Menu 
