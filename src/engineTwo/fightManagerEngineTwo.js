/**
 * * When an entity finish his turn, just call this function to swap of turn
 */
const endTurn = () => {
    turnManager();
}



const turnManager = () => {
    if(whichEntityTurn >= actualMapEngineTwo.entityOnTactical.length || whichEntityTurn === null)
    {
        throw new Error("which entity turn is out of length or is null : " + whichEntityTurn)
    }

    
    nextIndexEntityTurn();
    resetMovableAndEntityVar();
    setSelectedEntity();

    selectedEntity.pm = 2;
    selectedEntity.pa = 2;
    checkIaTurn()
}



const checkIaTurn = () => {
    /**
     * * This function is called at the end of each turn, when an entity is mooving or not or whatever else*
     * * This algorithms check if the IA still have pm for running the turn, then if the run ia turn is sending
     * * false, that's mean that the entity can't moove and can't attack so i just decrease the pa by one and
     * * relaunch the function and then when IA don't have pm or pa, this just end the turn
     */
    if(whichEntityTurn > 0)
    {
        if(actualMapEngineTwo.entityOnTactical[whichEntityTurn].pm > 0)
        {
            runIaTurn(); 
            return;
        }
        if(actualMapEngineTwo.entityOnTactical[whichEntityTurn].pa > 0)
        {
            if(runIaTurn() === false)
            {
                actualMapEngineTwo.entityOnTactical[whichEntityTurn].pa--;
                checkIaTurn();
                return;
            }else{
                return;
            };
        }
        endTurn();
    }
}



const nextIndexEntityTurn = () => {
    whichEntityTurn ++;
    if(whichEntityTurn >= actualMapEngineTwo.entityOnTactical.length)
    {
        whichEntityTurn = 0;
    }
}



/**
 * @param {object} entity entity object 
 * @param {int} target target of the current map 
 * @param {int} selectedAbility selected ability index of the 'entity' obj 
 * ! Deprecated Method, this method use a time out and is no longer used
 */
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



/**
 * @param {int} x the start x of the zoning of where we can attack
 * @param {int} y the start y of the zoning of where we can attack
 * @param {int} attackPoint the number of attack point
 * @returns {array[array[int]]} returns an array of coords who are in an array [[x,y],[x,y+1],...]
 */
const getAttackableCase = (x, y, attackPoint) => {
    canAttackCase = [[x, y]]
    for(let i = 1; i<attackPoint+1;i++)
    {
        addCanAttackCase([x +  i, y])
        addCanAttackCase([x - i, y])
        addCanAttackCase([x, y +i])
        addCanAttackCase([x, y -i])
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



/**
 * @param {int} x position x on the tilemap
 * @param {int} y position y on the tile map
 * @returns {boolean} true or false if it's an attackable case
 */
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



//#region // * Usefull function when we launch an attack


/**
 * @param {object} entity the entity who attacks
 * @param {object} target the target object (entity)
 * @param {int} abilityIndex the selected ability of the attack
 * @returns {boolean} return if the attack can be launch or not
 */
const launchAttack = (entity = actualMapEngineTwo.entityOnTactical[whichEntityTurn], target, abilityIndex = selectedAbility) => {
    if(entity.pa > 0){

        // TODO
        if(selectedAbility >= 2 && target.id === 2 /* This is the id of the dark woaf*/) // TODO : Temp for the debug of the launch animation on cinematic fight
        {
            launchAnimationCinematicFight(() => {
                attackWithTheCurrentAbility(entity, abilityIndex, target)
                resetMovableAndEntityVar();
            });
            return true;
        }
        // TODO

        attackWithTheCurrentAbility(entity, abilityIndex, target)
        resetMovableAndEntityVar();
        return true;
    }else{
        return false;
    }
}

/**
 * @param {object} entity entity object 
 * @param {int} abilityIndex the ability index of the entity that it used 
 * @param {object} target target entity object
 */
const attackWithTheCurrentAbility = (entity, abilityIndex, target) => {
    switch(entity.abilities[abilityIndex].type)
    {
        case 'heal' :
            entity.state = "heal";
            entity.pa --;
            setTimeout(() => {
                target.health.actualHealth += entity.abilities[abilityIndex].baseAmount;
                if(target.health.actualHealth >= target.health.maxHealth) target.health.actualHealth = target.health.maxHealth;
            }, 450);
            break;
        default :
            entity.state = "fight";
            entity.pa --;
            setTimeout(() => {
                target.health.actualHealth -= entity.abilities[abilityIndex].baseAmount;
            }, 450);
        break;
    }
} 

//#endregion

/**
 * @returns {boolean} if all enemies are dead or not
 */
const checkAllEnemiesDead = () => {
    /**
     * * Check if all enemies (so except id 0) are dead (and return true or false)
     */
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

/**
 * @returns {boolean} if all allies are dead or not (in our case, we only have our player actually)
 */
const checkAllAlliesDead = () => {
    if(playerTeam[0].health.actualHealth <= 0)
    {
        playerTeam[0].health.actualHealth = 0;
        return true;
    }else{
        return false;
    }
}