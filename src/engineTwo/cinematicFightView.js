

const runCinematicFightView = () => {
    /**
     * * In this function, i just do a switch on the fightCinematicViewState using the enum FightCinematicViewStateEnum
     * * In that case, i can see different moment in the animation and set a start animation feature.
     */
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
    let yStartRectAnimation = window.innerHeight / 2 - heightRectAnimation / 2;
    if(cinematicIsShaking === true)
    {
        widthRectAnimation += getRandomInt(5) - getRandomInt(5);
        xStartRectAnimation += getRandomInt(5) - getRandomInt(5);
    }
    noStroke();
    //Stroke
    fill(255,255,255,255)
    rect(xStartRectAnimation-10, yStartRectAnimation-10, widthRectAnimation+20, heightRectAnimation+20);
    //Background
    fill(25,25,25,255)
    rect(xStartRectAnimation, yStartRectAnimation, widthRectAnimation, heightRectAnimation);
    fill(255,0,0,80)
    showMapOnAnimationSpecific(xStartRectAnimation, yStartRectAnimation, widthRectAnimation, heightRectAnimation);

    /**
     * * Boucle on every sprites the animations have to show them
     */

    showEverySpriteOnAnimationSpecific(xStartRectAnimation, yStartRectAnimation, widthRectAnimation, heightRectAnimation);
}



//#region // * Display map on specific animation logics Region



/**
 * @param {int} xStartRectAnimation 
 * @param {int} yStartRectAnimation 
 * @param {int} widthRectAnimation 
 * @param {int} heightRectAnimation 
 */
const showEverySpriteOnAnimationSpecific = (xStartRectAnimation, yStartRectAnimation, widthRectAnimation, heightRectAnimation) => {

    for(let i =0; i < cinematicUsed.sprites.length;i++)
    {
        if(i === cinematicUsed.order[indexCurrentOrderOfAnimation].spriteAnimate)
        {
            if(!cinematicUsed.isStopped)
            {
                mooveSpriteOnSpecificAnimationToPosition(cinematicUsed.sprites[i], cinematicUsed.order[indexCurrentOrderOfAnimation].nextPos)
                showAnimationOnSpecificAnimation(xStartRectAnimation, yStartRectAnimation, widthRectAnimation, heightRectAnimation);
            }else{ 
                showSpriteOnSpecificAnimation(xStartRectAnimation, yStartRectAnimation, widthRectAnimation, heightRectAnimation, i)
            }
        }else{
            showSpriteOnSpecificAnimation(xStartRectAnimation, yStartRectAnimation, widthRectAnimation, heightRectAnimation, i)
        }
    }

}



const showMapOnAnimationSpecific = (xStartOfMap, yStartOfMap, widthMap, heightMap) => {
    let tileMultiplier = 10;
    let sizeTileOnRect = widthMap / tileMultiplier;
    let yStartTile = yStartOfMap+heightMap-sizeTileOnRect;
    stroke(255);
    for(let y = 0; y < 3; y++)
    {
        for(let x = 0; x < tileMultiplier; x ++)
        {
            image(actualMapEngineTwoRessource.tileRessource[2].image, xStartOfMap+sizeTileOnRect*x, yStartTile-sizeTileOnRect*y, sizeTileOnRect, sizeTileOnRect)
        }
    }
}



const showAnimationOnSpecificAnimation = (xStartOfMap, yStartOfMap, widthMap, heightMap, currentIndexAnim = indexCurrentOrderOfAnimation) => {
    let currentAnimation = cinematicUsed
    let currentAnimationSprites = currentAnimation.sprites[currentAnimation.order[currentIndexAnim].spriteAnimate]
    let tileMultiplier = 7;
    let tileSize = widthMap / 10;
    let sizeSprite = widthMap / tileMultiplier * 1.2;

    let offSetX = (sizeSprite - widthMap / 10) / 2 - tileSize * currentAnimationSprites.position[0]

    let startX = xStartOfMap - offSetX;
    let startY = yStartOfMap+heightMap-sizeSprite - tileSize * currentAnimationSprites.position[1];


    let animation = currentAnimationSprites.animations[cinematicUsed.order[indexCurrentOrderOfAnimation].animation] // TODO : Animation to change here 

    if(runSpecificAnimationFromASprite(startX, startY, sizeSprite, animation.countAnimation, 
        animation.frameSpeed[Math.floor(specificAnimationIndex)],
        animation.idAnimation, currentAnimationSprites.idSprite) === false
        )
    {
        currentAnimationSprites.currentAnimation = animation.idAnimation;
        addIndexToCurrentOrderAnimation();
    }
}



const mooveSpriteOnSpecificAnimationToPosition = (sprite, nextPos) => {
    if(sprite.position[1] ===  nextPos[1] && sprite.position[0] === nextPos[0])
    {
        return;
    }
    let speed = cinematicUsed.order[indexCurrentOrderOfAnimation].speed
    if(sprite.position[0] < nextPos[0]) sprite.position[0] += speed;
    if(sprite.position[0] > nextPos[0]) sprite.position[0] -= speed;

    if(sprite.position[1] < nextPos[1]) sprite.position[1] += speed;
    if(sprite.position[1] > nextPos[1]) sprite.position[1] -= speed;

    if(Math.abs(sprite.position[0] - nextPos[0]) < 0.15)
    {
        sprite.position[0] = Math.round(sprite.position[0])
    }
    if(Math.abs(sprite.position[1] - nextPos[1]) < 0.15)
    {
        sprite.position[1] = Math.round(sprite.position[1])
    }
    
}



const showSpriteOnSpecificAnimation = (xStartOfMap, yStartOfMap, widthMap, heightMap, index) => {
    let currentAnimation = cinematicUsed
    let currentAnimationSprites = currentAnimation.sprites[index]
    let tileMultiplier = 7;
    let tileSize = widthMap / 10;
    let sizeSprite = widthMap / tileMultiplier * 1.2;

    let offSetX = (sizeSprite - widthMap / 10) / 2 - tileSize * currentAnimationSprites.position[0]

    let startX = xStartOfMap - offSetX;
    let startY = yStartOfMap+heightMap-sizeSprite - tileSize * currentAnimationSprites.position[1];

    if(currentAnimationSprites.currentAnimation !== null)
    {
        runSpecificAnimationFromASprite(startX, startY, sizeSprite, 3, 0, currentAnimationSprites.currentAnimation, currentAnimationSprites.idSprite)
        return;
    }
    animationIdleSprite(startX, startY, sizeSprite, [0, 1], currentAnimationSprites.idSprite)
}



const addIndexToCurrentOrderAnimation = () => {
    indexCurrentOrderOfAnimation++;
    // Setting the shaking to true to make the animation more reactive
    cinematicIsShaking = true;
    setTimeout(() => {
        cinematicIsShaking = false
    }, 200);

    if(indexCurrentOrderOfAnimation >= cinematicUsed.order.length)
    {
        indexCurrentOrderOfAnimation = 0;
        endAnimationCinematicFight(); // TODO : End the fight here, i need to find a better logic for launching that
    }
}



//#endregion



//#region // * State Animation Logics Region



/**
 * @param {int} indexAnimation, this is the index of the animation started by the attack
 */
const launchAnimationCinematicFight = (eventOnEnd = () => {},indexAnimation = 0) => {
    indexCurrentOrderOfAnimation = 0;
    cinematicUsed = JSON.parse(JSON.stringify(AnimationsList[indexAnimation]))
    fightCinematicViewState = FightCinematicViewStateEnum.Animation;
    callbackCinematic = eventOnEnd;
}



/**
 * * Set a little time out when there is no anim to animate, in that case the cinematic is still running
 */
const endAnimationCinematicFight = () => {
    cinematicUsed.isStopped = true;
    setTimeout(() => {
        fightCinematicViewState = FightCinematicViewStateEnum.NoAnim;
        callbackCinematic();
        callbackCinematic = () => { console.log("Callback cinematic isn't set")};
    }, 750); 
}



/**
 * @returns boolean if the cinematic is running, it's better for the code lisibility
 */
const isCinematicFightIsRunning = () => fightCinematicViewState !== FightCinematicViewStateEnum.NoAnim



//#endregion