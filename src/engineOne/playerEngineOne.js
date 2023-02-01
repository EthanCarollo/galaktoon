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
            idleSpriteAnimation = spritesData[0].image.get(0,spriteSizeCut,spriteSizeCut,spriteSizeCut)
            break;
        case "-1,0":
            idleSpriteAnimation = spritesData[0].image.get(0,spriteSizeCut*2,spriteSizeCut,spriteSizeCut)
            break;
        case "0,-1":
            idleSpriteAnimation = spritesData[0].image.get(0,spriteSizeCut*3,spriteSizeCut,spriteSizeCut)
            break;
        case "0,1":
            idleSpriteAnimation = spritesData[0].image.get(0,0,spriteSizeCut,spriteSizeCut)
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
            spritePlayerAnimationMoove = spritesData[0].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),spriteSizeCut,spriteSizeCut,spriteSizeCut);
            break;
        case "left" :
            playerLastDirection = [-1, 0]
            spritePlayerAnimationMoove = spritesData[0].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),spriteSizeCut*2,spriteSizeCut,spriteSizeCut);
            break;
        case "up" :
            playerLastDirection = [0, -1]
            spritePlayerAnimationMoove = spritesData[0].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),spriteSizeCut*3,spriteSizeCut,spriteSizeCut);
            break;
        case "down" :
            playerLastDirection = [0, 1]
            spritePlayerAnimationMoove = spritesData[0].image.get(spriteSizeCut*Math.floor(playerAnimationIndex),0,spriteSizeCut,spriteSizeCut);
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

const actualPlayerTile = (offsetVectorBounds = createVector(0, 0)) => 
[
 Math.floor((playerVector.x + offsetVectorBounds.x - (playerSpriteSize / 2)) / tileSize * -1), 
 Math.floor((playerVector.y + offsetVectorBounds.y - (playerSpriteSize / 2) + 25) / tileSize * -1) // y is a little bit offset (by 25) because the spriteY doesnt cut on yPixel = 0
] // this is a temporary messy function

const getPlayerCollision = (offsetVectorBounds = createVector(0, 0)) => { // offsetVectorBounds is usefull in case we have different collision point on the player

    let actualPlayerTileWithOffsetBounds = actualPlayerTile(offsetVectorBounds)
    // Check if the tile is empty, so we won't go further in the code and check if there is a collider and crash the game cause an empty tile doesn't have collider :'(
    if(tileIsEmpty(actualPlayerTileWithOffsetBounds[0], actualPlayerTileWithOffsetBounds[1])){
        return true
    }

    return getTileData(actualPlayerTileWithOffsetBounds[0], actualPlayerTileWithOffsetBounds[1]).collider
}

// With this code, if the player is out of range of the array or the value of the tile isn't defined, he won't be able to go further

// ************************ Player Animation

// ************************ Player Interaction

const interactWithATile = (tileInteract) => {
    // this is the reason why my playerLastDirection is an array
    let interactedTile = getTileData(tileInteract[0], tileInteract[1]) // get the information of the tile that the player is looking for
    switch(interactedTile.type){
        case "explore":
            playerCanMove = false
            playerIsExploringMap = true;
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
        case "goDownInSpaceShip":
            loadNewMap(mapData[1], mapData[1].start)
            break;
        case "goUpInSpaceShip": {
            loadNewMap(mapData[0], mapData[0].secondStart)
            break;
        }
        case "fight":{
            launchEngineTwo()
            break;
        }
        default :
            throw new Error
                ("The player is interacting with nothing which is impossible if all are doing well, so it's probably an exception with the parameter type of the tile : ' " + interactedTile.type + " ' ")
    }
}

const createInteractionPopup = (x ,y ,typeOfInteract) => {
    switch(typeOfInteract){
        default:
            createImageWithIdOn2dArray(x, y-1, 20, 65)
            break;
    }
}

// ************************ Player Interaction