// ************************ Player Animation

const showPlayerSprite = (positionX, positionY, spriteSize) => {

      let xSpritePosition = positionX - spriteSize / 2
      let ySpritePosition = positionY - spriteSize
        if(playerIsMooving === true){
            // animation "moove" when player moove
            animationMoovePlayerSprite(xSpritePosition, ySpritePosition, spriteSize, playerDirection[0])
        }else{
            // animation "idle" when player doesn't moove (when no key is pressed)
            animationIdlePlayerSprite(xSpritePosition, ySpritePosition, spriteSize, playerLastDirection);
        }

}

const animationIdlePlayerSprite = (positionX, positionY, size, direction) => {
    let idleSpriteAnimation;

    // ! /!\ switch don't take array, so i stringify it /!\ ! \\
    switch(direction.toString()){
        case "1,0":
            idleSpriteAnimation = spritesData[0].image.get(0,30,30,30)
            break;
        case "-1,0":
            idleSpriteAnimation = spritesData[0].image.get(0,60,30,30)
            break;
        case "0,-1":
            idleSpriteAnimation = spritesData[0].image.get(0,90,30,30)
            break;
        case "0,1":
            idleSpriteAnimation = spritesData[0].image.get(0,0,30,30)
            break;
        default :
            throw new Error("failed to animate the sprite, there is an error in the lastDirection var");
    }
    // ! /!\ switch don't take array, so i stringify it /!\ ! \\

    image(idleSpriteAnimation, positionX, positionY, size, size)
}

const animationMoovePlayerSprite = (positionX, positionY, size, direction) => {

    let spritePlayerAnimationMoove;

    switch(direction){
        case "right" :
            playerLastDirection = [1, 0]
            spritePlayerAnimationMoove = spritesData[0].image.get(30*Math.floor(playerAnimationIndex),30,30,30);
            break;
        case "left" :
            playerLastDirection = [-1, 0]
            spritePlayerAnimationMoove = spritesData[0].image.get(30*Math.floor(playerAnimationIndex),60,30,30);
            break;
        case "up" :
            playerLastDirection = [0, -1]
            spritePlayerAnimationMoove = spritesData[0].image.get(30*Math.floor(playerAnimationIndex),90,30,30);
            break;
        case "down" :
            playerLastDirection = [0, 1]
            spritePlayerAnimationMoove = spritesData[0].image.get(30*Math.floor(playerAnimationIndex),0,30,30);
            break;
        default :
            throw new Error("failed to animate the sprite, there is an error in the direction array");
    }

    image(spritePlayerAnimationMoove, positionX, positionY, size, size)
    playerAnimationIndex += 0.1;

    if(isOutOfLength()) 
    {
        playerAnimationIndex = 1;
    }
}

const isOutOfLength = () => playerAnimationIndex >= (playerAnimationLength -1)

const actualPlayerTile = () => [Math.floor((playerVector.x - (playerSpriteSize / 2)) / tileSize * -1), Math.floor((playerVector.y - (playerSpriteSize / 2.5)+10) / tileSize * -1)]

const getPlayerCollision = () => {
    // Check if the tile is empty, so we won't go further in the code and check if there is a collider and crash the game cause an empty tile doesn't have collider :'(
    if(tileIsEmpty(actualPlayerTile()[0], actualPlayerTile()[1])){
        return true
    }

    return getTileData(actualPlayerTile()[0], actualPlayerTile()[1]).collider
}

// With this code, if the player is out of range of the array or the value of the tile isn't defined, he won't be able to go further

// ************************ Player Animation

// ************************ Player Interaction

const interactWithATile = () => {
    // this is the reason why my playerLastDirection is an array
    let interactedTile = getTileData(actualPlayerTile()[0] + playerLastDirection[0], actualPlayerTile()[1] + playerLastDirection[1]) // get the information of the tile that the player is looking for

    switch(interactedTile.type){
        case "explore":
            // explore function
            break;
        case "build":
            // build function
            break;
        case "craft1":
            // craft level 1 function
            break;
        case "useless":
            break;
        default :
            throw new Error
                ("The player is interacting with nothing which is impossible if all are doing well, so it's probably an exception with the parameter type of the tile : ' " + interactedTile.type + " ' ")
    }
}

// ************************ Player Interaction