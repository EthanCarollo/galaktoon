
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
   * * there is a top down with depth 
   */
  let npcInteractible = playerOnMap.npcOnMap.filter(npc => 
    Math.floor(npc.pos[0]) === xPosition && Math.floor(npc.pos[1]+1) === yPosition )
    if(npcInteractible.length > 0)
    {
      displayNpc(npcInteractible[0])
    }
}



const displayNpc = (npc) => {
  let spriteNpcId = npcData[npc.id].spriteId
  let positionTemp = getCoordWithTileCoord(npc.pos[0]-1, npc.pos[1]-1)
  positionTemp.x = positionTemp.x + cameraVector.x + playerVector.x;
  positionTemp.y = positionTemp.y + cameraVector.y + playerVector.y;
  if(npc.nextCase !== null)
  {
    npc.state = "moove";
  }else{
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
      if(mooveEntityToNextCase(npc, createVector(cameraVector.x + playerVector.x, cameraVector.y + playerVector.y)) === true) // Using the "pathfinding" from the second Engine
      {
        animationMooveSprite(x, y, size, direction, npcId)
      }else{
        animationIdleSprite(x, y, size, direction, npcId)
      }
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

// ! Isn't used in the code
const isInFrontOfANpc = () => playerOnMap.npcOnMap.filter(npc => npc.position[0] === tileInteract[0] && npc.position[1] === tileInteract[1])