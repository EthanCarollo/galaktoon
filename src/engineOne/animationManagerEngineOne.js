
/**
 * @param {float} positionX posX of the anim
 * @param {float} positionY posY of the anim
 * @param {float} size size of the animation
 * @param {array} direction direction is an array who looks like [0, 1], the 0 case is the x and the 1 case is the y,
 * if the param isn't between [-1, -1] && [1, 1], it will throw an error
 * @param {int} id id of the current sprite animated, automatically to 0
 */
const animationIdleSprite = (positionX, positionY, size, direction, id = 0) => {
    let idleSpriteAnimation;

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
            throw new Error("failed to animate the sprite, there is an error in the lastDirection var");
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

const setEntityLastDirection = (direction, entityId) => {
    /**
     * This function set the last direction of an entity
     */
    if(entityId === 0)
    {
        playerLastDirection = direction;
    }else{
        // TODO : Set the entity last direction here
    }
}

/**
 * @param {float} positionX posX of the anim
 * @param {float} positionY posY of the anim
 * @param {float} size size of the animation
 * @param {int} attackType type of the attack, must be between 0 or 3, automatically to 0
 * @param {int} id id of the current sprite animated, automatically to 0
 * @returns {boolean}
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

    let offsetAnimAmount = 5;
    xStartCut = 0;
    // Dead animation just have one direction
    spritePlayerAnimationMoove = spritesData[id].image.get(xStartCut,spriteSizeCut* offsetAnimAmount,spriteSizeCut,spriteSizeCut);

    image(spritePlayerAnimationMoove, positionX, positionY, size, size)
}






// ? Animation Index Logics
//#region 

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



const updateAnimationIndex = () => {
    /**
     * This just update animation on every frames displayed by the window, when we +0.1 the index of animation,
     * we need to Math.floor (and not Math.round) if we wan't to use it properly, it's the same than the update fight
     * animation but it doesn't return true or false.
     */
    playerAnimationIndex += 0.1;

    if(indexIsOutOfLength(playerFightAnimationIndex)) 
    {
        playerAnimationIndex = 0;
    }
}

const indexIsOutOfLength = () => playerAnimationIndex >= (playerAnimationLength -1)

//#endregion
