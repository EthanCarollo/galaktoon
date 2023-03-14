let canMoveCase = [];

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
const getMovableCase = (x, y, movementPoint) => {
    canMoveCase = [[x, y]]
    for(let i = 1; i<movementPoint+1;i++)
    {
        addCanMoveCase([x +  i, y])
        addCanMoveCase([x - i, y])
        addCanMoveCase([x, y +i])
        addCanMoveCase([x, y -i])
        //console.log((movementPoint+i - movementPoint-i) <= movementPoint)
        for(let j = 0; j < movementPoint;j++)
        {
                //addCanMoveCase([x + j -i,y+j])
                if(0 < i-j && j > 0){
                    addCanMoveCase([x + j - i,y+j])  
                    addCanMoveCase([x - j + i,y-j])  
                    addCanMoveCase([x - j + i,y+j])  
                    addCanMoveCase([x + j - i,y-j])  
                }
            
        }
    }
}
const addCanMoveCase = (position) => {
    if(position[0] > 0 && position[1] > 0 && position[0] < actualMapEngineTwo.tacticalMap.length && position[1] < actualMapEngineTwo.tacticalMap.length && getSpriteTactical(position[0], position[1]) === null){
        if(actualMapEngineTwo.tacticalMap[position[1]][position[0]] !== -1)
        {
            return
        }
        canMoveCase.push(position)  
    }
}
const setEntityNextCase = (entity, nextCase) => {

}


let movementSpeed = 0.045;
const mooveEntityToNextCase = (entity) => {
    let positionOnMap = 
        [
            entity.pos[0] * tileSize - (playerSpriteSize-tileSize)/2 +vectorCameraEngineTwo.x,
            entity.pos[1] * tileSize - (playerSpriteSize-tileSize)/2 +vectorCameraEngineTwo.y
        ]
    if(entity.nextCase[0] > entity.pos[0] || entity.nextCase[0] < entity.pos[0])
    {
        if(entity.nextCase[0] - entity.pos[0] < (movementSpeed/2) && entity.nextCase[0] - entity.pos[0] > -(movementSpeed/2)){
            entity.pos[0] = Math.round(entity.pos[0])
            return false
        }
        switch(entity.nextCase[0] > entity.pos[0])
        {
            case true :
                animationMooveSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, [1, 0], entity.id)
                entity.pos[0]+= movementSpeed
                return true
            case false :
                animationMooveSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, [-1, 0], entity.id)
                entity.pos[0]-= movementSpeed
                return true
        }
    }
    if(entity.nextCase[1] > entity.pos[1] || entity.nextCase[1] < entity.pos[1])
    {
        if(entity.nextCase[1] - entity.pos[1] < (movementSpeed/2) && entity.nextCase[1] - entity.pos[1] >  -(movementSpeed/2)){
            entity.pos[1] = Math.round(entity.pos[1])
            return false
        }
        switch(entity.nextCase[1] > entity.pos[1])
        {
            case true :
                animationMooveSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, [0, 1], entity.id)
                entity.pos[1]+= movementSpeed
                return true
            case false :
                animationMooveSprite(positionOnMap[0], positionOnMap[1], playerSpriteSize, [0,-1], entity.id)
                entity.pos[1]-= movementSpeed
                return true
        }
    }
    entity.nextCase = null;
    return false;

}