let engineTwoState = "Playing";

const runEngineTwo = () => {
    switch(engineTwoState){
        case "Playing" :
            engineTwoPlaying();
            break;
        case "endFight" :
            engineTwoEndFight();
            break;
        default :
            throw new Error("Engine Two State isn't defined : " + engineTwoState)
    }
}

const engineTwoPlaying = () => {
    setSelectedEntity();
    background(20)
    displayTopDownMapEngineTwo();
    setCameraEngineTwo();
    displayEngineTwoUI();
    setGameState();
}

const engineTwoEndFight = () => {
    background('rgba(20,20,20, 0.1)');
    displayEngineTwoUI();
}

const setGameState = () => {
    if(checkAllEnemiesDead() === true){
        engineTwoState = "endFight";
    }
    if(checkAllAlliesDead() === true){
        engineTwoState = "endFight";
    }
}

const setSelectedEntity = () =>{
    selectedEntity = actualMapEngineTwo.entityOnTactical[whichEntityTurn]
}

const setCameraEngineTwo = () => {
    let vectorMoove;
    if(selectedEntity !== null)
    {   
        vectorEntity = createVector((selectedEntity.pos[0] + 0.5)*tileSize, (selectedEntity.pos[1] + 0.5)*tileSize) // 0.5 is the margin for centering the center of a tile
        vectorToCover = createVector(-vectorEntity.x + (window.innerWidth/2), -vectorEntity.y  + (window.innerHeight/2));
        vectorMoove = p5.Vector.lerp(vectorToCover, vectorCameraEngineTwo, cameraSmoothStep); // interpolate the camera with the player by using vector.lerp by p5
    }else{
        throw new Error("selectedEntity is null, which is not possible normally");
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
    return null;
}// Return an entity object or null

const showRectOnTactical = (x, y, id) => {
    switch(id){
        case -1 :
            noStroke()
            if(isAMovableCase(x, y) === true)
            {
                fill(155,155,255,100)
                rect(x*tileSize+vectorCameraEngineTwo.x, y*tileSize+vectorCameraEngineTwo.y, tileSize, tileSize);
            }
            if(isAnAttackableCase(x, y) === true)
            {
                fill(255,100,100,100)
                rect(x*tileSize+vectorCameraEngineTwo.x, y*tileSize+vectorCameraEngineTwo.y, tileSize, tileSize);
            }
            break;
    }
}// Usefull for debug

const showSpriteOnTactical = (entity) => {
    let positionOnMap = 
    [
        entity.pos[0] * tileSize - (playerSpriteSize-tileSize)/2 +vectorCameraEngineTwo.x,
        entity.pos[1] * tileSize - (playerSpriteSize-tileSize)/2 +vectorCameraEngineTwo.y
    ]
    if(entity.nextCase !== null) // If entity has a next case to moove
    {
        if(mooveEntityToNextCase(entity) === false)
        {
            animationIdleSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, [0, 1], entity.id)
            showHealthSpriteTactical(positionOnMap, entity)
        }else{
            animationMooveSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, entity.dir, entity.id)
        }
    }else{
        switch(entity.state)
        {
            case "fight":
                if(animationFightSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, [0, 1], entity.id) === false)
                {
                    // This is resseting the entity state on idle when the fight animation is finish (when it returns false)
                    entity.state = "idle";
                }
                showHealthSpriteTactical(positionOnMap, entity)
                break;
            case "dead" :
                break;
            default :
                animationIdleSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, [0, 1], entity.id)
                showHealthSpriteTactical(positionOnMap, entity)
                break;
        }
    }
}

const showHealthSpriteTactical = (position, entity) => {

    if(entity.health === undefined){
        throw new Error("Entity doesn't have health which is impossible, check : " + entity.id)
    }

    let health = entity.health
    image(uiData[3].image, position[0], position[1], playerSpriteSize, playerSpriteSize) // Background HP
    if(entity.health.actualHealth < 0)
    {
        entity.health.actualHealth = 0;
    }
    let actualHealthPercent = health.actualHealth / health.maxHealth * 100 + 0.0001;
    image(uiData[0].image, position[0], position[1], actualHealthPercent, playerSpriteSize) // Bar HP

    image(uiData[2].image, position[0], position[1], playerSpriteSize, playerSpriteSize) // Border HP
}

const createImageWithIdOn2dArrayEngineTwo = (x, y, id, currentTileSize, mapInfo = actualMapEngineTwo) => {
    if(id < 0)
    {
        return // If there is no tile, just return and doesn't write a tile on map
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
        return null; // Just return null if there is no sprite at this case
    }
    return getSpriteTactical(x, y);
}

const getTacticalTileOnMouseClick = () => {
    return actualMapEngineTwo.tacticalMap[Math.floor((mouseY - vectorCameraEngineTwo.y) / tileSize)][Math.floor((mouseX - vectorCameraEngineTwo.x) / tileSize)];
}

const getCoordTileWithMouseClickEngineTwo = () => [Math.floor((mouseX - vectorCameraEngineTwo.x) / tileSize), Math.floor((mouseY - vectorCameraEngineTwo.y) / tileSize)] // Return coord on map

const mouseIsInArrayEngineTwo = () => {
    return Math.floor((mouseX - vectorCameraEngineTwo.x) / tileSize) >= 0 
    && Math.floor((mouseY - vectorCameraEngineTwo.y) / tileSize) >= 0
    && Math.floor((mouseY - vectorCameraEngineTwo.y) / tileSize) < actualMapEngineTwo.tacticalMap.length
    && Math.floor((mouseX - vectorCameraEngineTwo.x) / tileSize) < actualMapEngineTwo.tacticalMap[0].length
} // Return true or false
