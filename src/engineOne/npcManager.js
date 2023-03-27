
const displayNPCOnMap = (orientation = "back") => {
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

const animateNpc = (x, y, size, direction /* ! = Array ! */, npcId, npc) => {
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

const isInFrontOfANpc = () => playerOnMap.npcOnMap.filter(npc => npc.position[0] === tileInteract[0] && npc.position[1] === tileInteract[1])