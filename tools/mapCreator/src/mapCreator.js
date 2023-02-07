let mapLayers = {
    ground : [
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    object : 
    [
        [-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1]
    ]
}


let selectedLayer = "ground"

let xMapPos = 0;
let yMapPos = 0;

let tileSelected = 0;

let sizeMap = 20;

let tileSize = 50;

const resizeArrayMap = () => {
    mapLayers.ground.length = sizeMap
    mapLayers.object.length = sizeMap
    for(let i = 0; i<mapLayers.ground.length;i++){
        mapLayers.ground[i] = new Array(sizeMap)
        mapLayers.object[i] = new Array(sizeMap)
        for(let j = 0; j<mapLayers.ground[i].length;j++){
            mapLayers.ground[i][j] = 0;
            mapLayers.object[i][j] = -1;
        }
    }
}

const displayMap = () => {
    background(225)
    displayLayer(mapLayers.ground)
    displayLayer(mapLayers.object)
}

const createLayersDisplay = () => {
    // DISGRACEFUL SRY RUSHING TIME
    let layerList = document.getElementById("innerLayerList")
    layerList.innerHTML = " "
    let layerGround = layerList.appendChild(document.createElement("div"))
    layerGround.innerHTML = "<h1>GROUND LAYER</h1>"
    layerGround.classList.add("layer")
    layerGround.addEventListener("mouseup", () => selectedLayer = "ground")
    let layerObject = layerList.appendChild(document.createElement("div"))
    layerObject.innerHTML = "<h1>OBJECT LAYER</h1>"
    layerObject.classList.add("layer")
    layerObject.addEventListener("mouseup", () => selectedLayer = "object")
}

const displayLayer = (mapLayer) => {
    for(let x = 0; x < mapLayer.length; x++)
    {
        for(let y = 0; y < mapLayer.length; y++){
            displayTiles(x, y, tileSize, mapLayer[x][y])
        }
    }
}

const displayTiles = (x, y, size, id) => {
    if(id < 0){
        return;
    }
    image(tilesData[id].image, x*size + xMapPos, (y + (1 - tilesData[id].yWidth)) *size + yMapPos, size, size * tilesData[id].yWidth)  
}

const getTileWithScreenPosition = (x, y) => {
    if(Math.floor(x / tileSize)>=mapLayers.ground[0].length || Math.floor(x / tileSize) < 0)
    {
        return false
    }
    if(Math.floor(y / tileSize)>= mapLayers.ground.length || Math.floor(y / tileSize) < 0)
    {
        return false;
    }
    return [Math.floor(x / tileSize), Math.floor(y / tileSize)];
}