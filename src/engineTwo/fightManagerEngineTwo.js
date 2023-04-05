
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
    actualMapEngineTwo.entityOnTactical[whichEntityTurn].pa = 2;
    selectedEntity = actualMapEngineTwo.entityOnTactical[whichEntityTurn]
}

const useAbility = (entity, target = 1, selectedAbility = 0) => {
    if(entity.pa > 0)
    {
        switch(entity.abilities[selectedAbility].type)
        {
            case "attack" :
                setTimeout(() => {
                    actualMapEngineTwo.entityOnTactical[target].health.actualHealth -= entity.abilities[selectedAbility].baseAmount;
                }, 450);
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
        if(actualMapEngineTwo.tacticalMap[Math.round(position[1])][Math.round(position[0])] !== -1)
        {
            return;
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



// ! --------------------------------------------------------------
// ! Function Used universally for use a specific ability on a target

const launchAttack = (entity = actualMapEngineTwo.entityOnTactical[whichEntityTurn], target, abilityIndex = selectedAbility) => {
    if(entity.pa > 0){
        attackWithTheCurrentAbility(entity, abilityIndex, target)
        resetMovableAndEntityVar();
    }
}

const attackWithTheCurrentAbility = (entity, abilityIndex, target) => {
    switch(entity.abilities[abilityIndex].type)
    {
        default :
            entity.state = "fight";
            entity.pa --;
            setTimeout(() => {
                target.health.actualHealth -= entity.abilities[abilityIndex].baseAmount;
            }, 450);
        break;
    }
} 
// ! Function Used universally for use a specific ability on a target
// ! --------------------------------------------------------------

// Check if all enemies (so except id 0) are dead (and return true or false)
const checkAllEnemiesDead = () => {
    let count = 0;
    for(let i = 1; i < actualMapEngineTwo.entityOnTactical.length; i++)
    {
        if(actualMapEngineTwo.entityOnTactical[i].health.actualHealth <= 0)
        {
            actualMapEngineTwo.entityOnTactical[i].state = "dead";
            count ++;
        }
    } 

    if(count >= (actualMapEngineTwo.entityOnTactical.length-1))
    {
        return true;
    }else{
        return false;
    }
}

const checkAllAlliesDead = () => {
    if(playerTeam[0].health.actualHealth <= 0)
    {
        playerTeam[0].health.actualHealth = 0;
        return true;
    }else{
        return false;
    }
}