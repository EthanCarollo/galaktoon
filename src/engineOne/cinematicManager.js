const playCinematic = (cinematicDestinationFromPlayer) => {
    engineOneState = "Cinematic"
    playerCanMove = false;
    vectorDestinationCinemation = [Math.floor(window.innerWidth/2), Math.floor(window.innerHeight/2)]
    vectorDestinationCinemation[0] += cinematicDestinationFromPlayer[0];
    vectorDestinationCinemation[1] += cinematicDestinationFromPlayer[1];

    ySize = window.innerHeight/9;
    positionBorderCinematic = [-ySize, window.innerHeight]
}

const endCinematic = () => {
    playerCanMove = true;
    engineOneState = "Playing";
}


let vectorDestinationCinemation = [Math.floor(window.innerWidth/2), Math.floor(window.innerHeight/2)] // We need to floors if we want this to works
const setCameraCinematic = (vectorDestination = vectorDestinationCinemation) => { // Animate from the player direction
    background(20)
    let vectorMoove;
    vectorMoove = p5.Vector.lerp(createVector(vectorDestination[0], vectorDestination[1]), cameraVector, cameraSmoothStep); // interpolate the camera with the player by using vector.lerp by p5

    cameraVector = vectorMoove;

    if(Math.round(cameraVector.x) === vectorDestination[0] && Math.round(cameraVector.y) === vectorDestination[1])
    {
        endCinematic();
    }
}


let ySize = window.innerHeight/9;
let positionBorderCinematic = [-ySize, window.innerHeight]
const showBorderCinematic = () => {
    fill(0)
    //ShowTransitionBorder
    if(positionBorderCinematic[0] < 0)
    {
        positionBorderCinematic[0]+=2;
    }
    if(positionBorderCinematic[1] > window.innerHeight-ySize+2)
    {
        positionBorderCinematic[1]-=2;
    }
    //ShowTransitionBorder
    rect(0, positionBorderCinematic[0], window.innerWidth, ySize);

    rect(0, positionBorderCinematic[1], window.innerWidth, ySize);
}

const checkMapForCinematic = (map) => {
    switch(map.cinematic)
    {
        case "darkWoaf" : 
            playCinematic([0, 2000]);
            break;
    }
}