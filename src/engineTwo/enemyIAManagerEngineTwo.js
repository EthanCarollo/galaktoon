const enemyIaTurn = () => {
    if(fightIsEnd === false){
        enemyIaUseAbility();
        setTimeout(() => {
            enemyTeam[0].state = "idle"
            switchTeamTurn(turnTeam)
        }, 1000);
    }
}

const enemyIaUseAbility = () => {
    useAbilityOnTarget(enemyTeam[0].abilities[0], playerTeam[0], enemyTeam[0])
}

// It actually work