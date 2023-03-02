
const displayNPCOnMap = (orientation = "back") => {
    switch(orientation){
        case "back":
            for(let i = 0; i < playerOnMap.npcOnMap.length; i++){
                if(actualPlayerTile()[1] > playerOnMap.npcOnMap[i].position[1])
                  {
                    displayNpc(playerOnMap.npcOnMap[i])
                  }
            }
            break;
        case "front":
            for(let i = 0; i < playerOnMap.npcOnMap.length; i++){
                if(actualPlayerTile()[1] <= playerOnMap.npcOnMap[i].position[1])
                  {
                    displayNpc(playerOnMap.npcOnMap[i])
                  }
            }
            break;
    }
}

const displayNpc = (npc) => {
    let spriteNpcId = npcData[npc.id].spriteId
    if(npc.path.length > 0){
      console.log("launch")
      pathNpc(npc)
    }
    let positionTemp = getCoordWithTileCoord(npc.position[0]-1, npc.position[1]-1)
    positionTemp.x = positionTemp.x + cameraVector.x + playerVector.x
    positionTemp.y = positionTemp.y + cameraVector.y + playerVector.y
    animateNpc(positionTemp.x, positionTemp.y, playerSpriteSize, [0, 1], spriteNpcId, npc.state)
    
}

const pathNpc = (npc) => {
  let actualPosition = getCoordWithTileCoord(npc.position[0]-1, npc.position[1]-1)
  let nextPos = getCoordWithTileCoord(npc.path[npc.currentPath][0]-1, npc.path[npc.currentPath][1]-1);
  
}

const animateNpc = (x, y, size, direction /* ! = Array ! */, npcId, state = "idle") => {
    switch(state){
      case "idle" :
        animationIdleSprite(x, y, size, direction, npcId)
        break;
      case "moove" :
        animationMooveSprite(x, y, size, direction, npcId)
        break;
      default :
        break;
    }
}

const isInFrontOfANpc = () => playerOnMap.npcOnMap.filter(npc => npc.position[0] === tileInteract[0] && npc.position[1] === tileInteract[1])