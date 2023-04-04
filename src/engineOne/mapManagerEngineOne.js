/**
 * @param {object} mapToLoad map object to load
 * @param {array} start [x, y] array
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
    }else{
        throw new Error("mapToLoad doesn't exist because the id of the map is inferior to 0")
    }
}

/**
 * @param {*} x xPosition in the world
 * @param {*} y yPosition in the world
 * @returns {Array} position in the tile coord
 */
const getTileCoordWithCoord = (x, y) => [x / tileSize, y / tileSize] 

/**
 * @param {*} x xPosition in the grid
 * @param {*} y yPosition in the grid
 * @returns {Vector2} position in the world
 */
const getCoordWithTileCoord = (x, y) => createVector(x*tileSize, y*tileSize)