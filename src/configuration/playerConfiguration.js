/**
 * * This script contains all variables that contains prefix 'player'
 * ! EXCEPT : 'playerOnMap', 'actualPlayerMap', 'actualMapEngineTwo'
 */



let playerState = PlayerStateEnum.Normal;

//#region // * Engine One Player configuration

let playerSpriteSize = 100;

let playerCanMove = true;
let playerSpeed = 5;

let playerCanInteract = true;
let playerIsExploringMap = false;



// Player anim
let playerIsMooving = false;
let playerDirection = [0, 0]; // stock the direction of the player in a array
let playerLastDirection = [0, 1]; // orientation naturally down
// Player anim

//#endregion



//#region // * Engine Two Player configuration

let playerTeam = [
    {
        name : "You",
        level : 1,
        health : {
            actualHealth : 50,
            maxHealth : 50
        },
        abilities : [
            {
                name : "Attack",
                type : "attack",
                abilityLevel : 2,
                baseAmount : 10,
                id : 1,
                range : 2
            },
            {
                name : "Heal",
                type : "heal",
                abilityLevel : 1,
                baseAmount : 5,
                id : 4,
                range : 5
            },
            {
                name : "HealAll",
                type : "healAll",
                abilityLevel : 2,
                baseAmount : 4,
                id : 5,
                range : 1
            }
        ],
        isAlive : true,
        state : "idle"
    }
]

//#endregion
