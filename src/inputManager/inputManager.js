const runInputManager = () => {
    switch(actualEngine){
        case EngineStateEnum.EngineOne :
            playerInputForEngineOne();
            break;
        case EngineStateEnum.EngineTwo :
            playerInputForEngineTwo();
            break;
        default :
            throw new Error("Actual engine isn't set, the game can't run")
            break;
    }
}

function keyPressed(){
    switch(actualEngine){
      case EngineStateEnum.EngineOne :
        playerKeyPressedForEngineOne()
        break;
      case EngineStateEnum.EngineTwo :
        playerKeyPressedForEngineTwo()
        break;
      default :
        break;
    }
}

function mouseClicked(){
    switch(actualEngine){
        case EngineStateEnum.EngineOne :

          break;
        case EngineStateEnum.EngineTwo :
          keyPressedForEngineTwo();
          break;
        default :
          break;
      }
}
