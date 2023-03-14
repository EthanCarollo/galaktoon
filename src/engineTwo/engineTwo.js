

const runEngineTwo = () => {
    background(180)
    displayTopDownMapEngineTwo();
    setCameraEngineTwo();
}

const setCameraEngineTwo = () => {
    let vectorMoove;
    if(selectedEntity !== null)
    {   
        vectorEntity = createVector(selectedEntity.pos[0]*tileSize, selectedEntity.pos[1]*tileSize)
        vectorToCover = createVector(-vectorEntity.x + (window.innerWidth/2), -vectorEntity.y  + (window.innerHeight/2));
        vectorMoove = p5.Vector.lerp(vectorToCover, vectorCameraEngineTwo, cameraSmoothStep); // interpolate the camera with the player by using vector.lerp by p5
    }else{
        vectorMap= createVector(actualMapEngineTwo.tacticalMap.length*tileSize/2, actualMapEngineTwo.tacticalMap.length*tileSize/2)
        vectorToCover = createVector(-vectorMap.x + (window.innerWidth/2), -vectorMap.y  + (window.innerHeight/2));
        vectorMoove = p5.Vector.lerp(vectorToCover, vectorCameraEngineTwo, cameraSmoothStep);
    }
    vectorCameraEngineTwo = vectorMoove;
    
}

// * BASE CODE

const displayTopDownMapEngineTwo = () => {
    displayAestheticTopDownMapEngineTwo(actualMapEngineTwo.map.groundLayer);
    displayAestheticTopDownMapEngineTwo(actualMapEngineTwo.map.objectLayer);

    displayTacticalTopDownMapEngineTwo();
    displaySpriteTacticalTopDownMapEngineTwo();

    //createMapTopDown("front", actualMapEngineTwo.map.groundLayer, actualMapEngineTwo, vectorMapEngineTwo);
    //createMapTopDown("front", actualMapEngineTwo.map.objectLayer, actualMapEngineTwo, vectorMapEngineTwo);
}

const displayAestheticTopDownMapEngineTwo = (map) => {
    for(let y = 0; y < map.length; y++)
    {
        for(let x = 0; x < map[y].length; x++)
        {
            createImageWithIdOn2dArrayEngineTwo(x, y, map[y][x],tileSize);
        }
    }
}

const displayTacticalTopDownMapEngineTwo = () => {
    for(let y = 0; y < actualMapEngineTwo.tacticalMap.length; y++)
    {
        for(let x = 0; x < actualMapEngineTwo.tacticalMap[y].length; x++)
        {   
            showRectOnTactical(x, y, actualMapEngineTwo.tacticalMap[y][x])
        }
    }
}

const displaySpriteTacticalTopDownMapEngineTwo = () => {
    for(let i = 0; i < actualMapEngineTwo.entityOnTactical.length; i++)
    {
        showSpriteOnTactical(actualMapEngineTwo.entityOnTactical[i])
    }
}

const getSpriteTactical = (x, y) => {
    for(let i = 0; i < actualMapEngineTwo.entityOnTactical.length; i++)
    {
        if(x === actualMapEngineTwo.entityOnTactical[i].pos[0] && y ===actualMapEngineTwo.entityOnTactical[i].pos[1]){
            return actualMapEngineTwo.entityOnTactical[i];
        }
    }
}

const showRectOnTactical = (x, y, id) => {
    switch(id){
        case -1 :
            fill(255,100,100,50)
            if(isAMovableCase(x, y) === true)
            {
                fill(155,155,255,100)
            }
            rect(x*tileSize+vectorCameraEngineTwo.x, y*tileSize+vectorCameraEngineTwo.y, tileSize, tileSize);
            break;
    }
}

const showSpriteOnTactical = (entity) => {
    if(entity.nextCase !== null)
    {
        mooveEntityToNextCase(entity)
    }else{
        let positionOnMap = 
        [
            entity.pos[0] * tileSize - (playerSpriteSize-tileSize)/2 +vectorCameraEngineTwo.x,
            entity.pos[1] * tileSize - (playerSpriteSize-tileSize)/2 +vectorCameraEngineTwo.y
        ]
        animationIdleSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, [0, 1], entity.id)
    }
}

const createImageWithIdOn2dArrayEngineTwo = (x, y, id, currentTileSize, mapInfo = actualMapEngineTwo) => {
    if(id < 0)
    {
        return
    }
    // size of the current tile according to the data
    let yTileHeight = mapInfo.tileRessource[id].yWidth;
    // position of the current tile in the array and the size
    let xPositionTiles = currentTileSize*x+vectorCameraEngineTwo.x;
    let yPositionTiles = (currentTileSize*(y+1-yTileHeight))+vectorCameraEngineTwo.y;
     
    image(mapInfo.tileRessource[id].image, xPositionTiles , yPositionTiles, currentTileSize, currentTileSize * yTileHeight); 
  
  }





// ! Tools

const getSpriteWithCoord = (x, y) => {
    if(getSpriteTactical(x, y) === undefined)
    {
        return null;
    }
    return getSpriteTactical(x, y);
}

const getTacticalTileOnMouseClick = () => {
    return actualMapEngineTwo.tacticalMap[Math.floor(mouseY / tileSize)][Math.floor(mouseX / tileSize)];
}

const getCoordTileWithMouseClickEngineTwo = () => [Math.floor((mouseX - vectorCameraEngineTwo.x) / tileSize), Math.floor((mouseY - vectorCameraEngineTwo.y) / tileSize)]

const mouseIsInArrayEngineTwo = () => {
    return Math.floor((mouseX - vectorCameraEngineTwo.x) / tileSize) >= 0 
    && Math.floor((mouseY - vectorCameraEngineTwo.y) / tileSize) >= 0
    && Math.floor((mouseY - vectorCameraEngineTwo.y) / tileSize) < actualMapEngineTwo.tacticalMap.length
    && Math.floor((mouseX - vectorCameraEngineTwo.x) / tileSize) < actualMapEngineTwo.tacticalMap[0].length
}
