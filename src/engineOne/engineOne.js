
const runEngineOne = () => {
    updatePlayerLevel(playerTeam[0]); // temp call of the function
    setPlayerCamera();
    displayTopDown2D();
    displayUserInterfaceEngineOne();
}

// ************************ Display game && camera

const displayTopDown2D = () => {
    createMapTopDown("back"); // create the layer in back of the player
    showPlayerSprite(cameraVector.x, cameraVector.y, playerSpriteSize);
    createMapTopDown("front"); // create the layer in front of the player
    displayNPCOnMap();
    // the double createmap function is used to simulate a 2D perspective
}

const setPlayerCamera = () => {
    if(cameraVector !== playerVector){
        background(20)
        let vectorMoove;
        vectorMoove = p5.Vector.lerp(createVector(windowWidth/2, windowHeight/2), cameraVector, cameraSmoothStep); // interpolate the camera with the player by using vector.lerp by p5
        cameraVector = vectorMoove;
    }
}

// ************************ Display game && camera

// ************************ MAP LOGIC (create and verification on array)

const createMapTopDown = (orientation, map = actualPlayerMap) => {

    for(let y = 0;y < map.length; y++)
    {
      for(let x = 0;x < map[0].length; x++)
      {
        if(!tileIsEmpty(x, y)){
          switch(orientation){
            case "back" :
              if(actualPlayerTile()[1] >= y)
              {
                createImageWithIdOn2dArray(x, y, map[y][x], tileSize);
              }
              break;
            case "front":
              if(actualPlayerTile()[1] < y)
              {
                createImageWithIdOn2dArray(x, y, map[y][x], tileSize);
              }
              break;
            default :
              throw new Error("can't create Tile : the parameter' " + orientation + " ' doesn't fit with the function")
          }
        }
      }
    }

}

const createImageWithIdOn2dArray = (x, y, id, currentTileSize) => {

  // size of the current tile according to the data
  let xTileWidth = tilesData[id].xWidth;
  let yTileHeight = tilesData[id].yWidth;
  // position of the current tile in the array and the size
  let xPositionTiles = currentTileSize*x + cameraVector.x + playerVector.x -45;
  let yPositionTiles = (currentTileSize*(y+1-yTileHeight) + cameraVector.y + playerVector.y -45);
  let normalYPositionTiles = currentTileSize*y + cameraVector.y + playerVector.y -45; // normal position of a tiles (usefull when you need to instantiate a normal tile behind a special tile)
  
  /*
  if(tileIsConstructibleAndWeCanConstruct(id)){
    tint(100, 255, 100) // this is purely esthetic
  }
  if(tileIsDestructibleAndWeCanDestruct(id)){
    tint(255, 100, 100) // this is purely esthetic too
  }
  This code isn't usefull actually, i just preshot for a next features :3
  */

  if(tileIsAnObject(id))
  {
    image(tilesData[playerOnMap.baseTile].image, xPositionTiles , normalYPositionTiles, currentTileSize, currentTileSize);
    image(tilesData[id].image, xPositionTiles , yPositionTiles, currentTileSize * xTileWidth, currentTileSize * yTileHeight); 
  }else{
    image(tilesData[id].image, xPositionTiles , yPositionTiles, currentTileSize * xTileWidth, currentTileSize * yTileHeight); 
  }

  //noTint()
}

const tileIsEmpty = (x, y) => actualPlayerMap[y][x]<=-1 || actualPlayerMap[y][x] >= tilesData.length // In this case, a tile with a value <= to -1 is an empty case or if the value is >= to the length of the tilesData

const tileIsConstructibleAndWeCanConstruct = (id) => tilesData[id].canConstruct === "true" && constructionMode === true && destructionMode === false

const tileIsDestructibleAndWeCanDestruct = (id) => tilesData[id].destructible === "true" && constructionMode === true && destructionMode === true

const tileIsAnObject = (id) => tilesData[id].isAnObject === true

const getTileData = (x, y) => actualPlayerMap[y][x] < tilesData.length ? tilesData[actualPlayerMap[y][x]] : tilesData[-1];

// ************************ MAP LOGIC (create and verification on array)