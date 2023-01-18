const loadNewMap = (mapToLoad, start) => {
    if(mapToLoad.id >= 0)
    {
        playerOnMap = mapToLoad;
        actualPlayerMap = mapToLoad.map.slice();
        playerVector = createVector(start[0], start[1]);
        cameraVector = createVector(windowWidth/2, windowHeight/2);
        mapVector = createVector(0,0);
    }
}