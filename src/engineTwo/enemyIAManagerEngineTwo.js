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
    runIaPattern(entityIa)
    
}


//#region // * Different IA Pattern region

const runIaPattern = (entityIa) => {
    /** 
     * * This code will play different gameplay for differents IA patterns, nothing extremely advanced,
     * * just a 'IA' that play differents playstyle like we can see in old retro games
     */
    switch(entityIa.pattern)
    {
        case 'normal' : 
            runStandardIaPattern(entityIa, 65); // 65 % to go on the player else moove randomly
            break;
        case 'aggressive' : 
            runStandardIaPattern(entityIa, 100); // Agressive just run on the player
            break;
        case 'aggro-passive' : 
            runStandardIaPattern(entityIa, 0); // Moove randomly
            break;
        default :
            throw new Error("Entity Ia Pattern isn't defined or doesnt exist : " + entityIa.pattern)
    }
}

/**
 * @param {object} entityIa the object Ia 
 * @param {int} chance it's the percent of chance that the entity go directly on the player 
 */
const runStandardIaPattern = (entityIa, chance) => {
    /**
     * * Standard playstyle for an IA, sometimes IA will go on the player and sometimes not,
     * * and when entity can attack the player, the entity attack the player, we can change the
     * * probability of the next moove of the player by changing the change
     */

    let timeBetweenAction = 650; // time between action of the IA

    for(let i = 0; i < entityIa.pm; i++)
    {
        setTimeout(() => {

            // Action Ia
            if(attackIA(entityIa) === true){
                setTimeout(() => { mooveOneCaseIA(entityIa) }, timeBetweenAction) // Attack and then wait for Moove
            }else{
                mooveOneCaseIA(entityIa, chance)
                setTimeout(() => { 
                    attackIA(entityIa, chance)
                }, timeBetweenAction)
            }

            // Action Ia 

        }, timeBetweenAction * i);
    }

    setTimeout(() => {
        endTurn();
    }, timeBetweenAction + timeBetweenAction * entityIa.pm);
}

//#endregion

/**
 * @param {object} entityIa the object Ia 
 * @param {int} chance it's the percent of chance that the entity go directly on the player 
 */
const mooveOneCaseIA = (entityIa , chance) => {
    entityIa.pos = [Math.round(entityIa.pos[0]), Math.round(entityIa.pos[1])]; 
    // I'm rounding it cause i don't want to have bug like "Entity pos isn't an int"
    let movableIaCase = getMovableCase(entityIa.pos[0], entityIa.pos[1], 1)
    let casePlayer = actualMapEngineTwo.entityOnTactical[0].pos;
    let nextCase;
    let chosedPath = 0;

    let pathLuck = getRandomInt(100)

    if(pathLuck > (100 - chance)){
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

    // 65 % To get the perfect path

    nextCase = movableIaCase[chosedPath];
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
        // I don't need to verify if the PA is > 0 cause it already does in the launch attack function 
    }
    resetAttackableCase()
    return target !== null; // Return if a target has been selected or not
    
    
}