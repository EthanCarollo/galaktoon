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

let tileSize = 50;


const displayMap = () => {
    background(225)
    displayLayer(mapLayers.ground)
    displayLayer(mapLayers.object)
}

const createLayersDisplay = () => {
    let layerList = document.getElementById("innerLayerList")
    layerList.innerHTML = " "
    let layerGround = layerList.appendChild(document.createElement("div"))
    layerGround.classList.add("layer")
    layerGround.addEventListener("mouseup", () => selectedLayer = "ground")
    let layerObject = layerList.appendChild(document.createElement("div"))
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

const getTileWithScreenPosition = (x, y) => [Math.floor(x / tileSize), Math.floor(y / tileSize)]