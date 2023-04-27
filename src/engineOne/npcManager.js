
/**
 * @param {string} orientation string can be back or front, if it's not both of them, it will send an error
 * ! Method is Deprecated, now i use showSpecificNpcOnMap() in the for boucle when i display map
 */
const displayAllNPCOnMap = (orientation = "back") => {
  /**
   * ? How it works ?
   * * If the function is called with the parameter "back" the function just show the tile in back of the player
   * * but if it's "front" it will show the tiles in front of the player so if i put the playerShow function
   * * between these two functions, i will have illusion of depth
   * ! DEPRECATED METHOD
   */
    switch(orientation){
        case "back":
            for(let i = 0; i < playerOnMap.npcOnMap.length; i++){
                if(actualPlayerTile()[1] > playerOnMap.npcOnMap[i].pos[1])
                  {
                    displayNpc(playerOnMap.npcOnMap[i])
                  }
            }
            break;
        case "front":
            for(let i = 0; i < playerOnMap.npcOnMap.length; i++){
                if(actualPlayerTile()[1] <= playerOnMap.npcOnMap[i].pos[1])
                  {
                    displayNpc(playerOnMap.npcOnMap[i])
                  }
            }
            break;
        default :
            throw new Error("orientation isn't set : " + orientation);
    }
}


/**
 * @param {int} xPosition xPosition of the npc i want to show
 * @param {int} yPosition yPosition of the npc i want to show
 */
const showSpecificNpcOnMap = (xPosition, yPosition) => {
  /**
   * * Get the npc on the current tile position, this function is good because i can show my npc like
   * * there is a top down with depth and then display all the npc on the tile
   */
  let npcToDisplay = playerOnMap.npcOnMap.filter(npc => 
    Math.floor(npc.pos[0]) === xPosition && Math.floor(npc.pos[1]+1) === yPosition )
    if(npcToDisplay.length > 0)
    {
      for(let i = 0; i < npcToDisplay.length;i++)
      {
        displayNpc(npcToDisplay[i])
      }
    }
}



const displayNpc = (npc) => {
  let spriteNpcId = npcData[npc.id].spriteId
  let positionTemp = getCoordWithTileCoord(npc.pos[0]-1, npc.pos[1]-1)
  positionTemp.x = positionTemp.x + cameraVector.x + playerVector.x;
  positionTemp.y = positionTemp.y + cameraVector.y + playerVector.y;
  if(npc.nextCase !== null && npc.nextCase.length > 0)
  {
    npc.state = "moove";
  }
  if(npc.nextCase === null && npc.state === "moove")
  {
    launchEndMoovementEventNpc(npc);
    npc.state = "idle";
  }
  animateNpc(positionTemp.x, positionTemp.y, playerSpriteSize, npc.dir, spriteNpcId, npc)
    
}



/**
 * @param {int} x x pos of the npc on the map
 * @param {int} y y pos of the npc on the map
 * @param {int} size sze of the npc on the map
 * @param {array[int]} direction [x, y] contains the direction of the npc animated
 * @param {int} npcId string that contains npc id
 * @param {object} npc object that contains npc information
 */
const animateNpc = (x, y, size, direction /* ! = Array ! */, npcId, npc) => {
  /**
   * * Switch on the npc state and show different animation
   */

  switch(npc.state){
    case "idle" :
      animationIdleSprite(x, y, size, direction, npcId)
      break;
    case "moove" :
      if(mooveEntityToNextCaseInEngineOne(npc, createVector(cameraVector.x + playerVector.x, cameraVector.y + playerVector.y)) === true) // Using the "pathfinding" from the second Engine
      {
        animationMooveSprite(x, y, size, direction, npcId)
      }else{
        animationMooveSprite(x, y, size, direction, npcId)
      }
      break;
    case "pop" :
      if(runSpecificAnimationFromASprite(x, y, size, 9, 0.33, -1, npcId) === false) npc.state = 'idle';
      break;
    case "waitForVoid" :
      animationIdleSprite(x, y, size, direction, npcId)
      let range = 7;
      if(actualPlayerTile()[0]-range < npc.pos[0] && actualPlayerTile()[0]+range > npc.pos[0] 
      && actualPlayerTile()[1]-range < npc.pos[1] && actualPlayerTile()[1]+range > npc.pos[1])
      {
        launchGreedPathingOnVoid(npc);
      }
      break;
    case "seeVoid" :
      animationIdleSprite(x, y, size, direction, npcId)
      createImageWithIdOn2dArray(npc.pos[0], npc.pos[1]-1, 10, 65, true)
      break;
    case "dead" : 
      animationDeadSprite(x, y, size, npcId)
      break;

    default :
      break;
    }
}



/**
 * @param {object} npc 
 */
const setNpcDirectionWithThePlayerDirection = (npc) => {
  /** 
   * * Useful when we talk with a pnj and we want him to look at us
  */

  if(npc.pos[0] > actualPlayerTile()[0]){
      npc.dir = [-1, 0];
      return;
  }
  if(npc.pos[0] < actualPlayerTile()[0]){
      npc.dir = [1,0];
      return;
  }
  if(npc.pos[1] > actualPlayerTile()[1]){
      npc.dir = [0, -1];
      return;
  }
  if(npc.pos[1] < actualPlayerTile()[1]){
      npc.dir = [0, 1];
      return;
  }
}



const mooveEntityToNextCaseInEngineOne = (entity, cameraVector = vectorCameraEngineTwo) => {
  let positionOnMap = 
      [
          entity.pos[0] * tileSize - (playerSpriteSize-tileSize)/2 + cameraVector.x,
          entity.pos[1] * tileSize - (playerSpriteSize-tileSize)/2 + cameraVector.y
      ]

  if(entity.nextCase[0].posOnGrid === null || entity.nextCase[0].posOnGrid === undefined)
  {
      throw new Error("Entity next case isn't set but the script want to moove");
  }    
  if(entity.nextCase[0].posOnGrid[0] > entity.pos[0] || entity.nextCase[0].posOnGrid[0] < entity.pos[0])
  {
      if(entity.nextCase[0].posOnGrid[0] - entity.pos[0] < (movementSpeed/2) && entity.nextCase[0].posOnGrid[0] - entity.pos[0] > -(movementSpeed/2)){
          entity.pos[0] = Math.round(entity.pos[0])
      }
      if(entity.nextCase[0].posOnGrid[0] > entity.pos[0]){
        entity.dir = [1, 0];
        entity.pos[0]+= movementSpeed
        return true
      }
      if(entity.nextCase[0].posOnGrid[0] < entity.pos[0]){
        entity.dir = [-1, 0];
        entity.pos[0]-= movementSpeed
        return true
      }
  }
  if(entity.nextCase[0].posOnGrid[1] > entity.pos[1] || entity.nextCase[0].posOnGrid[1] < entity.pos[1])
  {
      if(entity.nextCase[0].posOnGrid[1] - entity.pos[1] < (movementSpeed/2) && entity.nextCase[0].posOnGrid[1] - entity.pos[1] >  -(movementSpeed/2)){
          entity.pos[1] = Math.round(entity.pos[1])
      }
      if(entity.nextCase[0].posOnGrid[1] > entity.pos[1]){
        entity.dir = [0, 1];
        entity.pos[1]+= movementSpeed
        return true
      }
      if(entity.nextCase[0].posOnGrid[1] < entity.pos[1]){
        entity.dir = [0,-1];
        entity.pos[1]-= movementSpeed
        return true
      }
  }
  entity.nextCase.splice(0, 1)
  if(entity.nextCase.length === 0) entity.nextCase = null;
  return false;

} // Moove Entity to the next case insered in her "nextCase" array value



const addNpcToMap = (idNpc, pos, interaction = 'dialog', direction = [0, 1], state = 'idle', isInteractible = true, mapId = 0) => {
  return mapData[mapId].npcOnMap.push({
    id : idNpc,
    pos : pos,
    nextCase : null,
    isInteractible : isInteractible,
    dir : direction,
    state : state,
    interaction : interaction
  })
}



const launchEndMoovementEventNpc = (npc) => {
  switch(npc.endMoovementEvent)
  {
    case "launchDialog" :
      launchNpcDialog(npc);
      break;
  }
}

const launchGreedPathingOnVoid = (npc) => {
  npc.state = "seeVoid";
  playerState = PlayerStateEnum.Dialog;
  setTimeout(() => {
    npc.nextCase = searchPath(npc.pos, actualPlayerTile(), actualPlayerMap.objectLayer)
    if(npc.nextCase === null){ 
      npc.nextCase = [getNode(actualPlayerTile()[0], actualPlayerTile()[1])]; 
    } // Just force the path finding
  }, 1000);
}


// ! Isn't used in the code
const isInFrontOfANpc = () => playerOnMap.npcOnMap.filter(npc => npc.position[0] === tileInteract[0] && npc.position[1] === tileInteract[1])