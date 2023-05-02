// ************************ Player Animation

/**
 * @param {float} positionX 
 * @param {float} positionY 
 * @param {int} spriteSize 
 */
const showPlayerSprite = (positionX, positionY, spriteSize) => {
    /**
     * * Show the sprite and if he is mooving or not
     */
      let xSpritePosition = positionX - spriteSize / 2
      let ySpritePosition = positionY - spriteSize
        if(playerIsMooving === true){
            // animation "moove" when player moove
            animationMooveSprite(xSpritePosition, ySpritePosition, spriteSize, playerDirection, 0)
        }else{
            // animation "idle" when player doesn't moove (when no key is pressed)
            animationIdleSprite(xSpritePosition, ySpritePosition, spriteSize, playerLastDirection, 0);
        }

}



/**
 * @param {Vector2} offsetVectorBounds automatically to x 0 y 0, but it can be modified for the collision
 * @returns {array[int]} [x, y] position of the player in the tile grid
 */
const actualPlayerTile = (offsetVectorBounds = createVector(0, 0)) => 
[
 Math.floor((playerVector.x + offsetVectorBounds.x - (playerSpriteSize / 2)) / tileSize * -1), 
 Math.floor((playerVector.y + offsetVectorBounds.y - (playerSpriteSize / 2) + 20) / tileSize * -1) // y is a little bit offset (by 20) because the spriteY doesnt cut on yPixel = 0
]



/**
 * @param {Vector2} offsetVectorBounds automatically to x 0 y 0, but it can be modified for the collision
 * @returns {boolean} return true if it collided to somehting or false if not
 */
const getPlayerCollision = (offsetVectorBounds = createVector(0, 0)) => { // offsetVectorBounds is usefull in case we have different collision point on the player

    let actualPlayerTileWithOffsetBounds = actualPlayerTile(offsetVectorBounds)
    // Check if the tile is empty, so we won't go further in the code and check if there is a collider and crash the game cause an empty tile doesn't have collider :'(
    if(tileIsEmpty(actualPlayerTileWithOffsetBounds[0], actualPlayerTileWithOffsetBounds[1], actualPlayerMap.groundLayer)){
        return true
    }
    let tileCollided = getTileData(actualPlayerTileWithOffsetBounds[0], actualPlayerTileWithOffsetBounds[1], actualPlayerMap.objectLayer);
    if(tileCollided === undefined)
    {
        return false;
    }else{
        return getTileData(actualPlayerTileWithOffsetBounds[0], actualPlayerTileWithOffsetBounds[1], actualPlayerMap.objectLayer).collider
    }
}
// With this code, if the player is out of range of the array or the value of the tile isn't defined, he won't be able to go further



//#region // * Player Interaction region



/**
 * @param {array[int]} playerCaseInteract [x , y]
 */
const checkForInteraction = (playerCaseInteract) => {
    /**
     * * Check if the tile exist or if a pnj is on the tile, then create interaction popup
     */
    if(getTileData(playerCaseInteract[0], playerCaseInteract[1], actualPlayerMap.objectLayer) !== undefined)
    {
        if(getTileData(playerCaseInteract[0], playerCaseInteract[1], actualPlayerMap.objectLayer).type !== "useless")
            {
            let interactType = getTileData(playerCaseInteract[0], playerCaseInteract[1], actualPlayerMap.objectLayer).type;
            createInteractionPopup(playerCaseInteract[0], playerCaseInteract[1], interactType)

            return;
            }
    }
    
    // just for set pnj interactible
    let npcInteractible = getNpcOnTileInteraction(playerCaseInteract)
    if(npcInteractible.length > 0 && npcInteractible[0].state === "idle")
    {
        createInteractionPopup(npcInteractible[0].pos[0], npcInteractible[0].pos[1], npcInteractible[0].interaction)
    }
}



/**
 * @param {array[int]} caseInteraction [x, y] the case interaction
 */
const playerInteraction = (caseInteraction) => {
    if(interactWithATile(caseInteraction) === true) return;
    interactWithNPC(caseInteraction);
}



/**
 * @param {array} tileInteract [x, y] position of the tile interacted
 */
const interactWithATile = (tileInteract) => {

    /**
     * * This function is the principal reason why my playerLastDirection var is an array, in that case, we can easily recover the tile
     * * around him, so in our case we get the tileData with the function and we check if the tile is undefined or not so we can continue
     * * the function and then, big switch for a lot of interactions
     */

    let interactedTile = getTileData(tileInteract[0], tileInteract[1], actualPlayerMap.objectLayer) // get the information of the tile that the player is looking for

    if(interactedTile === undefined){
        return false;
    }
    switch(interactedTile.type){
        case "explore":
            if(playerCanExplore === true)
            {
                if(playerAlreadyExplore === false)
                {
                    launchTutorial(tutorialExplore);
                    playerAlreadyExplore = true;
                }else{
                    playerCanMove = false
                    uiEngineOneState = UiEngineOneStateEnum.IsExploring;
                }
                
            }
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
            // New Func
            break;
        case "goUpInSpaceShip":
            // New Func
            break;
        case "fight":
            // TODO : This is temporary for the debug
            launchFightOnEngineTwo(0)
            break;
        case "useBed":
            if(bedIsAlreadyUsed === false)
            {
                launchTutorial(tutorialBed);
                bedIsAlreadyUsed = true;
            }else{
                playSleepAnimation();
            }
            
            break;
        default :
            throw new Error
                ("The player is interacting with nothing which is impossible if all are doing well, so it's probably an exception with the parameter type of the tile : ' " + interactedTile.type + " ' ")
    }
    return true;
}



/**
 * @param {array} tileInteract [x, y] position of the tile interacted to check if a npc is on 
 */
const interactWithNPC = (tileInteract) => {
    /**
     * * Filter on the array of npcOnMap on playerOnMap var that contains all npc informations
     * * then we check if we have npc who we can interact with and if we have, we just take the
     * * first element of the array and we interact with
     */
    let npcInteracted = getNpcOnTileInteraction(tileInteract)
    if(npcInteracted.length > 0)
    {
        if(npcInteracted[0].isInteractible === true && npcInteracted[0].state === "idle"){
            launchInteractionOfNpc(npcInteracted[0])
        }
    }
}

const getNpcOnTileInteraction = (tileInteract) => {
    let npcInteracted = playerOnMap.npcOnMap.filter(npc => npc.pos[0] === tileInteract[0] && npc.pos[1] === tileInteract[1])

    if(npcInteracted.length === 0)
    {
        npcInteracted = playerOnMap.npcOnMap.filter(npc => actualPlayerTile()[0] === npc.pos[0] && actualPlayerTile()[1] === npc.pos[1])
    }

    return npcInteracted;
    
}

/**
 * @param {string} npcInteraction npc specific interaction
 */
const launchInteractionOfNpc = (npcInteraction) => {
    switch(npcInteraction.interaction)
    {
        case 'dialog' :
            launchNpcDialog(npcInteraction);
            break; 
        case 'none' :
            break;
        default :
            throw new Error("The interaction of the npc : " + npcInteraction + " isn't set. ")
    }
}



/**
 * @param {int} x 
 * @param {int} y 
 * @param {string} typeOfInteract 
 */
const createInteractionPopup = (x ,y ,typeOfInteract) => {
    /**
     * * Show the differents interaction by creating image on the 2D array using the 5th parameters of the function to true,
     * * which said that is UiImage and then load id 9 or 10 image in top of the tile interacted
     */
    switch(typeOfInteract){
        case "dialog" :
            createImageWithIdOn2dArray(x, y-1, 9, 65, true)
            break;
        case "none" :
            break;
        default:
            createImageWithIdOn2dArray(x, y-1, 10, 65, true)
            break;
    } // Create pop with the option true who said this is a UI image
}

//#endregion



/**
 * @returns {array[int]} [x, y] the tile next to the player
 */
const tileNextToThePlayer = () => [actualPlayerTile()[0] + playerLastDirection[0], actualPlayerTile()[1] + playerLastDirection[1]]



const playSleepAnimation = () => {
    /**
     * * Actually it doesn't play any animation but it's usefull to debug the playerHealth system
     * ! Will soon be deprecated
     * TODO : Update this function soon
     */
    playerTeam[0].health.actualHealth = playerTeam[0].health.maxHealth
}
