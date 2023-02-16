let npcOnMap = [
    {
        id : 1,
        position : [10, 10]
    }
]

const displayNPCOnMap = (orientation = "back") => {
    if(orientation === "back"){
        for(let i = 0; i < npcOnMap.length; i++){
            if(actualPlayerTile()[1] > npcOnMap[i].position[0] +1)
              {
                displayNpc(npcOnMap[i])
              }
        }
        
    }else{
        for(let i = 0; i < npcOnMap.length; i++){
            if(actualPlayerTile()[1] <= npcOnMap[i].position[1] +1)
              {
                displayNpc(npcOnMap[i])
              }
        }
    }
}

const displayNpc = (npc) => {
    let positionTemp = getCoordWithTileCoord(npc.position[0] - 0.5, npc.position[1]);
    positionTemp.x = positionTemp.x + cameraVector.x + playerVector.x
    positionTemp.y = positionTemp.y + cameraVector.y + playerVector.y
    animationIdleSprite(positionTemp.x, positionTemp.y, playerSpriteSize, [0, 1], npc.id)
}

const interactWithNPC = (tileInteract) => {

}