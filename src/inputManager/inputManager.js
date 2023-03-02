const runInputManager = () => {
    switch(actualEngine){
        case EngineOne :
            playerInputForEngineOne();
            break;
        case EngineTwo :
            playerInputForEngineTwo();
            break;
        default :
            throw new Error("Actual engine isn't set, the game can't run")
            break;
    }
}

function keyPressed(){
    switch(actualEngine){
      case EngineOne :
        playerKeyPressedForEngineOne()
        break;
      case EngineTwo :
        playerKeyPressedForEngineTwo()
        break;
      default :
        break;
    }
}

function mouseClicked(){
    switch(actualEngine){
        case EngineOne :

          break;
        case EngineTwo :
          keyPressedForEngineTwo();
          break;
        default :
          break;
      }
}
