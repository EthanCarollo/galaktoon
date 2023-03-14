

const runEngineTwo = () => {
    background(180)
    displayTopDownMapEngineTwo();
}

const displayTopDownMapEngineTwo = () => {
    displayAestheticTopDownMapEngineTwo(actualMapEngineTwo.map.groundLayer);
    displayAestheticTopDownMapEngineTwo(actualMapEngineTwo.map.objectLayer);

    displayTacticalTopDownMapEngineTwo();

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
            showSpriteOnTactical(x, y, actualMapEngineTwo.tacticalMap[y][x])
        }
    }
}

const showSpriteOnTactical = (x, y, id) => {
    switch(id){
        case -1 :
            fill(255,100,100,50)
            if(isAMovableCase(x, y) === true)
            {
                fill(155,155,255,100)
            }
            rect(x*tileSize+vectorMapEngineTwo[0], y*tileSize+vectorMapEngineTwo[1], tileSize, tileSize);
            break;
        default :
            fill(255,255,255,75)
            let xPos = x*tileSize-(playerSpriteSize-tileSize)/2;
            let yPos = y*tileSize-(playerSpriteSize-tileSize)/2;
            rect(xPos, yPos, playerSpriteSize, playerSpriteSize);
            animationIdleSprite(xPos, yPos, playerSpriteSize, [0,1],id)
            break;
    }
}

let canMoveCase = [];

function actionShow(x, y, movementPoint){
    console.log(x, y)
    canMoveCase = [[x, y]]
    console.log(canMoveCase)
    for(let i = 1; i<movementPoint+1;i++)
    {
        canMoveCase.push([x +  i, y])
        canMoveCase.push([x - i, y])
        canMoveCase.push([x, y +i])
        canMoveCase.push([x, y -i])
        //console.log((movementPoint+i - movementPoint-i) <= movementPoint)
        for(let j = 0; j < movementPoint;j++)
        {
                //canMoveCase.push([x + j -i,y+j])
                if(0 < i-j && j > 0){
                    canMoveCase.push([x + j - i,y+j])  
                    canMoveCase.push([x - j + i,y-j])  
                    canMoveCase.push([x - j + i,y+j])  
                    canMoveCase.push([x + j - i,y-j])  
                }
            
        }
    }
}

const isAMovableCase = (x, y) => {
    for(let i = 0; i < canMoveCase.length; i++)
    {
        if(x === canMoveCase[i][0] && y === canMoveCase[i][1])
        {
            return true
        }
    }
    return false
}
const resetMovableCase = () => {
    canMoveCase = [];
}

const createImageWithIdOn2dArrayEngineTwo = (x, y, id, currentTileSize, mapInfo = actualMapEngineTwo) => {
    if(id < 0)
    {
        return
    }
    // size of the current tile according to the data
    let yTileHeight = mapInfo.tileRessource[id].yWidth;
    // position of the current tile in the array and the size
    let xPositionTiles = currentTileSize*x+vectorMapEngineTwo[0];
    let yPositionTiles = (currentTileSize*(y+1-yTileHeight))+vectorMapEngineTwo[1];
     
    image(mapInfo.tileRessource[id].image, xPositionTiles , yPositionTiles, currentTileSize, currentTileSize * yTileHeight); 
  
  }

const getTacticalTileOnMouseClick = () => {
    return actualMapEngineTwo.tacticalMap[Math.floor(mouseY / tileSize)][Math.floor(mouseX / tileSize)];
}

const getCoordTileWithMouseClickEngineTwo = () => [Math.floor(mouseX / tileSize), Math.floor(mouseY / tileSize)]

const mouseIsInArrayEngineTwo = () => {
    return Math.floor(mouseX / tileSize) >= 0 
    && Math.floor(mouseY / tileSize) >= 0
    && Math.floor(mouseY / tileSize) < actualMapEngineTwo.tacticalMap.length
    && Math.floor(mouseX / tileSize) < actualMapEngineTwo.tacticalMap[0].length
}
