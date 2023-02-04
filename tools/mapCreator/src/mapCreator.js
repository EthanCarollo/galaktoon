let mapLayer = [
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0]
]

let xMapPos = 0;
let yMapPos = 0;

let tileSize = 50;


const displayMap = () => {
    for(let x = 0; x < mapLayer.length; x++)
    {
        for(let y = 0; y < mapLayer.length; y++){
            displayTiles(x, y, 45, mapLayer[x][y])
        }
    }
}

const displayLayer = () => {

}

const displayTiles = (x, y, size, id) => {
    image(tilesData[id].image, x*size + xMapPos, y*size + yMapPos, size, size)
    
}