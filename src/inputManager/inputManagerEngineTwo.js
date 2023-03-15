const playerInputForEngineTwo=()=>{
    if(mouseIsPressed === true)
    {
        if(mouseIsInArrayEngineTwo() === true && whichEntityTurn < 1){
            InputOnArray()
        }
    }
    /*
    if(mouseGestion === true && mouseIsPressed === false && previousPosMouseX !== null && previousPosMouseY !== null){
        mouseGestion = false;
        previousPosMouseX = null;
        previousPosMouseY = null;
    }*/ // Grab temp function
}

const InputOnArray = () => {
    let arrayMousePos = getCoordTileWithMouseClickEngineTwo();

    if(isAnAttackableCase(arrayMousePos[0], arrayMousePos[1]) && selectedEntity !== null)
    {
        if(getSpriteTactical(arrayMousePos[0], arrayMousePos[1]) !== null)
        {
            launchAttack()
            return;
        }
    }

    if(selectedEntity !== null && selectedEntity.id === 0)
    {
        if(canMoveCase.length > 0)
        {
            canvas.mouseReleased(()=>{
                if(isAMovableCase(arrayMousePos[0], arrayMousePos[1]))
                {
                    selectedEntity.nextCase = [arrayMousePos[0], arrayMousePos[1]];
                    applyDifferencePmWithNextCase(selectedEntity)
                    resetMovableAndEntityVar()
                }
            })
        }else{
            canvas.mouseReleased(()=>{
                if(getSpriteTactical(arrayMousePos[0], arrayMousePos[1]) !== null){
                    if(getSpriteTactical(arrayMousePos[0], arrayMousePos[1]).id === 0)
                    {
                        getMovableCase(actualMapEngineTwo.entityOnTactical[whichEntityTurn].pos[0], actualMapEngineTwo.entityOnTactical[whichEntityTurn].pos[1], selectedEntity.pm);
                        selectedEntity = getSpriteWithCoord(arrayMousePos[0], arrayMousePos[1]);
                    }
                }// Verify if the sprite clicked is the player sprite 
            })
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

let previousPosMouseX = null;
let previousPosMouseY = null;
let mouseGestion = false;
const draggingEngineTwo = () => {
  if(previousPosMouseY === null ||previousPosMouseY === null)
  {
    previousPosMouseX = mouseX;
    previousPosMouseY = mouseY;
  }

  vectorMapEngineTwo[0] += mouseX - previousPosMouseX;
  vectorMapEngineTwo[1] += mouseY - previousPosMouseY;
  previousPosMouseX = mouseX;
  previousPosMouseY = mouseY;
  mouseGestion = true;
}
