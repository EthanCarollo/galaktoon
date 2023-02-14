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
        createIconAbility(xIcon, yIcon, iconSize, currentAbility, i)
    }
}

const createIconAbility = (x, y, size, ability, abilityIndexOnCharacter) => {
    if(abilityIndexOnCharacter > 2)
    {
        throw new Error("can't create Ability UI cause abilityIndex is out of array")
    }
    if(abilityIndexOnCharacter === currentAbilityUsed)
    {
        image(uiData[ability.id].image, x, y, size, size)
        image(uiData[6].image, x, y, size, size)
    }else{
        image(uiData[ability.id].image, x, y, size, size)
    }
    createAblityIndication( x, y, size, abilityIndexOnCharacter);
    showLevelUI( x, y, size, ability.abilityLevel) // using the tool used in engine one
}

const createAblityIndication = (x, y, size, abilityIndexOnCharacter) => {
    fill(255,0,0)
    textSize(32)
    switch(abilityIndexOnCharacter){
        case 0:
            text("A",x,y+size,size)
            break;
        case 1:
            text("Z",x,y+size,size)
            break;
        case 2:
            text("E",x,y+size,size)
            break;
    }
}

const useAbilityOnTarget = (currentAttack, currentTarget, attackerRef = null) => {
    
    attackerRef.state = currentAttack.type;
    let amountOfDamage = currentAttack.baseAmount * (currentAttack.abilityLevel / 1.5)
    console.log(amountOfDamage)
    switch(currentAttack.type){
        case "attack":
            currentTarget.hp.current = currentTarget.hp.current - amountOfDamage;
            break;
        case "heal":
            healCharacterPlayerTeam(amountOfDamage, currentTurn)
            break;
        case "healAll":
            healAllCharacter(amountOfDamage)
            break;
        default :
            throw new Error("Player abilities don't actually work cause there is no good type")
    }
    if(currentTarget.hp.current <= 0){
        currentTarget.hp.current = 0;
    }

    debugLogFightArray(currentAttack, currentTarget);
}

const debugLogFightArray = (currentAttack, currentTarget) => {
    if(turnTeam === "player")
    {
        fightLog.push(playerTeam[0].name + " " + currentAttack.name + " on " + currentTarget.name)
    }else{
        fightLog.push(enemyTeam[0].name + " " + currentAttack.name + " on " + currentTarget.name)
    }
}

const healAllCharacter = (amount) => {
    for(let i = 0; i < playerTeam.length; i++)
    {
        console.log(amount)
        healCharacterPlayerTeam(amount, i);
    } 
}

const healCharacterPlayerTeam = (amount, characterIndex) => {
    playerTeam[characterIndex].hp.current = playerTeam[characterIndex].hp.current + amount;
    if(playerTeam[characterIndex].hp.current > playerTeam[characterIndex].hp.max)
    {
        playerTeam[characterIndex].hp.current = playerTeam[characterIndex].hp.max 
    }
}

// ---- Player Fight