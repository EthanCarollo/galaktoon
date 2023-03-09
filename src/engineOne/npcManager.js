
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
    npcDialoged = npcInteractedData
  }else{
    console.log("no dialog disponible")
  }
}

const displayDialogNpc = (npcDialoged) => {
  let dialogBox = uiData[11].image;

  let sizeYDialog = 250;
  let sizeXDialog = 1250;
  let xStartDialog = (window.innerWidth /2) - (sizeXDialog/2);
  let yStartDialog = window.innerHeight - sizeYDialog;

  fill(0, 0, 0);
  let box = image(dialogBox, xStartDialog, yStartDialog, sizeXDialog, sizeYDialog)
  textSize(24);

  let paddingXText = 125;
  let paddingYText = 80;
  let paddingSizeXBox = paddingXText*2;
  let paddingSizeYBox = paddingYText*2;

  let actualDialogNpc = npcDialoged.dialogs[actualDialog];

  text(actualDialogNpc, xStartDialog +paddingXText, yStartDialog+paddingYText, sizeXDialog-paddingSizeXBox, sizeYDialog-paddingSizeYBox);
  createInputButtonWithCallback(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, goNextDialog);

}

const goNextDialog = () => {
  actualDialog++;
}