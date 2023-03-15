
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

const animationPlayerMooveSprite = (positionX, positionY, size, direction, id = 0) => {

    let spritePlayerAnimationMoove = spritesData[id].image.get(0,0,spriteSizeCut,spriteSizeCut); // naturally set sprite player animation to idle
    

    switch(direction[0]){
        case 1 :
            playerLastDirection = [1, 0]
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),spriteSizeCut,spriteSizeCut,spriteSizeCut);
            break;
        case -1 :
            playerLastDirection = [-1, 0]
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),spriteSizeCut*2,spriteSizeCut,spriteSizeCut);
            break;
        case 0 :
            break;
        default :
            throw new Error("failed to animate the sprite, there is an error in the X direction array, the id of the sprite who don't want to be animate is " + id);
    }// set animation for X direction

    switch(direction[1]){
        case -1 :
            playerLastDirection = [0, -1]
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),spriteSizeCut*3,spriteSizeCut,spriteSizeCut);
            break;
        case 1 :
            playerLastDirection = [0, 1]
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),0,spriteSizeCut,spriteSizeCut);
            break;
        case 0 :
            break;
         default :
            throw new Error("failed to animate the sprite, there is an error in the Y direction array, the id of the sprite who don't want to be animate is " + id);
    }// set animation for Y direction


    image(spritePlayerAnimationMoove, positionX, positionY, size, size)
}

const animationMooveSprite = (positionX, positionY, size, direction, id = 0) => {
    switch(direction[0]){
        case 1 :
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),spriteSizeCut,spriteSizeCut,spriteSizeCut);
            break;
        case -1 :
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),spriteSizeCut*2,spriteSizeCut,spriteSizeCut);
            break;
        case 0 :
            break;
        default :
            throw new Error("failed to animate the sprite, there is an error in the X direction array, the id of the sprite who don't want to be animate is " + id);
    }// set animation for X direction

    switch(direction[1]){
        case -1 :
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),spriteSizeCut*3,spriteSizeCut,spriteSizeCut);
            break;
        case 1 :
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),0,spriteSizeCut,spriteSizeCut);
            break;
        case 0 :
            break;
         default :
            throw new Error("failed to animate the sprite, there is an error in the Y direction array, the id of the sprite who don't want to be animate is " + id);
    }// set animation for Y direction


    image(spritePlayerAnimationMoove, positionX, positionY, size, size)
}

const animationFightprite = (positionX, positionY, size, direction = [0, 1], id = 0) => {
    let fightAmount = 4;
    updateFightAnimationIndex();
    xStartCut = spriteSizeCut*Math.floor(playerFightAnimationIndex);
    switch(direction[0]){
        case 1 :
            spritePlayerAnimationMoove = spritesData[id].image.get(xStartCut,spriteSizeCut* (1 + fightAmount),spriteSizeCut,spriteSizeCut);
            break;
        case -1 :
            spritePlayerAnimationMoove = spritesData[id].image.get(xStartCut,spriteSizeCut*(2 + fightAmount),spriteSizeCut,spriteSizeCut);
            break;
        case 0 :
            break;
        default :
            throw new Error("failed to animate the sprite, there is an error in the X direction array, the id of the sprite who don't want to be animate is " + id);
    }// set animation for X direction

    switch(direction[1]){
        case -1 :
            spritePlayerAnimationMoove = spritesData[id].image.get(xStartCut,spriteSizeCut*(3 + fightAmount),spriteSizeCut,spriteSizeCut);
            break;
        case 1 :
            spritePlayerAnimationMoove = spritesData[id].image.get(xStartCut,spriteSizeCut* fightAmount,spriteSizeCut,spriteSizeCut);
            break;
        case 0 :
            break;
         default :
            throw new Error("failed to animate the sprite, there is an error in the Y direction array, the id of the sprite who don't want to be animate is " + id);
    }// set animation for Y direction


    image(spritePlayerAnimationMoove, positionX, positionY, size, size)
}

// ---------------




let playerFightAnimationIndex = 0;
const updateFightAnimationIndex = () => {
    playerFightAnimationIndex += 0.1;

    if(fightAnimationIndexIsOutOfLength()) 
    {
        playerFightAnimationIndex = 0;
    }
}

const updateAnimationIndex = () => {
    playerAnimationIndex += 0.1;

    if(animationIndexIsOutOfLength()) 
    {
        playerAnimationIndex = 0;
    }
}

const animationIndexIsOutOfLength = () => playerAnimationIndex >= (playerAnimationLength -1)

const fightAnimationIndexIsOutOfLength = () => playerFightAnimationIndex >= (playerAnimationLength -1)