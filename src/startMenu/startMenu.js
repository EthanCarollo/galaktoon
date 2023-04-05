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
}



const runNormalStartMenuState = () => {
    updatePositionLogo([0, -300]);
    updateLogoIndexAnimation(-100);
    showBackgroundGalaxy();
    showLogo(logoOffSet);
}



//#endregion



/**
 * @param {int} idBackground id of the background in the ui data
 */
const showBackgroundGalaxy = (idBackground = 26) => {
    image(uiData[idBackground].image, 0, 0, windowWidth, windowHeight)
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
 */
const updateLogoIndexAnimation = (sizeToGo = maxSizeOfTheLogo) => {
    let vectorSize;
    vectorSize = p5.Vector.lerp(createVector(indexLogoStartMenu, 0), createVector(sizeToGo, 0), 0.04); // interpolate the camera with the player by using vector.lerp by p5

    indexLogoStartMenu = vectorSize.x;
}


const updatePositionLogo = (positionToGo = [0, 0]) => {
    let vectorToGo;
    vectorToGo = p5.Vector.lerp(createVector(logoOffSet[0], logoOffSet[1]), createVector(positionToGo[0], positionToGo[1]), 0.04); // interpolate the camera with the player by using vector.lerp by p5

    logoOffSet = [vectorToGo.x, vectorToGo.y];
}