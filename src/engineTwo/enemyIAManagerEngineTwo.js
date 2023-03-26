function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const runIaTurn = () => {

    if(actualMapEngineTwo.entityOnTactical[whichEntityTurn].state === "dead")
    {
        endTurn();
        return;
    }

    let entityIa = actualMapEngineTwo.entityOnTactical[whichEntityTurn]
    let timeBetweenAction = 500; // time between action of the IA

    for(let i = 0; i < entityIa.pm; i++)
    {
        setTimeout(() => {

            // Action Ia
            if(attackIA(entityIa) === true){
                setTimeout(() => { mooveOneCaseIA(entityIa) }, timeBetweenAction) // Attack and then wait for Moove
            }else{
                mooveOneCaseIA(entityIa)
                setTimeout(() => { 
                    attackIA(entityIa)
                }, timeBetweenAction)
            }

            // Action Ia 

        }, timeBetweenAction * i);
    }

    setTimeout(() => {
        endTurn();
    }, timeBetweenAction + timeBetweenAction * entityIa.pm);
}

const mooveOneCaseIA = (entityIa) => {
    let movableIaCase = getMovableCase(entityIa.pos[0], entityIa.pos[1], 1)
    let casePlayer = actualMapEngineTwo.entityOnTactical[0].pos;
    let nextCase;
    let chosedPath = 0;

    let pathLuck = getRandomInt(100)

    if(pathLuck > 50){
        for(let i = 0; i < movableIaCase.length; i ++)
        {
            let caseX = Math.abs(movableIaCase[i][0] - casePlayer[0]);
            let caseY = Math.abs(movableIaCase[i][1] - casePlayer[1]);
            let sumCase = caseX + caseY;
            if((Math.abs(movableIaCase[chosedPath][0] - casePlayer[0]) + Math.abs(movableIaCase[chosedPath][1] - casePlayer[1])) > sumCase){
                chosedPath = i;
            }
        } // ? Pattern Path finding
    }else{
        chosedPath = getRandomInt(movableIaCase.length -1)+1; // Random Path
    }

    // 50 % To get the perfect path

    nextCase = movableIaCase[chosedPath];
    console.log(nextCase)
    resetMovableCase()
    setEntityNextCase(entityIa, nextCase)
}

const attackIA = (entityIa) => {
    let selectAbilityIa = 0;
    let attackableCase = getAttackableCase(entityIa.pos[0], entityIa.pos[1], entityIa.abilities[selectAbilityIa].range);
    let target = null;
    for(let i = 0; i < attackableCase.length; i++)
    {
        if(getSpriteTactical(attackableCase[i][0], attackableCase[i][1]) !== null)
        {
            if(getSpriteTactical(attackableCase[i][0], attackableCase[i][1]).id === 0)
            {
                target = getSpriteTactical(attackableCase[i][0], attackableCase[i][1]); // Select the target 
            }
        }
    }
    if(target !== null){
        launchAttack(entityIa, actualMapEngineTwo.entityOnTactical[0], selectAbilityIa);
        resetAttackableCase()
        return true;
    }else{
        resetAttackableCase()
        return false;
    }
    
}