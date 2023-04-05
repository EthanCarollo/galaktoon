const showStartMenu = () => {
    updateLogoIndexAnimation();
    showBackgroundGalaxy();
    showLogo();
}

const showBackgroundGalaxy = (idBackground = 26) => {
    image(uiData[idBackground].image, 0, 0, windowWidth, windowHeight)
}

const showLogo = () => {
    let xStart = windowWidth / 2;
    let yStart = windowHeight /3 - indexLogoStartMenu / 2;
    let size = windowHeight/3 + indexLogoStartMenu;
    rect(xStart - size/2, yStart, size, size) // TODO : Replace this rect with the logo
}

/**
 * * This will just update the index of the animation of the logo
 */

const updateLogoIndexAnimation = () => {

    let vectorSize;
    vectorSize = p5.Vector.lerp(createVector(indexLogoStartMenu, 0), createVector(100, 0), 0.04); // interpolate the camera with the player by using vector.lerp by p5

    indexLogoStartMenu = vectorSize.x;
}