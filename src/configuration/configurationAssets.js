

const ressourceToLoad = [
    {
        typeOfRessource : "ui",
        path : "./json/ui.json"
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
    },
    {
        typeOfRessource : "tactical",
        path : "./json/engineTwo/tacticalMap.json"
    }
]

let spritesData = [];
let itemsData = [];
let mapData = [];
let uiData = [];
let planetsData = [];
let npcData = [];
let questData = [];
let tacticalMapData = [];
let pixelFont;

// variables that follow the resource loading course

let loadingCounterSpritesData = 0;
let loadingCounterItemsData = 0;
let loadingCounterMapData = 0;
let loadingCounterSpritesFightData = 0;
let loadingCounterUIData = 0;
let loadingCounterPlanetsData = 0;
let loadingCounterNPCData = 0;
let loadingCounterQuestData = 0;
let loadingTacticalMapData = 0;

let totalLoadCounter = 0;
let totalLoad = ressourceToLoad.length;

// variables that follow the resource loading course

let ressourceIsLoaded = false; // boolean who tell if ALL the ressources has been loaded or no, while this bool is false, the game won't launch
