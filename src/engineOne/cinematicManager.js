/**
 * * Cinematic have a simple lifecycle : 
 * * 1 : setCinematic(array[int]) that will set the location in vector2 where the camera will go
 * * 2 : playCameraCinematic(Vector2 = vectorDestinationCinemation) that will lerp the current camera to the destination
 * * 3 : endCinematic() that reset the camera position to the player and make the playerCanMove var to true
 */

/**
 * @param {array[int]} cinematicDestinationFromPlayer array contains [x, y]
 */
const setCinematic = (cinematicDestinationFromPlayer) => {
    /** 
     * * The cinematicDestinationFromPlayer is where the camera go from the player position, if the cinematicDestinationFromPlayer contains more than 2 cases,
     * * it will returns an error,  the function set the playerMove to false too
     */
    if(cinematicDestinationFromPlayer.length > 2)
    {
        throw new Error("cinematicDestinationFromPlayer is too long to be a real cinematic destination : " + cinematicDestinationFromPlayer)
    }

    engineOneState = EngineOneStateEnum.Cinematic
    playerCanMove = false;
    vectorDestinationCinemation = [Math.floor(window.innerWidth/2), Math.floor(window.innerHeight/2)]
    vectorDestinationCinemation[0] += cinematicDestinationFromPlayer[0];
    vectorDestinationCinemation[1] += cinematicDestinationFromPlayer[1];

    ySizeBorderCinematic = window.innerHeight/9;
    positionBorderCinematic = [-ySizeBorderCinematic, window.innerHeight]
}



const endCinematic = () => {
    // * Reset the player var to normal
    playerCanMove = true;
    engineOneState = EngineOneStateEnum.Playing;
}



/**
 * @param {Vector2} vectorDestination the destination of the camera (the Vector2 is a p5 type)
 */
const playCameraCinematic = (vectorDestination = vectorDestinationCinemation) => { // Animate from the player direction
    /**
     * * Do a vector.lerp with the cameraSmoothStep var used for the lerp on every movement of the player
     * * End the cinematic when the camera is approximatively on the vectorDestination
     */
    background(20)
    let vectorMoove;
    vectorMoove = p5.Vector.lerp(createVector(vectorDestination[0], vectorDestination[1]), cameraVector, 0.985); // interpolate the camera with the player by using vector.lerp by p5

    cameraVector = vectorMoove;

    if(Math.round(cameraVector.x) === vectorDestination[0] && Math.round(cameraVector.y) === vectorDestination[1] 
    || Math.round(cameraVector.x) === vectorDestination[0] && Math.round(cameraVector.y) === vectorDestination[1])
    {
        endCinematic();
    }
}



const showBorderCinematic = () => {
    /**
     * * Little algorithms that just increase or decrease the size of the border cinematic
     * * and then just show them on the screen
     */

    fill(0)
    //ShowTransitionBorder
    if(positionBorderCinematic[0] < 0)
    {
        positionBorderCinematic[0]+=2;
    }
    if(positionBorderCinematic[1] > window.innerHeight-ySizeBorderCinematic+2)
    {
        positionBorderCinematic[1]-=2;
    }
    //ShowTransitionBorder
    rect(0, positionBorderCinematic[0], window.innerWidth, ySizeBorderCinematic);

    rect(0, positionBorderCinematic[1], window.innerWidth, ySizeBorderCinematic);
}



/**
 * @param {array[int][int]} map 2D array of the map
 */
const checkMapForCinematic = (map) => {
    /**
     * * Check on every map if a cinematic exist, if it doesn't this doesn't send any error cause i didn't set on every map
     */
    switch(map.cinematic)
    {
        case "darkWoaf" : 
            setCinematic([0, 1650]);
            break;
    }
}