let npcOnMap = [
    {
        id : 1,
        position : [5, 7]
    }
]

const displayNPCOnMap = (orientation = "back") => {
    switch(orientation){
        case "back":
            for(let i = 0; i < npcOnMap.length; i++){
                if(actualPlayerTile()[1] > npcOnMap[i].position[0])
                  {
                    displayNpc(npcOnMap[i])
                  }
            }
            break;
        case "front":
            for(let i = 0; i < npcOnMap.length; i++){
                if(actualPlayerTile()[1] <= npcOnMap[i].position[1])
                  {
                    displayNpc(npcOnMap[i])
                  }
            }
            break;
    }
}

const displayNpc = (npc) => {
    let positionTemp = getCoordWithTileCoord(npc.position[0], npc.position[1]-1);
    positionTemp.x = positionTemp.x + cameraVector.x + playerVector.x
    positionTemp.y = positionTemp.y + cameraVector.y + playerVector.y
    animationIdleSprite(positionTemp.x, positionTemp.y, playerSpriteSize, [0, 1], npc.id)
}

const interactWithNPC = (tileInteract) => {

}