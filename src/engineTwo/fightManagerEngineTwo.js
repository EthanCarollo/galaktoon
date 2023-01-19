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
    if(keyIsDown(32) && turnTeam === "player")
    {
        let playerAttack = playerTeam[currentTurn].abilities[currentAbilityUsed];
        let enemyWhoGetAttacked = enemyTeam[currentTarget];
        useAbilityOnTarget(playerAttack, enemyWhoGetAttacked);
        endTurn();
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

// ------- TURN MANAGER

const endTurn = () => {
    switchTeamTurn(turnTeam)
    console.log("endTurn, wait")
    setTimeout(() => {
        console.log("You can play now")
        turnManager(turnTeam)
        actualTurnGame ++;
    }, 2000);
}

const switchTeamTurn = (teamTurn) => {
    switch(teamTurn){
        case "player" :
            turnTeam = "ia"
            break;
        case "ia" :
            turnTeam = "player"
            break;
        default :
            throw new Error("It will be the turn of nobody which is IMPOSSIBLE")
    }
}

const turnManager = (teamTurn) => {
    switch(teamTurn){
        case "player" :
            break;
        case "ia" :
            enemyIaTurn();
            break;
        default :
            throw new Error("It's the turn of nobody which is IMPOSSIBLE")
    }
}

// ------- TURN MANAGER