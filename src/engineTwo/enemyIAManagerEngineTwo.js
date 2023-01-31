const enemyIaTurn = () => {
    enemyIaUseAbility();
    switchTeamTurn(turnTeam)
}

const enemyIaUseAbility = () => {
    useAbilityOnTarget(enemyTeam[0].abilities[0], playerTeam[0])
}

// It actually work