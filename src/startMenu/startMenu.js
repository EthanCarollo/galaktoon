const showStartMenu = () => {
    switch(startMenuState)
    {
        case StartMenuStateEnum.Loading : 
            runLoadingStartMenuState();
            break;
        case StartMenuStateEnum.Normal :
            runNormalStartMenuState();
            break;
    }
}



//#region // * Different start menu state region



const runLoadingStartMenuState = () => {
    updateLogoIndexAnimation();
    showBackgroundGalaxy();
    showLogo();
    showLoadingBarState();
}



const runNormalStartMenuState = () => {
    updatePositionLogo([0, -300]);
    updateLogoIndexAnimation(-100);
    showBackgroundGalaxy();
    showChoiceStartMenuState();
    showLogo(logoOffSet);
}



//#endregion

const showLoadingBarState = () => {
    /**
     * * This function is the reason why using totalLoadCounter variable is usefull, i just take the total length of the ressource to load
     * * and then i just divide it to have the "%" of completion of the load, in that case, i can know which ressource is actually loading
     * * cause i have type for every elements in the ressourceToLoad array, this function use the loading bar opacity, in that case
     * * because the load assets function take 1000 ms to set the startMenu state to Normal, i can decrease the loadingBarOpacity int
     * * So the loading bar disappear
     */
    if(totalLoadCounter >= ressourceToLoad.length )
    {
        loadingBarOpacity -= 5;
    }
    
    let progression = totalLoadCounter / ressourceToLoad.length 
    let xWidth = window.innerWidth /1.25;
    let yHeight = xWidth / 40;
    let xStart = window.innerWidth / 2 - xWidth / 2
    let yStart = window.innerHeight - yHeight * 1.5

    tint(255,loadingBarOpacity);
    image(uiData[28].image, xStart, yStart, xWidth, yHeight)
    image(uiData[30].image, xStart, yStart, xWidth*progression, yHeight)
    image(uiData[29].image, xStart, yStart, xWidth, yHeight)
    textAlign(CENTER, CENTER)
    noTint();
    fill(255,loadingBarOpacity)
    text(totalLoadCounter + " / " + ressourceToLoad.length + " // Actually loading : " + ressourceToLoad[totalLoadCounter-1].typeOfRessource, xStart, yStart, xWidth, yHeight )
    fill(255)
}




const showChoiceStartMenuState = () => {
    /**
     * * This function show differents choice we have in the startMenuChoices and it
     * * also uses the callback when we click on the button, it also show use an hover effect
     * * on the button, id 18 is the normal button without color and the 27 is the button with
     * * the higlights on the border
     */
    let width = 250*2;
    let height = width/5;
    let xStart = window.innerWidth /2  - width / 2;
    let yStart = window.innerHeight/2 - height-20;
    for(let i = 0; i < startMenuChoices.length; i++)
    {
        let yPosition =  yStart + (height+35) * i
        image(uiData[18].image, xStart, yPosition, width, height)
        if(mouseIsHover(xStart, yPosition, width, height) === true)
        {
            image(uiData[27].image, xStart, yPosition, width, height)
        }
        fill(255, 255, 255)
        textAlign(CENTER, CENTER);
        textSize(28);
        text(startMenuChoices[i].text, xStart, yPosition, width, height)
        createInputButtonWithCallback(xStart, yPosition, width, height, startMenuChoices[i].callback)
    }
    textAlign(TOP, LEFT);
}



/**
 * @param {int} idBackground id of the background in the ui data
 */
const showBackgroundGalaxy = (idBackground = 26) => {
    image(uiData[idBackground].image, 0, 0, windowWidth, windowHeight)
    // applyBrightnessTemp(uiData[idBackground].image)
}



/**
 * @param {array[int]} offset [x, y] this is the offset of the show logo func
 */
const showLogo = (offset = [0, 0]) => {
    let xStart = windowWidth / 2 + offset[0];
    let yStart = windowHeight /3 - indexLogoStartMenu / 2 + offset[1];
    let size = windowHeight/3 + indexLogoStartMenu;
    rect(xStart - size/2, yStart, size, size) // TODO : Replace this rect with the logo
}



/**
 * * This will just update the index of the animation of the logo
 * @param {int} sizeToGo this is the size that the logo will try to touch 
 */
const updateLogoIndexAnimation = (sizeToGo = maxSizeOfTheLogo) => {
    /**
     * * Here, i'm just using the vector lerp like a transition with the xPos of the Vector2 
     */

    let vectorSize;
    vectorSize = p5.Vector.lerp(createVector(indexLogoStartMenu, 0), createVector(sizeToGo, 0), 0.04); // interpolate the camera with the player by using vector.lerp by p5

    indexLogoStartMenu = vectorSize.x;
}


/**
 * @param {array[float]} positionToGo this is the position that the logo will try to touch ([x , y])
 */
const updatePositionLogo = (positionToGo = [0, 0]) => {
    let vectorToGo;
    vectorToGo = p5.Vector.lerp(createVector(logoOffSet[0], logoOffSet[1]), createVector(positionToGo[0], positionToGo[1]), 0.04); // interpolate the camera with the player by using vector.lerp by p5

    logoOffSet = [vectorToGo.x, vectorToGo.y];
}