let mapLayers = {
    groundLayer : [
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    objectLayer : 
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


let selectedLayer = "groundLayer"

let xMapPos = 0;
let yMapPos = 0;

let tileSelected = 0;

let sizeMap = 20;
let tileSize = 50;

const resizeArrayMap = (size = sizeMap) => {
    mapLayers.groundLayer.length = size
    mapLayers.objectLayer.length = size
    for(let i = 0; i<mapLayers.groundLayer.length;i++){
        mapLayers.groundLayer[i] = []
        mapLayers.objectLayer[i] = []
        mapLayers.groundLayer[i].length = size
        mapLayers.objectLayer[i].length = size
        for(let j = 0; j<mapLayers.groundLayer[i].length;j++){
            mapLayers.groundLayer[i][j] = 0;
            mapLayers.objectLayer[i][j] = -1;
        }
    }
}

const displayMap = () => {
    background(225)
    displayLayer(mapLayers.groundLayer)
    displayLayer(mapLayers.objectLayer)
}

const createLayersDisplay = () => {
    // DISGRACEFUL SRY RUSHING TIME
    let layerList = document.getElementById("innerLayerList")
    layerList.innerHTML = " "
    let layergroundLayer = layerList.appendChild(document.createElement("div"))
    layergroundLayer.innerHTML = "<h1>GROUND LAYER</h1>"
    layergroundLayer.classList.add("layer")
    layergroundLayer.classList.add("active");
    layergroundLayer.addEventListener("mouseup", () => {
        layergroundLayer.classList.add("active");
        layerobjectLayer.classList.remove("active");
        selectedLayer = "groundLayer"
    })
    let layerobjectLayer = layerList.appendChild(document.createElement("div"))
    layerobjectLayer.innerHTML = "<h1>COLLIDER & INTERACTION LAYER</h1>"
    layerobjectLayer.classList.add("layer")
    layerobjectLayer.addEventListener("mouseup", () => {
        layergroundLayer.classList.remove("active");
        layerobjectLayer.classList.add("active");
        selectedLayer = "objectLayer"
    })
}

const displayLayer = (mapLayer) => {
    for(let y = 0; y < mapLayer.length; y++)
    {
        for(let x = 0; x < mapLayer.length; x++){
            displayTiles(x, y, tileSize, mapLayer[y][x])
        }
    }
}

const displayTiles = (x, y, size, id) => {
    if(id < 0){
        return;
    }
    image(tilesData[id].image, x*size + xMapPos, (y + (1 - tilesData[id].yWidth)) *size + yMapPos, size * tilesData[id].xWidth, size * tilesData[id].yWidth)  
}

const getTileWithScreenPosition = (x, y) => {
    if(Math.floor(x / tileSize)>=mapLayers.groundLayer[0].length || Math.floor(x / tileSize) < 0)
    {
        return false
    }
    if(Math.floor(y / tileSize)>= mapLayers.groundLayer.length || Math.floor(y / tileSize) < 0)
    {
        return false;
    }
    return [Math.floor(x / tileSize), Math.floor(y / tileSize)];
}


document.getElementById("mapSize").addEventListener("input", () => {
    sizeMap = document.getElementById("mapSize").value
    console.log(sizeMap)
    resizeArrayMap(document.getElementById("mapSize").value)
})
document.getElementById("mapZoom").addEventListener("input", () => {
    tileSize = document.getElementById("mapZoom").value
})

const exportMapInJSON = () => {
    let jsonData = JSON.stringify(mapLayers)
    var a = document.createElement("a");
    var file = new Blob([jsonData], {type: "text/plain"});
    a.href = URL.createObjectURL(file);
    a.download = "mapLayers.json";
    a.click();

}