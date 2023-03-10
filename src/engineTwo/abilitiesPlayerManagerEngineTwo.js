// ---- Player Fight

const createInterfaceForFight = () => {
    createAbilityPlayer(playerTeam[currentTurn])
}

const createAbilityPlayer = (currentPlayerTurn) => {
    for(let i = 0;i < currentPlayerTurn.abilities.length;i++)
    {
        let currentAbility = currentPlayerTurn.abilities[i]
        let iconSize = 80;
        let paddingBetween = iconSize /3;
        let xIcon = (window.innerWidth/2) + iconSize * i -(iconSize * 1.5) + paddingBetween * i - (paddingBetween*1.5)
        let yIcon = iconSize / 1.5 + (window.innerHeight) - iconSize * 2
        createIconAbility(xIcon, yIcon, iconSize, currentAbility, i)
        createInputButtonWithCallback(xIcon, yIcon, iconSize, iconSize, () => { changeCurrentAbility(i) })
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

    debugLogFightArray(attackerRef, currentAttack, currentTarget, currentAttack.type);
}

const debugLogFightArray = (currentAttacker ,currentAttack, currentTarget, attackType) => {
    let logFight;
    switch(attackType){
        case "attack" : logFight = currentAttacker.name + " " + currentAttack.name + " on " + currentTarget.name; break;
        case "heal" : logFight = currentAttacker.name + " healed himself "; break;
        case "healAll" : logFight = currentAttacker.name + " healed the team "; break;
    }
    fightLog.push(logFight)
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