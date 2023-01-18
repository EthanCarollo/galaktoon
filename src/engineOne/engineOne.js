
const runEngineOne = () => {
    setPlayerCamera();
    playerInputEngineOne();
    displayTopDown2D();
}

const playerInputEngineOne=()=>{
    if(playerCanMove === true){

        playerDirection = []; // reset player direction every frame

        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // When players touch right arrow or D
            cameraVector.x += playerSpeed
            playerVector.x -= playerSpeed
            mapVector.x += playerSpeed
            playerDirection.push("right");
            playerIsMooving = true;
            if(getPlayerCollision())
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
            if(getPlayerCollision())
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
            if(getPlayerCollision()){
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
            if(getPlayerCollision()){
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
    }

    if(playerCanInteract === true){
        if(keyIsDown(69)) {
          interactWithATile();
        }
    }
}

// ************************ Display game && camera

const displayTopDown2D = () => {
    createMap("back"); // create the layer in back of the player
    showPlayerSprite(cameraVector.x, cameraVector.y, playerSpriteSize)
    createMap("front"); // create the layer in front of the player
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

const createMap = (orientation) => {

    for(let y = 0;y < actualPlayerMap.length; y++)
    {
      for(let x = 0;x < actualPlayerMap[0].length; x++)
      {
        if(!tileIsEmpty(x, y)){
          switch(orientation){
            case "back" :
              if(actualPlayerTile()[1] >= y)
              {
                createTile(x, y, actualPlayerMap[y][x], tileSize);
              }
              break;
            case "front":
              if(actualPlayerTile()[1] < y)
              {
                createTile(x, y, actualPlayerMap[y][x], tileSize);
              }
              break;
            default :
              throw new Error("can't create Tile : the parameter' " + orientation + " ' doesn't fit with the function")
          }
        }
      }
    }

}

const createTile = (x, y, id,currentTileSize) => {

  // size of the current tile according to the data
  let xTileWidth = tilesData[id].xWidth;
  let yTileHeight = tilesData[id].yWidth;
  // position of the current tile in the array and the size
  let xPositionTiles = currentTileSize*x + cameraVector.x + playerVector.x -45;
  let yPositionTiles = (currentTileSize*(y+1-yTileHeight) + cameraVector.y + playerVector.y -45);
  let normalYPositionTiles = currentTileSize*y + cameraVector.y + playerVector.y -45; // normal position of a tiles (usefull when you need to instantiate a normal tile behind a special tile)

  if(tileIsConstructibleAndWeCanConstruct(id)){
    tint(100, 255, 100) // this is purely esthetic
  }
  if(tileIsDestructibleAndWeCanDestruct(id)){
    tint(255, 100, 100) // this is purely esthetic too
  }
  if(tileIsAnObject(id))
  {
    image(tilesData[0].image, xPositionTiles , normalYPositionTiles, currentTileSize, currentTileSize);
    image(tilesData[id].image, xPositionTiles , yPositionTiles, currentTileSize * xTileWidth, currentTileSize * yTileHeight); 
  }else{
    image(tilesData[id].image, xPositionTiles , yPositionTiles, currentTileSize * xTileWidth, currentTileSize * yTileHeight); 
  }
    noTint()
}

const tileIsEmpty = (x, y) => actualPlayerMap[y][x]<=-1 || actualPlayerMap[y][x] >= tilesData.length // In this case, a tile with a value <= to -1 is an empty case or if the value is >= to the length of the tilesData

const tileIsConstructibleAndWeCanConstruct = (id) => tilesData[id].canConstruct === "true" && constructionMode === true && destructionMode === false

const tileIsDestructibleAndWeCanDestruct = (id) => tilesData[id].destructible === "true" && constructionMode === true && destructionMode === true

const tileIsAnObject = (id) => tilesData[id].isAnObject === true

const getTileData = (x, y) => actualPlayerMap[y][x] < tilesData.length ? tilesData[actualPlayerMap[y][x]] : tilesData[-1];

// ************************ MAP LOGIC (create and verification on array)