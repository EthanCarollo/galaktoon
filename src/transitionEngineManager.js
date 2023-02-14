// Engine One

const returnEngineOneAfterFight = () => {
    settingUpEngineOneScene();
    launchEngineOne();
}

const settingUpEngineOneScene = () => {
    // If there is some things to set up before launching the engine, this will be here
}

const launchEngineOne = () => {
    actualEngine = EngineOne;
}

// Engine Two

// ! debugEnemiesArray is just a temp variable only used in the prototype /!\

let debugEnemiesArray = [
    {
        id : 1,
        name : "testEnemy",
        level : 12,
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
                abilityLevel : 2,
                baseAmount : 20,
                amount : () => this.baseAmount * this.abilityLevel,
                id : 1,
                couldown : 1
            }
        ]
    },
    {
        id : 1,
        name : "testEnemy",
        level : 2,
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
                abilityLevel : 2,
                baseAmount : 20,
                amount : () => this.baseAmount * this.abilityLevel,
                id : 1,
                couldown : 1
            }
        ]
    }
]

// ! debugEnemiesArray is just a temp variable only used in the prototype /!\

const launchFightOnEngineTwo = (enemiesArray = debugEnemiesArray) => { // this take in parameters debug enemies for the prototype
    if(playerCanFight()){
        settingUpEngineTwoScene(enemiesArray);
        launchEngineTwo();
    }else{
        console.log("player cant fight")
    }
}

const settingUpEngineTwoScene = (enemiesArray) => {
    // reset variable
    currentTurn = 0;
    whoWin = "nobody";
    fightLog = ["Fight Started !"];
    turnTeam = "player";
    playerTeam[0].state = "idle";
    fightIsEnd = false;
    actualTurnGame = 0;
    // reset variable
    enemyTeam = JSON.parse(JSON.stringify(enemiesArray)); 
    // Duplicating a 2D array doesn't work with objects in it, but if i use JSON stringify and then JSON parse, it works ! Fancy.
    for(let i = 0; i < enemiesArray.length; i++)
    {
        enemyTeam[i].abilities = enemiesArray[i].abilities
    }
}

const launchEngineTwo = () => {
    actualEngine = EngineTwo;
}