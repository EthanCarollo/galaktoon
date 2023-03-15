
const endTurn = () => {
    turnManager();
}

const turnManager = () => {
    if(whichEntityTurn >= actualMapEngineTwo.entityOnTactical.length || whichEntityTurn === null)
    {
        throw new Error("which entity turn is out of length or is null : " + whichEntityTurn)
    }

    
    whichEntityTurn ++;


    if(whichEntityTurn >= actualMapEngineTwo.entityOnTactical.length)
    {
        whichEntityTurn = 0;
    }

    if(whichEntityTurn > 0)
    {
        runIaTurn();
    }
    
    resetMovableAndEntityVar()
    actualMapEngineTwo.entityOnTactical[whichEntityTurn].pm = 2;
    selectedEntity = actualMapEngineTwo.entityOnTactical[whichEntityTurn]
}

const useAbility = (entity, target = 1, selectedAbility = 0) => {
    if(entity.pa > 0)
    {
        switch(entity.abilities[selectedAbility].type)
        {
            case "attack" :
                actualMapEngineTwo.entityOnTactical[target].health.actualHealth -= entity.abilities[selectedAbility].baseAmount;
                break;
            default :
                throw new Error("Type of attack isn't specified : " + entity.abilities[selectedAbility].type + " of the ability : " + entity.abilities[selectedAbility].name)
        }
    }
}



let canAttackCase = []
const getAttackableCase = (x, y, attackPoint) => {
    canAttackCase = [[x, y]]
    for(let i = 1; i<attackPoint+1;i++)
    {
        addCanAttackCase([x +  i, y])
        addCanAttackCase([x - i, y])
        addCanAttackCase([x, y +i])
        addCanAttackCase([x, y -i])
        //console.log((attackPoint+i - attackPoint-i) <= attackPoint)
        for(let j = 0; j < attackPoint;j++)
        {
                //addCanAttackCase([x + j -i,y+j])
                if(0 < i-j && j > 0){
                    addCanAttackCase([x + j - i,y+j])  
                    addCanAttackCase([x - j + i,y-j])  
                    addCanAttackCase([x - j + i,y+j])  
                    addCanAttackCase([x + j - i,y-j])  
                }
            
        }
    }
    if(canAttackCase.length === 1)
    {
        canAttackCase = []
    }
    return canAttackCase;
}
const addCanAttackCase = (position) => {
    if(position[0] > 0 && position[1] > 0 && position[0] < actualMapEngineTwo.tacticalMap.length && position[1] < actualMapEngineTwo.tacticalMap.length){
        if(actualMapEngineTwo.tacticalMap[position[1]][position[0]] !== -1)
        {
            return
        }
        canAttackCase.push(position)  
    }
}
const resetAttackableCase = () => {
    canAttackCase = []
}
const isAnAttackableCase = (x, y) => {
    for(let i = 0; i < canAttackCase.length; i++)
    {
        if(x === canAttackCase[i][0] && y === canAttackCase[i][1])
        {
            return true
        }
    }
    return false
}



const launchAttack = (entity = actualMapEngineTwo.entityOnTactical[whichEntityTurn], abilityIndex = selectedAbility, target) => {
    console.log("Launched an attack")
    switch(playerTeam[0].abilities[selectedAbility].type)
    {
        default :
            target.health.actualHealth -= 10;
            entity.state = "fight";
            setTimeout(() => {
                entity.state = "idle";
            }, 1000);
            break;
    }
    resetMovableAndEntityVar();
}