const enemyIaTurn = () => {
    if(fightIsEnd === false){
        let currentAttacker = actualIaTurn()
        let currentStateBeforeAttack = currentAttacker.state
        enemyIaUseAbility(currentAttacker);
        setTimeout(() => {
            currentAttacker.state = currentStateBeforeAttack
            switchTeamTurn(turnTeam)
        }, 1000);
    }
}

const actualIaTurn = () => {
    for(let i = 0; i < enemyTeam.length; i++)
    {
        if(enemyTeam[i].state !== "dead")
        {
            return enemyTeam[i]
        }
    }
}

const enemyIaUseAbility = (enemyCharacterTeam) => {
    useAbilityOnTarget(enemyCharacterTeam.abilities[0], playerTeam[0], enemyCharacterTeam)
}

// It actually work