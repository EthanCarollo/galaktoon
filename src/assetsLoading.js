

const ressourceToLoad = [
    {
        typeOfRessource : "tile",
        path : "./json/engineOne/tiles.json"
    },
    {
        typeOfRessource : "sprite",
        path : "./json/engineOne/sprites.json"
    },
    {
        typeOfRessource : "item",
        path : "./json/engineOne/items.json"
    },
    {
        typeOfRessource : "map",
        path : "./json/engineOne/topDownMap.json"
    },
    {
        typeOfRessource : "spriteFight",
        path : "./json/engineTwo/spritesFight.json"
    },
    {
        typeOfRessource : "ui",
        path : "./json/ui.json"
    },
    {
        typeOfRessource : "planets",
        path : "./json/engineOne/planetExplorable.json"
    },
]

let tilesData = [];
let spritesData = [];
let itemsData = [];
let mapData = [];
let spritesFightData = [];
let uiData = [];
let planetsData = [];
let pixelFont;

// variables that follow the resource loading course

let loadingCounterTilesData = 0;
let loadingCounterSpritesData = 0;
let loadingCounterItemsData = 0;
let loadingCounterSpritesFightData = 0;
let loadingCounterUIData = 0;
let loadingCounterPlanetsData = 0;
let totalLoadCounter = 0;
let totalLoad = ressourceToLoad.length;

// variables that follow the resource loading course

let ressourceIsLoaded = false; // boolean who tell if ALL the ressources has been loaded or no, while this bool is false, the game won't launch

const loadAssets = () => {
    pixelFont = loadFont('../assets/fonts/PublicPixel.ttf');
    for(let i = 0 ; i < ressourceToLoad.length ; i++)
    {
        fetch(ressourceToLoad[i].path)
        .then(rep => rep.json())
        .then(rep => { 
                loadRessource(
                    rep.data,
                    ressourceToLoad[i].typeOfRessource
                )
                    
        })
        .catch(error => { 
            // error handling
            throw new Error("there is an issue with the ressource path");

        })
    } 
    
  }

const loadRessource = (ressource, typeOfRessource) => {
    switch(typeOfRessource){
        case "tile" :
            tilesData = ressource;
            for(let i = 0; i < tilesData.length; i++)
            {
                tilesData[i].image = loadImage(
                    tilesData[i].path, 
                    () => successfullLoadingRessource(typeOfRessource),
                    () => failureLoadingRessource(tilesData[i], typeOfRessource)
                );
            }
            break;
        
        case "sprite" :
            spritesData = ressource;
            for(let i = 0; i < spritesData.length; i++)
            {
                spritesData[i].image = loadImage(
                    spritesData[i].path, 
                    () => successfullLoadingRessource(typeOfRessource),
                    () => failureLoadingRessource(spritesData[i], typeOfRessource)
                );
            }
            break;
        
        case "item" :
            itemsData = ressource;
            for(let i = 0; i < itemsData.length; i++)
            {
                itemsData[i].image = loadImage(
                    itemsData[i].path, 
                    () => successfullLoadingRessource(typeOfRessource),
                    () => failureLoadingRessource(itemsData[i], typeOfRessource)
                );
            }
            break;

        case "map" :
            mapData = ressource;
            successfullLoadingRessource(typeOfRessource)
            break;

        case "spriteFight" :
            spritesFightData = ressource;
            for(let i = 0; i < spritesFightData.length; i++)
            {
                spritesFightData[i].image = loadImage(
                    spritesFightData[i].path, 
                    () => successfullLoadingRessource(typeOfRessource),
                    () => failureLoadingRessource(spritesFightData[i], typeOfRessource)
                );
            }
            break;

        case "ui" :
            uiData = ressource;
            for(let i = 0; i < uiData.length; i++)
            {
                uiData[i].image = loadImage(
                    uiData[i].path, 
                    () => successfullLoadingRessource(typeOfRessource),
                    () => failureLoadingRessource(uiData[i], typeOfRessource)
                );
            }
            break;

        case "planets" :
            planetsData = ressource;
            successfullLoadingRessource(typeOfRessource)
            break;

        default :
            throw new Error("this is not an accepted type of ressource : " + typeOfRessource);
        
    }
}

const failureLoadingRessource = (ressource, typeOfRessource) => {
    // error handling
    throw new Error("failed to load a " + typeOfRessource + " from the " + ressource.id + " case, check the following json to fix that or check if the image exists");
}

const successfullLoadingRessource = (typeOfRessource) => {

    switch(typeOfRessource){
        case "tile" :
            loadingCounterTilesData ++;
            if(loadingCounterTilesData === tilesData.length){
                totalLoadCounter ++;
            }
            break;
        case "sprite" :
            loadingCounterSpritesData ++;
            if(loadingCounterSpritesData === spritesData.length){
                totalLoadCounter ++;
            }
            break;
        case "item" :
            loadingCounterItemsData ++;
            if(loadingCounterItemsData === itemsData.length){
                totalLoadCounter ++;
            }
            break;
        case "map" :
            totalLoadCounter ++;
            break;
        case "spriteFight" :
            loadingCounterSpritesFightData ++;
            if(loadingCounterSpritesFightData === spritesFightData.length){
                totalLoadCounter ++;
            }
            break;
        case "ui" :
            loadingCounterUIData ++;
            if(loadingCounterUIData === uiData.length){
                totalLoadCounter ++;
            }
            break;
        case "planets" :
            totalLoadCounter ++;
            break;
        default :
            throw new Error("this cannot load that type of ressource : " + typeOfRessource);
    }

    if(totalLoadCounter === totalLoad)
    {
        loadAllRessource()
    }

    // error handling
    if(totalLoadCounter > totalLoad)
    {
        throw new Error("code loaded too much data, there is a problem in the 'successfullLoadingRessource' function");
    }
}

const loadAllRessource = () => {
    setEngineOneVariableAfterLoadingAllAssets();

    ressourceIsLoaded = true;
}

const setEngineOneVariableAfterLoadingAllAssets = () => {
    if(mapData.length < 1)
    {
        throw new Error("mapData isn't set for map creation");
    }

    playerOnMap = mapData[0];
    actualPlayerMap = playerOnMap.map.slice();

    playerVector = getCoordWithTileCoord(playerOnMap.start[0], playerOnMap.start[1]);
    cameraVector = createVector(windowWidth/2, windowHeight/2);
    mapVector = createVector(0,0);
}
