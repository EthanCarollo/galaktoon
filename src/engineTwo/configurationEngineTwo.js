
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
                range : 2
            },
            {
                name : "Heal",
                type : "heal",
                abilityLevel : 1,
                baseAmount : 20,
                id : 4,
                range : 1
            },
            {
                name : "HealAll",
                type : "healAll",
                abilityLevel : 2,
                baseAmount : 20,
                id : 5,
                range : 1
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

let whichEntityTurn = 0;
let selectedAbility = 0;

