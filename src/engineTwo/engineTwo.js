

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
        const isTurnOfThisCharacter = i === currentTurn;
        showSpriteOnMap(tempSpriteToShow, xPositionSprite, yPositionSprite, sizeSprite, characterObject, false, isTurnOfThisCharacter)

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
        const isTargeted = i === currentTarget
        showSpriteOnMap(tempSpriteToShow, xPositionSprite, yPositionSprite, sizeSprite, characterObject, isTargeted)
    }
}

const showSpriteOnMap = (sprite, x, y, size, charObject, isTarget = false, playerSelectedCharacter = false) => {
    if(playerSelectedCharacter === true){
        tint(150,150,255)
        image(sprite, x, y, size, size)
        noTint()
    }else if(isTarget === true){
        tint(155,0,0)
        image(sprite, x, y, size, size)
        noTint()
    }else{
        image(sprite, x, y, size, size)
    }
    showSpriteHealthOnMap(x, y, size, charObject)
}

const showSpriteHealthOnMap = (x, y, size, charObject) => {
    let percentOfSpriteLife = charObject.hp.current / charObject.hp.max +0.00001; // adding 0.00001 on that var cause size can't be 0 :(
    let currentHealthBarUIImage = uiData[0].image;
    let currentEmptyHealthBarUIImage = uiData[2].image;
    let currentBackgroundHealthBar = uiData[3].image;
    
    image(currentBackgroundHealthBar,x,y,size, size)
    image(currentHealthBarUIImage,x,y,size * percentOfSpriteLife, size)
    image(currentEmptyHealthBarUIImage,x,y,size, size)
}

// ---- Display