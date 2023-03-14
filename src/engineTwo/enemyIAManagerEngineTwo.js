function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const runIaTurn = () => {

    let entityIa = actualMapEngineTwo.entityOnTactical[whichEntityTurn]

    mooveOneCaseIA(entityIa)

    setTimeout(() => {
        mooveOneCaseIA(entityIa)
    }, 500);
    setTimeout(() => {
        endTurn();
    }, 1500);
}

const mooveOneCaseIA = (entityIa) => {
    let movableIaCase = getMovableCase(entityIa.pos[0], entityIa.pos[1], 1)
    let nextCase = movableIaCase[getRandomInt(movableIaCase.length -1)+1];
    resetMovableCase()
    setEntityNextCase(entityIa, nextCase)
}