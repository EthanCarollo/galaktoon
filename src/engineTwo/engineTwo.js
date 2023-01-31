

const runEngineTwo = () => {
    background(180)
    displaySideScroller2D();
    showTeamOnMap();
    displayUserInterfaceEngineTwo();
}

// ---- Display

const displaySideScroller2D = () => {
    createMapSideScroller("nothing")
    if(turnTeam === "player"){
        createInterfaceForFight()
    }
    // DEBUG
    text("actual turn is " + turnTeam, 50, 250)
    text("Click on an enemy to target him ", window.innerWidth-500, 250)
    text("Press space to attack ", window.innerWidth/2-175, 250)
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
        let tempSpriteToShow = spritesFightData[characterObject.id].image;
        // set all variables for the showSpriteOnMap function
        const isTurnOfThisCharacter = i === currentTurn;
        showSpriteOnMap(tempSpriteToShow, xPositionSprite, yPositionSprite, sizeSprite, characterObject, false, isTurnOfThisCharacter, i, false);

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
        let tempSpriteToShow = spritesFightData[characterObject.id].image
        // set all variables for the showSpriteOnMap function
        const isTargeted = i === currentTarget
        showSpriteOnMap(tempSpriteToShow, xPositionSprite, yPositionSprite, sizeSprite, characterObject, isTargeted, false, i, true)
    }
}

const showSpriteOnMap = (sprite, x, y, size, charObject, isTarget, playerSelectedCharacter, indexInArray, isAnEnemy) => {
    if(playerSelectedCharacter === true){
        tint(150,150,255)
        spriteAnimationFight(sprite, x, y, size, isAnEnemy, indexInArray)
        noTint()
    }else if(isTarget === true){
        tint(155,0,0)
        spriteAnimationFight(sprite, x, y, size, isAnEnemy, indexInArray)
        noTint()
    }else{
        spriteAnimationFight(sprite, x, y, size, isAnEnemy, indexInArray)
    }
    showSpriteHealthOnMap(x, y, size, charObject);
}

const spriteAnimationFight = (sprite, x, y, size, isAnEnemy, index) => {
    let actualTeamSprite;
    switch(isAnEnemy){
        case true : 
            actualTeamSprite = enemyTeam;
            break;
        case false :
            actualTeamSprite = playerTeam;
            break;
    }


    switch(actualTeamSprite[index].state){
        case "idle" :
            idleSpriteAnimationFight(sprite, x, y, size)
            break;
        case "attack" :
            fightSpriteAnimationFight(sprite, x, y, size)
            break;
        default : 
            throw new Error ("Sprite can't animate cause state doesn't exist")
    }
}

const idleSpriteAnimationFight = (spriteToAnim, x, y, size) => {
    image(spriteToAnim.get(0,0,60,60), x, y, size, size);
}

const fightSpriteAnimationFight = (spriteToAnim, x, y, size) => {
    image(spriteToAnim.get(0,60,60,60), x, y, size, size);
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