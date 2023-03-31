

const ressourceToLoad = [
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
    {
        typeOfRessource : "npc",
        path : "./json/engineOne/npc.json"
    },
    {
        typeOfRessource : "quest",
        path : "./json/engineOne/quests.json"
    }
]

let spritesData = [];
let itemsData = [];
let mapData = [];
let spritesFightData = [];
let uiData = [];
let planetsData = [];
let npcData = [];
let questData = [];
let mapFightData = [];
let pixelFont;

// variables that follow the resource loading course

let loadingCounterSpritesData = 0;
let loadingCounterItemsData = 0;
let loadingCounterSpritesFightData = 0;
let loadingCounterUIData = 0;
let loadingCounterPlanetsData = 0;
let loadingCounterNPCData = 0;
let loadingCounterQuestData = 0;
let loadingMapFightData = 0;

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
            // ! NEED AN UPDATE HERE ! //
            mapData = ressource;
            console.log(mapData);
            for(let i = 0; i < mapData.length; i++){
                loadJsonForMap(mapData[i])
            }
            break;
            // ! NEED AN UPDATE HERE ! //

        case "spriteFight" :
            spritesFightData = ressource;
            for(let i = 0; i < spritesFightData.length; i++)
            {
                spritesFightData[i].image = loadImage(
                    spritesFightData[i].path, 
                    () => successfullLoadingRessource(typeOfRessource),
                    () => failureLoadingRessource(spritesFightData[i], typeOfRessource)
                );
            };
            setTimeout(() => {
                successfullLoadingRessource("map")    
            }, 1500);

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

        case "npc" :
            npcData = ressource;
            successfullLoadingRessource(typeOfRessource)
            break;

        case "quest" :
            questData = ressource;
            successfullLoadingRessource(typeOfRessource)
            break;

        case "mapFight" :
            mapFightData = ressource;
            console.log(mapFightData)
            for(let i = 0; i < mapFightData.length; i++)
            {
                mapFightData[i].image = loadImage(
                    mapFightData[i].path, 
                    () => successfullLoadingRessource(typeOfRessource),
                    () => failureLoadingRessource(mapFightData[i], typeOfRessource)
                );
            }
            break;

        default :
            throw new Error("this is not an accepted type of ressource : " + typeOfRessource);
        
    }
}

const loadJsonForMap = (map) => {
    console.log(map.tileRessource)
    fetch(map.tileRessource)
        .then(res => res.json())
        .then(res => res.data)
        .then(res => { 
            map.tileRessource = res;
            loadTileFromJson(map); 
        }) // ! LOAD THE JSON
        .catch(err => console.log(err))
}

const loadTileFromJson = (map) => {
    console.log(map.tileRessource)
    for(let j = 0; j < map.tileRessource.length; j++)
    {
        map.tileRessource[j].image = loadImage(
            map.tileRessource[j].path, 
            () => { console.log("successfully loaded tile") },
            () => failureLoadingRessource(map.tileRessource[j], "map Tiles")
        );
    }
}

const failureLoadingRessource = (ressource, typeOfRessource) => {
    // error handling
    throw new Error("failed to load a " + typeOfRessource + " from the " + ressource.id + " (path : " + ressource.path + ") case, check the following json to fix that or check if the image exists");
}

const successfullLoadingRessource = (typeOfRessource) => {

    switch(typeOfRessource){
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
        case "npc" :
            totalLoadCounter ++;
            break;
        case "quest" :
            totalLoadCounter ++;
            break;
        case "ui" :
            loadingCounterUIData ++;
            if(loadingCounterUIData === uiData.length){
                totalLoadCounter ++;
            }
            break;
        case "mapFight" :
            loadingMapFightData++;
            if(loadingMapFightData === mapFightData.length)
            {
                totalLoadCounter ++;
            }
            break;
        default :
            throw new Error("this cannot load that type of ressource : " + typeOfRessource);
    }

    checkAllRessource()
    
}

const checkAllRessource = () => {
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
    actualPlayerMap = playerOnMap.map;

    playerVector = getCoordWithTileCoord(playerOnMap.start[0], playerOnMap.start[1]);
    cameraVector = createVector(windowWidth/2, windowHeight/2);
    mapVector = createVector(0,0);
    vector2ExploringMenu = createVector(-500, 0); // For the transition in menu exploring mode
    vectorCameraEngineTwo = createVector(0, 0);
}
