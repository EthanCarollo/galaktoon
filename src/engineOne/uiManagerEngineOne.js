// * Display Screen

const displayUserInterface = () => {
    if(playerIsExploringMap === true){
        displayExploringMenu();
    }
}

// * Display Screen

// * Exploring Menu 

const displayExploringMenu = () => {
    fill(255,255,255)
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
    createInputButtonWithCallback(x, y, sizeX, sizeY, () => {
        let mapToExplore = mapData[planetsData[planetID].map]
        loadNewMap(mapToExplore, mapToExplore.start)
        exitExploringMenu()
    })
}

const exitCross = () => {
    fill(255,150,150)
    rect(75,20,40,40)
    createInputButtonWithCallback(75, 20, 40, 40, exitExploringMenu)
    noFill()
}

const exitExploringMenu = () => {
    playerCanMove = true
    playerIsExploringMap = false;
}

// * Exploring Menu 


const createInputButtonWithCallback = (xStartButton, yStartButton, sizeXButton, sizeYButton, callbackFunction = errorButton) => {
    if( mouseX > xStartButton && 
        mouseY > yStartButton && 
        mouseX < xStartButton + sizeXButton && 
        mouseY < yStartButton + sizeYButton && 
        mouseIsPressed === true )
    {
        callbackFunction()
    }
}


const errorButton = () => {
    throw new Error("This Button doesn't have a Function !")
}