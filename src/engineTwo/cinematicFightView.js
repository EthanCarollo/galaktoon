const runCinematicFightView = () => {
    switch(fightCinematicViewState){
        case FightCinematicViewStateEnum.NoAnim:
            return false;
        case FightCinematicViewStateEnum.Animation:
            runClassicCinematic(); 
            break;
        default : 
            throw new Error("actual fight cinematic view sate isn't actually set")
    }
    return true;
}

/**
 * * For every animation and cinematic for the cinematic fight view, i just have a function that display cinematic on every animation
 * * Animation is called on specific attacks
 */

const runClassicCinematic = () => {
    let widthRectAnimation = window.innerWidth / 1.5, heightRectAnimation = window.innerHeight / 1.25
    let xStartRectAnimation = window.innerWidth / 2 - widthRectAnimation / 2
    let yStartRectAnimation = window.innerHeight / 2 - heightRectAnimation / 2
    rect(xStartRectAnimation, yStartRectAnimation, widthRectAnimation, heightRectAnimation);
    showMapOnAnimationSpecific(xStartRectAnimation, yStartRectAnimation, widthRectAnimation, heightRectAnimation);
    showAnimationOnSpecificAnimation(xStartRectAnimation, yStartRectAnimation, widthRectAnimation, heightRectAnimation);
}


/**
 * * Display map on specific animation logics
 */

const showMapOnAnimationSpecific = (xStartOfMap, yStartOfMap, widthMap, heightMap) => {
    let tileMultiplier = 10;
    let sizeTileOnRect = widthMap / tileMultiplier;
    let yStartTile = yStartOfMap+heightMap-sizeTileOnRect;
    console.log(widthMap + " ---- " + heightMap)
    stroke(255);
    for(let y = 0; y < 3; y++)
    {
        for(let x = 0; x < tileMultiplier; x ++)
        {
            image(actualMapEngineTwoRessource.tileRessource[2].image, xStartOfMap+sizeTileOnRect*x, yStartTile-sizeTileOnRect*y, sizeTileOnRect, sizeTileOnRect)
        }
    }
}

const showAnimationOnSpecificAnimation = (xStartOfMap, yStartOfMap, widthMap, heightMap) => {

    let tileMultiplier = 7;
    let tileSize = widthMap / 10;
    let sizeSprite = widthMap / tileMultiplier * 1.2;

    let offSetX = (sizeSprite - widthMap / 10) / 2 - tileSize * AnimationsList[0].position[0]

    let startX = xStartOfMap - offSetX;
    let startY = yStartOfMap+heightMap-sizeSprite - tileSize * AnimationsList[0].position[1];
    rect(startX, startY, sizeSprite, sizeSprite)
    runSpecificAnimationFromASprite(startX, startY, sizeSprite, 17, AnimationsList[0].animations[0].frameSpeed[Math.floor(specificAnimationIndex)])
}