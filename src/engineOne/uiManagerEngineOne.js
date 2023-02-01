// * Display Screen

const displayUserInterfaceEngineOne = () => {
    if(playerIsExploringMap === true){
        displayExploringMenu();
    }
}

// * Display Screen

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
    textSize(60);
    text(planetsData[planetID].name, x, y, 150)
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
    text("quit menu", 75, 20, 150)
    // text is temporary
    noFill()
}

const exitExploringMenu = () => {
    playerCanMove = true
    playerIsExploringMap = false;
}

// * Exploring Menu 
