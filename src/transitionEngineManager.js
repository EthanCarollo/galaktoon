// Engine One

const launchEngineOne = () => {
    actualEngine = EngineOne;
}

// Engine Two

// ! debugEnemiesArray is just a temp variable only used in the prototype /!\

let debugEnemiesArray = [
    {
        id : 1,
        name : "testEnemy",
        hp : {
            current : 40,
            max : 50
        },
        isAlive : true,
        state : "idle",
        abilities : [
            {
                name : "Attack",
                type : "attack",
                amount : 5,
                id : 1,
                couldown : 1
            }
        ]
    }
]
// ! debugEnemiesArray is just a temp variable only used in the prototype /!\

const launchFightOnEngineTwo = (enemiesArray = debugEnemiesArray) => { // this take in parameters debug enemies for the prototype
    settingUpEngineTwoScene(enemiesArray);
    launchEngineTwo();
}

const settingUpEngineTwoScene = (enemiesArray) => {
    // reset variable
    currentTurn = 0;
    fightLog = ["Fight Started !"];
    turnTeam = "player";
    fightIsEnd = false;
    actualTurnGame = 0;
    // reset variable
    enemyTeam = JSON.parse(JSON.stringify(enemiesArray)); // Duplicating a 2D array doesn't work with objects in it, but if i use JSON stringify and then JSON parse, it works ! Fancy.
}

const launchEngineTwo = () => {
    actualEngine = EngineTwo;
}