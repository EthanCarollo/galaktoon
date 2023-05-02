


/**
 * @param {int} indexOfAssetsToLoad it is the index of which asset i need to load
 */
const loadAssets = (indexOfAssetsToLoad = totalLoadCounter) => {
    /**
     * * The launch function for the loading assets, this functions is periodically recalled
     * * when we finished to load a json en we need to go to the second, in that case, i can know 
     * * where i am in the loading of all of my assets
     */


    fetch(ressourceToLoad[indexOfAssetsToLoad].path)
        .then(rep => rep.json())
        .then(rep => { 
                loadRessource(
                    rep.data,
                    ressourceToLoad[indexOfAssetsToLoad].typeOfRessource
                )
                        
        })
        .catch(error => { 
            // error handling
            throw new Error("there is an issue with a ressource : " + error + " // On the id of asset : " + indexOfAssetsToLoad);

        })
  }


/**
 * @param {array} ressource the ressource data
 * @param {string} typeOfRessource the type of ressource
 */
const loadRessource = (ressource, typeOfRessource) => {
    /**
     * * This function do a big switch case on every types of ressource renseigned in ressourceToLoad array,
     * * if we wan't to add a ressource that doesn't fit with the switch case, we will have an error.
     */

    switch(typeOfRessource){
        case "sprite" :
            spritesData = ressource;
            loadImageFromData(spritesData, typeOfRessource);
            break;
        
        case "item" :
            itemsData = ressource;
            loadImageFromData(itemsData, typeOfRessource);
            break;

        case "map" :
            mapData = ressource;
            for(let i = 0; i < mapData.length; i++){
                loadJsonForMap(mapData[i])
            }
            break;
            // TODO : Update the map loading ressource logics
        case "ui" :
            uiData = ressource;
            loadImageFromData(uiData, typeOfRessource);
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

        case "tactical" :
            tacticalMapData = ressource;
            successfullLoadingRessource(typeOfRessource)
            break;

        default :
            throw new Error("this is not an accepted type of ressource : " + typeOfRessource);
        
    }
}

/**
 * @param {array} data contains every image to load
 * @param {string} typeOfRessource type of ressource to take in the successfull loading ressource
 */
const loadImageFromData = (data, typeOfRessource) => {
    /**
     * * Load the image from the data and send the type of ressource in case of success or in case of failure, it just throw an error
     */
    for(let i = 0; i < data.length; i++)
        {
            data[i].image = loadImage(
                data[i].path, 
                () => successfullLoadingRessource(typeOfRessource),
                () => failureLoadingRessource(data[i], typeOfRessource)
            );
    }
}

/**
 * @param {array} map this function just work with the precise case that we have a tile ressource attached to the array that we want to load
 * separately than the actual informations contained in the array
 */
const loadJsonForMap = (map) => {
    /**
     * * This is a special case, the map also contains a data who contains his personnalized tiles ressources and path but in most of case i use
     * * the loadImageFromData function or for the text i just do a 'var = ressource;', 
     * * then i just use the more global function loadImageFromData 
     */

    fetch(map.tileRessource)
        .then(res => res.json())
        .then(res => res.data)
        .then(res => { 
            map.tileRessource = res;
            loadImageFromData(map.tileRessource, "map"); 
        })
        .catch(err => console.log(err))
}

/**
 * @param {array} ressource information good for the error handling
 * @param {string} typeOfRessource information good too for the error handling
 */
const failureLoadingRessource = (ressource, typeOfRessource) => {
    /** 
     * * Throw the error in case that the load failed :(
     */
    throw new Error("failed to load a " + typeOfRessource + " from the " + ressource.id + " (path : " + ressource.path + ") case, check the following json to fix that or check if the image exists");
}

/**
 * @param {string} typeOfRessource the type of ressource loaded
 */
const successfullLoadingRessource = (typeOfRessource) => {
    /**
     * * This function do a big switch case on every types of ressource renseigned in ressourceToLoad array,
     * * if we wan't to add a ressource that doesn't fit with the switch case, we will have an error. In this case
     * * this function is called when we success a loading ressource. And after every successfullLoad, the function
     * * check if all ressource has been loaded, in that case we know when we can start the game, on every
     * * total load counter ++, i load the next assets of the assets array
     */

    switch(typeOfRessource){
        case "sprite" :
            loadingCounterSpritesData ++;
            if(loadingCounterSpritesData === spritesData.length){
                totalLoadCounter ++;
                loadAssets();
            }
            break;
        case "item" :
            loadingCounterItemsData ++;
            if(loadingCounterItemsData === itemsData.length){
                totalLoadCounter ++;
                loadAssets();
            }
            break;
        case "map" :
            loadingCounterMapData ++;
            if(loadingCounterMapData === mapData[0].tileRessource.length){ // If we spawn on the map 0 then we just need to load the map 0 and the rest will load
                totalLoadCounter ++;
                loadAssets();
            }
            // TODO : This method is still unstable (like if a player change the map that he didn't already load)
            break;
        case "spriteFight" :
            loadingCounterSpritesFightData ++;
            if(loadingCounterSpritesFightData === spritesFightData.length){
                totalLoadCounter ++;
                loadAssets();
            }
            break;
        case "planets" :
            totalLoadCounter ++;
            loadAssets();
            break;
        case "npc" :
            totalLoadCounter ++;
            loadAssets();
            break;
        case "quest" :
            totalLoadCounter ++;
            loadAssets();
            break;
        case "ui" :
            loadingCounterUIData ++;
            if(loadingCounterUIData === uiData.length){
                totalLoadCounter ++;
                loadAssets();
            }
            break;
        case 'tactical' :
            totalLoadCounter ++;
            break;
        default :
            throw new Error("this cannot load that type of ressource : " + typeOfRessource);
    }

    checkAllRessource()
    
}

const checkAllRessource = () => {
    /**
     * * Function just check if we have or not loaded all ressource OR if we have loaded too much ressource and then if all ressource is loaded, load the
     * * the function
     */

    if(totalLoadCounter === totalLoad && ressourceIsLoaded != true)
    {
        loadAllRessource()
    }
    
    if(totalLoadCounter > totalLoad)
    {
        throw new Error("code loaded too much data, there is a problem in the 'successfullLoadingRessource' function");
    }
}

const loadAllRessource = () => {
    setLanguageOnStart();
    setEngineVariableAfterLoadingAllAssets();
    ressourceIsLoaded = true;

    setTimeout(() => {
        startMenuState =  StartMenuStateEnum.Normal;
    }, 200); // set the menu normally if we have load all assets
}

const setEngineVariableAfterLoadingAllAssets = () => {
    if(mapData.length < 1)
    {
        throw new Error("mapData isn't set for map creation");
    }


    playerOnMap = mapData[0];
    actualPlayerMap = playerOnMap.map;

    playerVector = getCoordWithTileCoord(playerOnMap.start[0], playerOnMap.start[1]);
    cameraVector = createVector(windowWidth/2, windowHeight/2);
    mapVector = createVector(0,0);
    vector2ExploringMenu = createVector(-500, 0); // For the transition in menu exploring
    vectorCameraEngineTwo = createVector(0, 0);
}
