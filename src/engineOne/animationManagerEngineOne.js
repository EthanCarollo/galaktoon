
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

const animationMooveSprite = (positionX, positionY, size, direction, id = 0) => {

    let spritePlayerAnimationMoove;
    // There is some new things to set up here like, if there is right and left direction, how is it animate.
    switch(direction){
        case "right" :
            playerLastDirection = [1, 0]
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),spriteSizeCut,spriteSizeCut,spriteSizeCut);
            break;
        case "left" :
            playerLastDirection = [-1, 0]
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),spriteSizeCut*2,spriteSizeCut,spriteSizeCut);
            break;
        case "up" :
            playerLastDirection = [0, -1]
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),spriteSizeCut*3,spriteSizeCut,spriteSizeCut);
            break;
        case "down" :
            playerLastDirection = [0, 1]
            spritePlayerAnimationMoove = spritesData[id].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),0,spriteSizeCut,spriteSizeCut);
            break;
        default :
            throw new Error("failed to animate the sprite, there is an error in the direction array");
    }

    image(spritePlayerAnimationMoove, positionX, positionY, size, size)
    playerAnimationIndex += 0.1;

    if(isOutOfLength()) 
    {
        playerAnimationIndex = 0;
    }
}

const isOutOfLength = () => playerAnimationIndex >= (playerAnimationLength -1)