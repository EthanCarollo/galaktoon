const playerInputForEngineTwo=()=>{
    if(mouseIsPressed === true)
    {
        if(mouseIsInArrayEngineTwo() === true){
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
    if(getTacticalTileOnMouseClick() === 0 && selectedChar !== 0)
    {
        actionShow(getCoordTileWithMouseClickEngineTwo()[0], getCoordTileWithMouseClickEngineTwo()[1], 2)
    }
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
