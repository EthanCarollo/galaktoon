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
    background(20)
    setAllHealth();
    displayTopDownMapEngineTwo();
    setSelectedEntity();
    setCameraEngineTwo();
    displayEngineTwoUI();
    runCinematicFightView()
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

    if(entity.nextCase !== null ) // If entity has a next case to moove
    {
        entity.state = "moove";
    }

    switch(entity.state)
    {
        case "fight":
            if(isCinematicFightIsRunning() === true)
            {
                animationIdleSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, [0, 1], entity.id)
                showHealthSpriteTactical(positionOnMap, entity)
                return;
            }
            if(animationFightSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, 0, entity.id) === false)
            {
                entity.state = "idle";
                checkIaTurn()
            }
            
            break;
        case "moove" :
            if(mooveEntityToNextCase(entity) === false)
            {
                console.log("Finished to moove")
                entity.state = "idle";
                checkIaTurn();
            }
            animationMooveSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, entity.dir, entity.id)
            break;
        case "dead" :
            animationDeadSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, entity.id)
            break;
        default :
            animationIdleSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, [0, 1], entity.id)
            showHealthSpriteTactical(positionOnMap, entity)
            break;
    }
    
}



/**
 * @param {array[int]} position [x, y] the position of the entity who have his health showed in the world
 * @param {object} entity the entity object who contains the health, the max health... etc
 */
const showHealthSpriteTactical = (position, entity) => {

    if(entity.health === undefined){
        throw new Error("Entity doesn't have health which is impossible, check the entity with the id : " + entity.id)
    }

    let health = entity.health
    image(uiData[3].image, position[0], position[1], playerSpriteSize, playerSpriteSize) // Background HP
    let actualHealthPercent = health.actualHealth / health.maxHealth * 100 + 0.0001; 
    /**
     *  Add +0.000001 cause when it will be to 0, the image function of p5
     *  will just set the image width to his native size and the actualHealthPercent is
     *  used to set the width of the actual player health, i can +0.00001 it in the image function
     *  directly or here, it will be the same, image width cannot be 0 in p5
     */
    image(uiData[0].image, position[0], position[1], actualHealthPercent, playerSpriteSize) // Bar HP

    image(uiData[2].image, position[0], position[1], playerSpriteSize, playerSpriteSize) // Border HP
}



/**
 * * This function check every player health to set this to 0 if it is inferior to 0 
 */
const setAllHealth = () => {
    for(let i = 0; i < actualMapEngineTwo.entityOnTactical.length; i ++)
    {
        if(actualMapEngineTwo.entityOnTactical[i].health.actualHealth < 0)
        {
            actualMapEngineTwo.entityOnTactical[i].health.actualHealth = 0;
        }
    }
}



const createImageWithIdOn2dArrayEngineTwo = (x, y, id, currentTileSize, mapInfo = actualMapEngineTwoRessource) => {
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





//#region // * Usefull tools functions regions


/**
 * @param {int} x position y coord
 * @param {int} y position y coord
 * @returns {object} represents an entity on map references 
 */
const getSpriteWithCoord = (x, y) => {
    if(getSpriteTactical(x, y) === undefined)
    {
        return null; // Just return null if there is no sprite at this case
    }
    return getSpriteTactical(x, y);
}



/**
 * @returns {int} id of a tile on the tactical map
 */
const getTacticalTileOnMouseClick = () => {
    return actualMapEngineTwo.tacticalMap[Math.floor((mouseY - vectorCameraEngineTwo.y) / tileSize)][Math.floor((mouseX - vectorCameraEngineTwo.x) / tileSize)];
}



/**
 * @returns {array[int]} [x, y] of the coord tile
 */
const getCoordTileWithMouseClickEngineTwo = () => [Math.floor((mouseX - vectorCameraEngineTwo.x) / tileSize), Math.floor((mouseY - vectorCameraEngineTwo.y) / tileSize)] // Return coord on map



/**
 * @returns {boolean} return if the mouse is in array or no (true false)
 */
const mouseIsInArrayEngineTwo = () => {
    return Math.floor((mouseX - vectorCameraEngineTwo.x) / tileSize) >= 0 
    && Math.floor((mouseY - vectorCameraEngineTwo.y) / tileSize) >= 0
    && Math.floor((mouseY - vectorCameraEngineTwo.y) / tileSize) < actualMapEngineTwo.tacticalMap.length
    && Math.floor((mouseX - vectorCameraEngineTwo.x) / tileSize) < actualMapEngineTwo.tacticalMap[0].length
} // Return true or false



//#endregion