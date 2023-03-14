
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
}

const useAbility = (entity, target = 1, selectedAbility = 0) => {
    if(entity.pa > 0)
    {

    }
}