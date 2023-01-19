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
    let mouseCurrentX = Math.floor((window.innerWidth - mouseX -120) / 200);
    let mouseCurrentY = Math.floor((window.innerHeight - mouseY) / 200);
    if(mouseCurrentX === 0){
        changeCurrentTarget(mouseCurrentY)
    }
}

const changeCurrentTarget = (targetIndex) => {
    if(targetIndex < (enemyTeam.length))
    {
        currentTarget = targetIndex;
    }
}

const attackCurrentTargetOnInput = () => {
    if(keyIsDown(32))
    {
        let playerAttack = playerTeam[currentTurn].abilities[currentAbilityUsed];
        let enemyWhoGetAttacked = enemyTeam[currentTarget];
        useAbilityOnTarget(playerAttack, enemyWhoGetAttacked);
        actualTurnGame ++;
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