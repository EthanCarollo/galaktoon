let tilesData = [];
let countTile = 0;
let imageIsLoaded = false;

const loadAssets = () => {
    fetch("../../../json/engineOne/tiles.json")
        .then(rep => rep.json())
        .then(rep => { 
                tilesData = rep.data;  
                loadImageAssets();                
        })
        .catch(error => { 
            throw new Error("there is an issue with the ressource path");
        })
}

const loadImageAssets = () => {

    for(let i = 0; i < tilesData.length; i++)
    {
        tilesData[i].image = loadImage("../../../" + tilesData[i].path, succeedLoadImage);
    }
    createDOM()
}

const succeedLoadImage = () => {
    countTile ++;
    if(countTile === tilesData.length){
        imageIsLoaded = true;
    }
}

const createDOM = () => {
    for(let j = 0; j<tilesData.length;j++)
    {
        let image = document.getElementById("innerTilesList").appendChild(document.createElement("image"))
        image.classList.add("tile")
        image.style.backgroundImage = "url(../../" + tilesData[j].path + ")";
        image.addEventListener("mouseup", () => {
            callbackTiles(j);
        })
    }

}

const callbackTiles = (id) => {
    tileSelected = id;
}