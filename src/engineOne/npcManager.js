
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
    let positionTemp = getCoordWithTileCoord(npc.position[0]-1, npc.position[1]-1);
    positionTemp.x = positionTemp.x + cameraVector.x + playerVector.x
    positionTemp.y = positionTemp.y + cameraVector.y + playerVector.y
    animateNpc(positionTemp.x, positionTemp.y, playerSpriteSize, [0, 1], spriteNpcId, npc.state)
    if(npc.path.length > 0){
      pathNpc(npc)
    }
}

const pathNpc = (npc) => {
  let currentPath = npc.currentPath
  let actualPosition = npc.position
  let nextPos = npc.path[currentPath]
  switch(actualPosition[0] < nextPos[0]){
    case true :
      break;
    case false :
      break;
  }
  switch(actualPosition[1] < nextPos[1]){
    case true :
      break;
    case false :
      break;
  }
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