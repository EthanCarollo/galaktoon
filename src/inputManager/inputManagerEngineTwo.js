const playerInputForEngineTwo=()=>{
    if(mouseIsPressed === true && canInputEngineTwo === true)
    {
        if(mouseIsInArrayEngineTwo() === true && whichEntityTurn < 1 && abilityIsOpen === false){
            InputOnArray()
        }
    }
}

const InputOnArray = () => {

    attackInputInSecondEngine();
    mooveInputInSecondEngine();

}

const attackInputInSecondEngine = () => {
    /**
     * * Check if the case is attackable or if the sprite on the tactical isn't null etc..
     */
    let arrayMousePos = getCoordTileWithMouseClickEngineTwo();

    if(isAnAttackableCase(arrayMousePos[0], arrayMousePos[1]) && selectedEntity !== null)
    {
        if(getSpriteTactical(arrayMousePos[0], arrayMousePos[1]) !== null)
        {
            if(getSpriteTactical(arrayMousePos[0], arrayMousePos[1]).id !== 0)
            {
                launchAttack(
                            actualMapEngineTwo.entityOnTactical[whichEntityTurn] /* attacker */, 
                            getSpriteTactical(arrayMousePos[0], arrayMousePos[1]), /* target */
                            selectedAbility /* ability */
                            )
                return;
            }else{
                resetAttackableCase();
                getMovableCase(actualMapEngineTwo.entityOnTactical[whichEntityTurn].pos[0], actualMapEngineTwo.entityOnTactical[whichEntityTurn].pos[1], selectedEntity.pm);
            }
        }
    }
}

const mooveInputInSecondEngine = () => {
    let arrayMousePos = getCoordTileWithMouseClickEngineTwo();

    if(selectedEntity !== null && selectedEntity.id === 0)
    {
        if(canMoveCase.length > 0)
        {
            canvas.mouseReleased(()=>{
                if(isAMovableCase(arrayMousePos[0], arrayMousePos[1]) && getSpriteTactical(arrayMousePos[0], arrayMousePos[1]) === null)
                {
                    selectedEntity.nextCase = [arrayMousePos[0], arrayMousePos[1]];
                    applyDifferencePmWithNextCase(selectedEntity)
                    resetMovableAndEntityVar()
                }
            })
        }else{
            if(getSpriteTactical(arrayMousePos[0], arrayMousePos[1]) !== null){
                if(getSpriteTactical(arrayMousePos[0], arrayMousePos[1]).id === 0)
                {
                    canvas.mouseReleased(()=>{
                        getMovableCase(actualMapEngineTwo.entityOnTactical[whichEntityTurn].pos[0], actualMapEngineTwo.entityOnTactical[whichEntityTurn].pos[1], selectedEntity.pm);
                        selectedEntity = getSpriteWithCoord(arrayMousePos[0], arrayMousePos[1]);
                    })
                }
            }// Verify if the sprite clicked is the player sprite 
        }
        
    } // Set or moove the player with an ID who is Equal to 0

    if(getTacticalTileOnMouseClick() === 0 && selectedEntity !== null){
        if(selectedEntity.id !== 0){
            canvas.mouseReleased(()=>{
                resetMovableAndEntityVar()
            })
        }
    }
}

const resetMovableAndEntityVar = () => {
    resetAttackableCase();
    resetMovableCase()
    selectedChar = null;
    selectedEntity = null;
    selectedAbility = null;
}

const playerKeyPressedForEngineTwo = () => {
    
}

const keyPressedForEngineTwo = () => {
    
}
