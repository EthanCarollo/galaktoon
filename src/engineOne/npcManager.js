let npcOnMap = [
    {
        id : 1,
        position : [10, 10]
    }
]

const displayNPCOnMap = () => {
    for(let i = 0; i < npcOnMap.length; i++){
        let positionTemp = getCoordWithTileCoord(npcOnMap[i].position[0] - 0.5, npcOnMap[i].position[1] - 0.5);
        positionTemp.x = positionTemp.x + cameraVector.x + playerVector.x
        positionTemp.y = positionTemp.y + cameraVector.y + playerVector.y
        animationIdleSprite(positionTemp.x, positionTemp.y, playerSpriteSize, [0, 1], npcOnMap[i].id)
    }
}

const interactWithNPC = (tileInteract) => {

}