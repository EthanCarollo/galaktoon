// Movable Case Logics

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
    if(canMoveCase.length === 1)
    {
        canMoveCase = []
    }
    checkCanMoveCase();
    return canMoveCase;
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
const checkCanMoveCase = () => {
    for(let i = 0; i < canMoveCase.length; i++)
    {
        if( canMoveCase.find(element => element[0] === canMoveCase[i][0]-1 && element[1] === canMoveCase[i][1]) === undefined &&
            canMoveCase.find(element => element[0] === canMoveCase[i][0]+1 && element[1] === canMoveCase[i][1]) === undefined &&
            canMoveCase.find(element => element[0] === canMoveCase[i][0] && element[1] === canMoveCase[i][1]-1) === undefined &&
            canMoveCase.find(element => element[0] === canMoveCase[i][0] && element[1] === canMoveCase[i][1]+1) === undefined  )
        {
            canMoveCase.splice(i, 1)
        }
    }
}

// Movable Case Logics

const setEntityNextCase = (entity, nextCase) => {
    entity.nextCase = nextCase;
}
const applyDifferencePmWithNextCase = (entity) => {
    let actualPos = entity.pos;
    let nextPos = entity.nextCase;
    let newDim = [entity.pos[0] - entity.nextCase[0], entity.pos[1] - entity.nextCase[1]]
    if(newDim[0] < 0){ newDim[0] = -newDim[0] }
    if(newDim[1] < 0){ newDim[1] = -newDim[1] }
    newDim = newDim[0] + newDim[1]
    entity.pm -= newDim
}


let movementSpeed = 0.045;
const mooveEntityToNextCase = (entity, cameraVector = vectorCameraEngineTwo) => {
    entity.state = 'moove';
    let positionOnMap = 
        [
            entity.pos[0] * tileSize - (playerSpriteSize-tileSize)/2 + cameraVector.x,
            entity.pos[1] * tileSize - (playerSpriteSize-tileSize)/2 + cameraVector.y
        ]
    if(entity.nextCase === null || entity.nextCase === undefined)
    {
        throw new Error("Entity next case isn't set but the script want to moove");
    }    
    if(entity.nextCase[0] > entity.pos[0] || entity.nextCase[0] < entity.pos[0])
    {
        if(entity.nextCase[0] - entity.pos[0] < (movementSpeed/2) && entity.nextCase[0] - entity.pos[0] > -(movementSpeed/2)){
            entity.pos[0] = Math.round(entity.pos[0])
            return false
        }
        switch(entity.nextCase[0] > entity.pos[0])
        {
            case true :
                entity.dir = [1, 0];
                entity.pos[0]+= movementSpeed
                return true
            case false :
                entity.dir = [-1, 0];
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
                entity.dir = [0, 1];
                entity.pos[1]+= movementSpeed
                return true
            case false :
                entity.dir = [0,-1];
                entity.pos[1]-= movementSpeed
                return true
        }
    }
    entity.nextCase = null;
    return false;

} // Moove Entity to the next case insered in her "nextCase" array value