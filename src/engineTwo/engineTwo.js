

const runEngineTwo = () => {
    background(180)
    displayTopDownMapEngineTwo();
    inputKeyEngineTwo();
}

const displayTopDownMapEngineTwo = () => {
    createMapTopDown("back", actualMapEngineTwo.map.groundLayer, actualMapEngineTwo, vectorMapEngineTwo);
    createMapTopDown("back", actualMapEngineTwo.map.objectLayer, actualMapEngineTwo, vectorMapEngineTwo);


    createMapTopDown("front", actualMapEngineTwo.map.groundLayer, actualMapEngineTwo, vectorMapEngineTwo);
    createMapTopDown("front", actualMapEngineTwo.map.objectLayer, actualMapEngineTwo, vectorMapEngineTwo);
}

const inputKeyEngineTwo = () => {
    if(mouseIsPressed === true)
    {
        cursor('grab');
        draggingEngineTwo();
        return;
    }

    if(mouseGestion === true && mouseIsPressed === false && previousPosMouseX !== null && previousPosMouseY !== null){
        mouseGestion = false;
        previousPosMouseX = null;
        previousPosMouseY = null;
    }
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


