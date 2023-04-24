/**
 * @param {object} mapToLoad map object to load
 * @param {array[int]} start [x, y] array
 */
const loadNewMap = (mapToLoad, start) => {
    /**
     * * Load a new map and set every variables, normally, we never enter in the err 'id is inferior to 0'
     * * but i just set that in case it happens
     */

    if(mapToLoad.id >= 0)
    {
        playerOnMap = mapToLoad;
        actualPlayerMap = mapToLoad.map;
        playerVector = getCoordWithTileCoord(start[0], start[1]);
        cameraVector = createVector(windowWidth/2, windowHeight/2);
        mapVector = createVector(0,0);
        checkMapForCinematic(mapToLoad)

        if(mapToLoad.storyBoard !== undefined && mapToLoad.storyBoard !== undefined && mapToLoad.storyBoard.played === false)
        {
            launchStoryBoard(mapToLoad.storyBoard.id);
            mapToLoad.storyBoard.played = true;
        }
    }else{
        throw new Error("mapToLoad doesn't exist because the id of the map is inferior to 0")
    }
}


/**
 * @param {int} x xPosition in the world
 * @param {int} y yPosition in the world
 * @returns {array[int]} position in the tile coord
 */
const getTileCoordWithCoord = (x, y) => [x / tileSize, y / tileSize] 

/**
 * @param {int} x xPosition in the grid
 * @param {int} y yPosition in the grid
 * @returns {Vector2} position in the world
 */
const getCoordWithTileCoord = (x, y) => createVector(x*tileSize, y*tileSize)



