
let playerTeam = [
    {
        name : "You",
        level : 1,
        hp : {
            current : 50,
            max : 50
        },
        abilities : [
            {
                name : "Attack",
                type : "attack",
                abilityLevel : 2,
                baseAmount : 20,
                id : 1,
                couldown : 1
            },
            {
                name : "Heal",
                type : "heal",
                abilityLevel : 1,
                baseAmount : 20,
                id : 4,
                couldown : 2
            },
            {
                name : "HealAll",
                type : "healAll",
                abilityLevel : 2,
                baseAmount : 20,
                id : 5,
                couldown : 3
            }
        ],
        isAlive : true,
        state : "idle"
    }
]

let actualMapEngineTwo;

let vectorCameraEngineTwo;

let selectedChar = null;
let selectedEntity = null;

let whichEntityTurn = null;

