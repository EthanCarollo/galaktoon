const playerInputInteractForEngineOne = () => {
    if(playerCanInteract === true){
  
        let playerCaseInteract = tileNextToThePlayer()
    
        if(keyIsDown(69)) {
          interactWithATile(playerCaseInteract);
        }
    }
}

const tileNextToThePlayer = () => {
    return [actualPlayerTile()[0] + playerLastDirection[0], actualPlayerTile()[1] + playerLastDirection[1]]
}

const playerInputForEngineOne=()=>{
    if(playerCanMove === true){

        playerDirection = []; // reset player direction every frame

        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // When players touch right arrow or D
            cameraVector.x += playerSpeed
            playerVector.x -= playerSpeed
            mapVector.x += playerSpeed
            playerDirection.push("right");
            playerIsMooving = true;
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
            playerDirection.push("left");
            playerIsMooving = true;
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
            playerDirection.push("up");
            playerIsMooving = true;
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
            playerDirection.push("down");  
            playerIsMooving = true; 
            if(getPlayerCollision(createVector(0, 0))){
                cameraVector.y -= playerSpeed
                playerVector.y += playerSpeed
                mapVector.y -= playerSpeed
            }
        }


        if(keyIsDown(DOWN_ARROW) || keyIsDown(UP_ARROW) || keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || keyIsDown(83) || keyIsDown(90) || keyIsDown(81) || keyIsDown(68))
        {
            // potential code here
        }else{
            playerIsMooving = false;
        }
    }else{
        playerIsMooving = false;
    }

    if(playerCanInteract === true){

        let playerCaseInteract = [actualPlayerTile()[0] + playerLastDirection[0], actualPlayerTile()[1] + playerLastDirection[1]]

        /*if(keyIsUp(69)) {
          interactWithATile(playerCaseInteract);
        }*/
        if(getTileData(playerCaseInteract[0], playerCaseInteract[1]).type !== "useless")
        {
          let interactType = getTileData(playerCaseInteract[0], playerCaseInteract[1]).type;
          createInteractionPopup(playerCaseInteract[0], playerCaseInteract[1], interactType)
        }
    }
}

const playerKeyPressedForEngineOne = () => {
    playerInputInteractForEngineOne()
}