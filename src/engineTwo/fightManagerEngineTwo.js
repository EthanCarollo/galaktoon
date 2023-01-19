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

    }
}

const attackTarget = (currentAbility, currentTarget) => {}

const compareCurrentTargetAndEnemyTeam = (currentTargetNumber) => {
    if(currentTargetNumber >= enemyTeam.length){
        currentTarget = 0;
    }
    if(currentTargetNumber < 0)
    {
        currentTarget = (enemyTeam.length -1)
    }
}