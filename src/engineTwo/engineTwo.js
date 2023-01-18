

const runEngineTwo = () => {
    background(255)
    displaySideScroller2D();
    showTeamOnMap();
}

// ---- Display

const displaySideScroller2D = () => {
    createMapSideScroller("nothing")
    createInterfaceForFight()
}

const createMapSideScroller = (map) => {
    createFloorOfSideScrollerMap()
}

const createFloorOfSideScrollerMap = () => {
    for(let y = 0; y < 6; y++){
        for(let x = 0; x < 25; x++)
        {
            let tileSizeTemp = 90;
            let xPositionTiles = tileSizeTemp*x;
            let yPositionTiles = window.innerHeight - tileSizeTemp*y;

            image(tilesData[0].image, xPositionTiles, yPositionTiles, tileSizeTemp, tileSizeTemp)
        }
    }
}

const showTeamOnMap = () => {
    showPlayerTeam()
    showEnemyTeam()
}

const showPlayerTeam = () => {
    if(playerTeam.length > 3)
    {
        throw new Error("Player team is too big")
    }
    if(playerTeam.length < 1) 
    {
        throw new Error("Player team is too short")
    }

    for(let i = playerTeam.length -1; i >= 0; i--)
    {
        
        let characterObject = playerTeam[i]
        let sizeSprite = 200;
        let xPositionSprite = 120;
        let yPositionSprite = window.innerHeight - (sizeSprite+sizeSprite*(i/1.25)) - 50;
        let tempSpriteToShow = spritesFightData[characterObject.id].image.get(0,0,60,60);
        showSpriteOnMap(tempSpriteToShow, xPositionSprite, yPositionSprite, sizeSprite, characterObject)
    }
}

const showEnemyTeam = () => {
    if(enemyTeam.length > 3)
    {
        throw new Error("Player team is too big")
    }
    if(enemyTeam.length < 1) 
    {
        throw new Error("Player team is too short")
    }

    for(let i = enemyTeam.length-1; i >= 0; i--)
    {
        let characterObject = enemyTeam[i]
        let sizeSprite = 200;
        let xPositionSprite = window.innerWidth - (120 + sizeSprite);
        let yPositionSprite = window.innerHeight - (sizeSprite+sizeSprite*(i/1.25)) - 50;
        let tempSpriteToShow = spritesFightData[characterObject.id].image.get(0,0,60,60)
        showSpriteOnMap(tempSpriteToShow, xPositionSprite, yPositionSprite, sizeSprite, characterObject)
    }
}

const showSpriteOnMap = (sprite, x, y, size, charObject, isTarget = false) => {
    image(sprite, x, y, size, size)
    showSpriteHealthOnMap(x, y, size, charObject)
}

const showSpriteHealthOnMap = (x, y, size, charObject) => {
    image(uiData[0].image,x,y,size, size)
}

// ---- Display