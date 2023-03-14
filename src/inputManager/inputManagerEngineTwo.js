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
    let arrayMousePos = getCoordTileWithMouseClickEngineTwo();
    console.log(arrayMousePos)
    if(!isAMovableCase(arrayMousePos[0], arrayMousePos[1])){
        resetMovableAndEntityVar()
        selectedEntity = getSpriteWithCoord(arrayMousePos[0], arrayMousePos[1])
    }
    if(selectedEntity !== null && selectedChar !== 0)
    {
        canvas.mouseReleased(()=>{
            getMovableCase(arrayMousePos[0], arrayMousePos[1], 2);
            selectedChar = 0;
            selectedEntity = getSpriteWithCoord(arrayMousePos[0], arrayMousePos[1]);
        })
    }else if(getTacticalTileOnMouseClick() === 0 && selectedChar === 0 && selectedEntity !== null){
        canvas.mouseReleased(()=>{
            resetMovableAndEntityVar()
        })
    }
    if(selectedEntity !== null && selectedChar === 0)
    {
        console.log("---------------- CLICKED HERE")
        console.log(isAMovableCase(arrayMousePos[0], arrayMousePos[1]))
        canvas.mouseReleased(()=>{
            console.log("clicked")
            if(isAMovableCase(arrayMousePos[0], arrayMousePos[1]))
            {
                console.log("clicked2")
                selectedEntity.nextCase = [arrayMousePos[0], arrayMousePos[1]];
                resetMovableAndEntityVar()
            }
        })
    }
}

const resetMovableAndEntityVar = () => {
    resetMovableCase()
    selectedChar = null;
    selectedEntity = null;
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
