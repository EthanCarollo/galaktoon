
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
    let positionTemp = getCoordWithTileCoord(npc.position[0], npc.position[1]-1);
    positionTemp.x = positionTemp.x + cameraVector.x + playerVector.x
    positionTemp.y = positionTemp.y + cameraVector.y + playerVector.y
    animateNpc(positionTemp.x, positionTemp.y, playerSpriteSize, [0, 1], spriteNpcId)
}

const animateNpc = (x, y, size, direction /* ! = Array ! */, npcId) => {
    animationIdleSprite(x, y, size, direction, npcId)
}

const interactWithNPC = (tileInteract) => {

}