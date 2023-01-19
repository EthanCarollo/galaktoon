const changeCurrentAbilityOnInput = () => {
    if(keyIsDown(65)){
        currentAbilityUsed = 0;
    }
    if(keyIsDown(90)){
        currentAbilityUsed = 1;
    }
    if(keyIsDown(69)){
        currentAbilityUsed = 2;
    }
}

const changeCurrentTargetOnInput = () => {
    if(keyIsDown(UP_ARROW)){
        currentTarget++;
        compareCurrentTargetAndEnemyTeam(currentTarget);
    }
    if(keyIsDown(DOWN_ARROW))
    {
        currentTarget--;
        compareCurrentTargetAndEnemyTeam(currentTarget);
    }
}

const attackCurrentTargetOnInput = () => {
    if(keyIsDown(32))
    {
        let playerAttack = playerTeam[currentTurn].abilities[currentAbilityUsed];
        let enemyWhoGetAttacked = enemyTeam[currentTarget];
        attackTarget(playerAttack, enemyWhoGetAttacked);
    }
}

const attackTarget = (currentAttack, currentTarget) => {

    switch(currentAttack.type){
        case "attack":
            currentTarget.hp.current = currentTarget.hp.current - 20;
            break;
        default :
            throw new Error("Player abilities don't actually work cause there is no good type")
            break;
    }
    if(currentTarget.hp.current <= 0){
        currentTarget.hp.current = 0;
    }
}

const compareCurrentTargetAndEnemyTeam = (currentTargetNumber) => {
    if(currentTargetNumber >= enemyTeam.length){
        currentTarget = 0;
    }
    if(currentTargetNumber < 0)
    {
        currentTarget = (enemyTeam.length -1)
    }
}