const playerInputForEngineTwo=()=>{
}

const playerKeyPressedForEngineTwo = () => {
    if(fightIsEnd === false){
        if(keyIsDown(65)){
            changeCurrentAbility(0);
        }
        if(keyIsDown(90)){
            changeCurrentAbility(1);
        }
        if(keyIsDown(69)){
            changeCurrentAbility(2);
        }
        if(keyIsDown(32)){
            attackCurrentTargetOnInput(2);
        }
    }
}

const keyPressedForEngineTwo = () => {
    /*if(fightIsEnd === false){
        changeCurrentTargetOnInput();
    }*/ // actually useless cause i use UI tools
}