
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