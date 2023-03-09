
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
  let positionTemp = getCoordWithTileCoord(npc.position[0]-1, npc.position[1]-1)
  positionTemp.x = positionTemp.x + cameraVector.x + playerVector.x
  positionTemp.y = positionTemp.y + cameraVector.y + playerVector.y
    if(npc.state !== "idle"){
      mooveNpcOnPathing(npc)
    }else{
      animateNpc(positionTemp.x, positionTemp.y, playerSpriteSize, [0, 1], spriteNpcId, npc.state)
    }
    
}

const mooveNpcOnPathing = (npc) => {
  
  let spriteNpcId = npcData[npc.id].spriteId
  let positionTemp = getCoordWithTileCoord(npc.position[0]-1, npc.position[1]-1)
  positionTemp.x = positionTemp.x + cameraVector.x + playerVector.x
  positionTemp.y = positionTemp.y + cameraVector.y + playerVector.y
  switch(npc.pathing){
    case "around" :
      if(npc.currentPath === 0){
        setTimeout(() => {
          npc.currentPath = 1
        }, 2000);
        pathNpc(npc, "right")
        animateNpc(positionTemp.x, positionTemp.y, playerSpriteSize, [1, 0], spriteNpcId, npc.state)
      }else{
        setTimeout(() => {
          npc.currentPath = 0
        },2000);
        pathNpc(npc, "left")
        animateNpc(positionTemp.x, positionTemp.y, playerSpriteSize, [-1, 0], spriteNpcId, npc.state)
      }
      break;
  }
}

const pathNpc = (npc, direction) => {
  switch(direction){
    case "left" :
      npc.position[0] -= 0.025
      break
    case "right" :
      npc.position[0] += 0.025
      break
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

const launchNpcDialog = (npc) => {

  npcInteractedData = npcData[npc.id]

  if(npcInteractedData.dialogs !== undefined)
  {
    console.log("launch a dialog")
    console.log(npc)
    console.log(npcInteractedData)
  }else{
    console.log("no dialog disponible")
  }
}