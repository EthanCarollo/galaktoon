
//#region // * Global Animation Logics Region

/**
 * @param {float} positionX posX of the anim
 * @param {float} positionY posY of the anim
 * @param {float} size size of the animation
 * @param {array} direction direction is an array who looks like [0, 1], the 0 case is the x and the 1 case is the y,
 * if the param isn't between [-1, -1] && [1, 1], it will throw an error, this function actually hold the 'last direction' of a sprites
 * @param {int} id id of the current sprite animated, automatically to 0
 */
const animationIdleSprite = (positionX, positionY, size, direction, id = 0) => {
    let idleSpriteAnimation;
    /**
    * * I actually stringify the array in this function cause switch case doesn't take array in parameter, i use it in this case
    * * because last direction var taken in parameter is in most of case [0, 1] || [1, 0] || [0,-1] || [-1, 0] cause a direction 
    * * of somebody who doesn't moove cannot be diagonal on a grid. 
    */
    // ! /!\ switch don't take array, so i stringify it /!\ ! \\
    switch(direction.toString()){
        case "1,0":
            idleSpriteAnimation = spritesData[id].image.get(0,spriteSizeCut,spriteSizeCut,spriteSizeCut)
            break;
        case "-1,0":
            idleSpriteAnimation = spritesData[id].image.get(0,spriteSizeCut*2,spriteSizeCut,spriteSizeCut)
            break;
        case "0,-1":
            idleSpriteAnimation = spritesData[id].image.get(0,spriteSizeCut*3,spriteSizeCut,spriteSizeCut)
            break;
        case "0,1":
            idleSpriteAnimation = spritesData[id].image.get(0,0,spriteSizeCut,spriteSizeCut)
            break;
        default :
            throw new Error("failed to animate the sprite, there is an error in the lastDirection var, id of sprites : " +  id);
    }
    // ! /!\ switch don't take array, so i stringify it /!\ ! \\

    image(idleSpriteAnimation, positionX, positionY, size, size)
}



/**
 * @param {float} positionX posX of the anim
 * @param {float} positionY posY of the anim
 * @param {float} size size of the animation
 * @param {array} direction direction is an array who looks like [0, 1], the 0 case is the x and the 1 case is the y,
 * if the param isn't between [-1, -1] && [1, 1], it will throw an error
 * @param {int} id id of the current sprite animated, automatically to 0
 */
const animationMooveSprite = (positionX, positionY, size, direction, id = 0) => {
    /**
     * * This function is flexible for every sprites in the sprites.json. If the direction isn't good, it returns an error. 
     * * I don't use the same stringify i used the idle animation function cause the moovement can be diagonal.
     */
    if(direction.length > 2)
    {
        throw new Error("Direction isn't an array that contains x, y. It contains other elements. id of sprite failed to animate : " + id)
    }
    switch(direction[0]){
        case 1 :
            setEntityLastDirection([1, 0], id);
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),spriteSizeCut,spriteSizeCut,spriteSizeCut);
            break;
        case -1 :
            setEntityLastDirection([-1, 0], id);
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),spriteSizeCut*2,spriteSizeCut,spriteSizeCut);
            break;
        case 0 :
            break;
        default :
            throw new Error("failed to animate the sprite, there is an error in the X direction array, the id of the sprite who don't want to be animate is " + id);
    }// set animation for X direction

    switch(direction[1]){
        case -1 :
            setEntityLastDirection([0,-1], id);
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),spriteSizeCut*3,spriteSizeCut,spriteSizeCut);
            break;
        case 1 :
            setEntityLastDirection([0, 1], id);
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),0,spriteSizeCut,spriteSizeCut);
            break;
        case 0 :
            break;
         default :
            throw new Error("failed to animate the sprite, there is an error in the Y direction array, the id of the sprite who don't want to be animate is " + id);
    }// set animation for Y direction

    image(spritePlayerAnimationMoove, positionX, positionY, size, size)
}



/**
 * @param {array} direction the last direction
 * @param {int} entityId the entity targeted to set the last direction
 */
const setEntityLastDirection = (direction, entityId) => {
    /**
     * This function set the last direction of an entity
     */
    if(entityId === 0)
    {
        playerLastDirection = direction;
    }else{
        // TODO : Set the entity (other than the player) last direction here
    }
}



/**
 * @param {float} positionX posX of the anim
 * @param {float} positionY posY of the anim
 * @param {float} size size of the animation
 * @param {int} attackType type of the attack, must be between 0 or 3, automatically to 0
 * @param {int} id id of the current sprite animated, automatically to 0
 * @returns {boolean} if yes or not the animation is finish.
 */
const animationFightSprite = (positionX, positionY, size, attackType = 0, id = 0) => {

    //#region // * Documentation
    /**
    * * Every sprites can only have 4 types of attack, cause on the Sprite Sheet, we have the 4 first row taken by the sprite
    * * movement animation, then we have the next 4 taken by the attack and then we have the dead animation take on the 9th row.
    * * Also, this animation doesn't have different direction, it's because it takes too many times actually to animate every
    * * direction of every single attack, so we only have one direction that works pretty good.
    * * This function also return the updateFightAnimationIndex() func who is a boolean who said if the animation is finish or false,
    * * in that case we can know if yes or not the animation is finish.
    */
    //#endregion

    if(attackType < 0 || attackType > 3)
    {
        throw new Error("Tried to animate an attack that didn't exist on the sprite sheet");
    }

    const fightAmount = 4 + attackType; // FightAmount is the postion of the row

    xStartCut = spriteSizeCut*Math.floor(playerFightAnimationIndex);
    
    spritePlayerAnimationMoove = spritesData[id].image.get(xStartCut,spriteSizeCut* fightAmount,spriteSizeCut,spriteSizeCut);

    image(spritePlayerAnimationMoove, positionX, positionY, size, size)
    return updateFightAnimationIndex();
}



/**
 * @param {float} positionX posX of the anim
 * @param {float} positionY posY of the anim
 * @param {float} size size of the animation
 * @param {int} id id of the current sprite animated, automatically to 0
 */
const animationDeadSprite = (positionX, positionY, size, id = 0) => {
    //#region // * Documentation
    /**
    * * Every sprites just have one direction for death
    */
    //#endregion

    let offsetAnimAmount = 8;
    xStartCut = 0;
    // Dead animation just have one direction
    spritePlayerAnimationMoove = spritesData[id].image.get(xStartCut,spriteSizeCut* offsetAnimAmount,spriteSizeCut,spriteSizeCut);

    image(spritePlayerAnimationMoove, positionX, positionY, size, size)
}



//#endregion

//#region // * Run specific animation for the engine two Region



/**
 * @param {int} positionX 
 * @param {int} positionY 
 * @param {int} size 
 * @param {int} countOfFrame the count of frames animated
 * @param {int} indexAnimation the index of the animation on the grid (9 + indexAnimation) this cannot be negative normally
 * @param {int} id the id of the character animated
 */
const runSpecificAnimationFromASprite = (positionX, positionY, size, countOfFrame, speedFrame, indexAnimation = 0, id = 0) => {

    let offsetAnimAmount = 8+indexAnimation;
    xStartCut = 0+spriteSizeCut*Math.floor(specificAnimationIndex);
    spritePlayerAnimationMoove = spritesData[id].image.get(xStartCut,spriteSizeCut* offsetAnimAmount,spriteSizeCut,spriteSizeCut);
    if(speedFrame === 0)
    {
        spritePlayerAnimationMoove = spritesData[id].image.get(30*(countOfFrame-1),spriteSizeCut* offsetAnimAmount,spriteSizeCut,spriteSizeCut);
        image(spritePlayerAnimationMoove, positionX, positionY, size, size)
        return;
    }
    image(spritePlayerAnimationMoove, positionX, positionY, size, size)
    return updateSpecialAnimationIndex(countOfFrame, speedFrame/1.5);
}


//#endregion

//#region // * Animation Index Logics Region

/**
 * @returns {boolean} false if the animation restart, true if it is still running
 */
const updateFightAnimationIndex = () => {
    /**
     * This just update animation on every frames displayed by the window, when we +0.1 the index of animation,
     * we need to Math.floor (and not Math.round) if we wan't to use it properly
     */
    playerFightAnimationIndex += 0.1;

    if(indexIsOutOfLength(playerFightAnimationIndex)) 
    {
        playerFightAnimationIndex = 0;
        return false;
    }
    return true;
}



const updateSpecialAnimationIndex = (maxAnimationCount, speed = 0.1) => {
    specificAnimationIndex += speed;

    if(indexIsOutOfLength(specificAnimationIndex, maxAnimationCount)) 
    {
        specificAnimationIndex = 0;
        return false;
    }
    return true;
}



const updateAnimationIndex = () => {
    /**
     * This just update animation on every frames displayed by the window, when we +0.1 the index of animation,
     * we need to Math.floor (and not Math.round) if we wan't to use it properly, it's the same than the update fight
     * animation but it doesn't return true or false.
     */
    playerAnimationIndex += 0.1;

    if(indexIsOutOfLength(playerAnimationIndex)) 
    {
        playerAnimationIndex = 0;
    }
}

/**
 * @param {float} animationIndex the animation index we need to know if it's higher than the maximum frames authorized 
 * @returns {boolean} this boolean is if yes or not the 
 */
const indexIsOutOfLength = (animationIndex, max = playerAnimationLength) => animationIndex >= (max -1) 


//#endregion
