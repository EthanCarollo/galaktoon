const playerInputForEngineOne=()=>{
    switch(playerState){
        case PlayerStateEnum.Normal :
            playerInputMoove();
            playerInputInteraction();
            break;
        case PlayerStateEnum.Dialog :
            playerDialogInput();
            break;
        default :
            throw new Error("PlayerState isn't set or doesn't exist in input")
    }
}



const playerInputInteractForEngineOne = () => {
    if(playerCanInteract === true){
  
        let playerCaseInteract = tileNextToThePlayer()
    
        if(keyIsDown(69)) {
            playerInteraction(playerCaseInteract)
        }
    }
}



const playerDialogInput = () => {
    playerIsMooving = false;
}



const playerInputMoove = () => {
    if(playerCanMove === true){
        /**
         * * Moove the player on different key holded
         */

        playerDirection = [0, 0]; // reset player direction every frame
        playerIsMooving = false;
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // When players touch right arrow or D
            cameraVector.x += playerSpeed
            playerVector.x -= playerSpeed
            mapVector.x += playerSpeed
            playerDirection[0] += 1;
            if(getPlayerCollision(createVector(-10, 0)))
            {
                cameraVector.x -= playerSpeed
                playerVector.x += playerSpeed
                mapVector.x -= playerSpeed
            }
        }
        if (keyIsDown(LEFT_ARROW) || keyIsDown(81)) { // When players touch left arrow or Q
            cameraVector.x -= playerSpeed
            playerVector.x += playerSpeed
            mapVector.x -= playerSpeed
            playerDirection[0] -= 1;
            if(getPlayerCollision(createVector(20, 0)))
            {
                cameraVector.x += playerSpeed
                playerVector.x -= playerSpeed
                mapVector.x += playerSpeed
            }
        }
        if(keyIsDown(UP_ARROW) || keyIsDown(90)) { // When players touch up arrow or Z
            cameraVector.y -= playerSpeed
            playerVector.y += playerSpeed
            mapVector.y -= playerSpeed
            playerDirection[1] -= 1;
            if(getPlayerCollision(createVector(0, 35))){
                cameraVector.y += playerSpeed
                playerVector.y -= playerSpeed
                mapVector.y += playerSpeed 
            }
        }
        if(keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // When players touch down arrow or S
            cameraVector.y += playerSpeed
            playerVector.y -= playerSpeed
            mapVector.y += playerSpeed
            playerDirection[1] += 1;  
            if(getPlayerCollision(createVector(0, 0))){
                cameraVector.y -= playerSpeed
                playerVector.y += playerSpeed
                mapVector.y -= playerSpeed
            }
        }
        if(playerDirection[0] !== 0 || playerDirection[1] !== 0)
        {
            playerIsMooving = true; 
        }
    }else{
        playerIsMooving = false;
    }
}



const playerInputInteraction = () => {
    if(playerCanInteract === true && playerCanMove === true){
        let playerCaseInteract = [actualPlayerTile()[0] + playerLastDirection[0], actualPlayerTile()[1] + playerLastDirection[1]]
        checkForInteraction(playerCaseInteract)
        
    }
}



const playerKeyPressedForEngineOne = () => {
    playerInputInteractForEngineOne()
}