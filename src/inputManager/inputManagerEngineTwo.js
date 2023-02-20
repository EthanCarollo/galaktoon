const playerInputForEngineTwo=()=>{
    if(fightIsEnd === false){
        changeCurrentAbilityOnInput();
    }
}

const playerKeyPressedForEngineTwo = () => {
    if(fightIsEnd === false){
        attackCurrentTargetOnInput();
    }
}

const keyPressedForEngineTwo = () => {
    /*if(fightIsEnd === false){
        changeCurrentTargetOnInput();
    }*/ // actually useless cause i use UI tools
}