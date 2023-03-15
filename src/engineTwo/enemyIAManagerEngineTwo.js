function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const runIaTurn = () => {

    let entityIa = actualMapEngineTwo.entityOnTactical[whichEntityTurn]
    let timeSet = 450;
    mooveOneCaseIA(entityIa)
    for(let i = 0; i < entityIa.pm; i++)
    {
        setTimeout(() => {
            mooveOneCaseIA(entityIa)
        }, timeSet * i);
    }
    setTimeout(() => {
        endTurn();
    }, timeSet + timeSet * entityIa.pm);
}

const mooveOneCaseIA = (entityIa) => {
    let movableIaCase = getMovableCase(entityIa.pos[0], entityIa.pos[1], 1)
    let casePlayer = actualMapEngineTwo.entityOnTactical[0].pos;
    let nextCase;
    for(let i = 0; i < movableIaCase.length; i ++)
    {
        
    } // Pattern Path finding
    nextCase = movableIaCase[getRandomInt(movableIaCase.length -1)+1];
    resetMovableCase()
    setEntityNextCase(entityIa, nextCase)
}