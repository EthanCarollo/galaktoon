// ---- Player Fight

const createInterfaceForFight = () => {
    createAbilityPlayer(playerTeam[currentTurn])
}

const createAbilityPlayer = (currentPlayerTurn) => {
    for(let i = 0;i < currentPlayerTurn.abilities.length;i++)
    {
        let currentAbility = currentPlayerTurn.abilities[i]
        let iconSize = 80;
        let xIcon = iconSize + (iconSize*1.25) *i
        let yIcon = iconSize / 1.5
        createIconAbility(xIcon, yIcon, iconSize, currentAbility.id, i)
    }
}

const createIconAbility = (x, y, size, abilityID, abilityIndexOnCharacter) => {
    if(abilityIndexOnCharacter > 2)
    {
        throw new Error("can't create Ability UI cause abilityIndex is out of array")
    }
    if(abilityIndexOnCharacter === currentAbilityUsed)
    {
        tint(150, 0, 0)
        image(uiData[abilityID].image, x, y, size, size)
        noTint()
    }else{
        image(uiData[abilityID].image, x, y, size, size)
    }
}

// ---- Player Fight