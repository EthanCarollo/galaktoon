// Fight team

let playerTeam = [
    {
        id : 0,
        name : "You",
        hp : {
            current : 50,
            max : 50
        },
        abilities : [
            {
                name : "Attack",
                type : "attack",
                amount : 20,
                id : 1,
                couldown : 1
            },
            {
                name : "Heal",
                type : "heal",
                amount : 20,
                id : 4,
                couldown : 2
            },
            {
                name : "HealAll",
                type : "healAll",
                amount : 10,
                id : 5,
                couldown : 3
            }
        ],
        isAlive : true,
        state : "idle"
    }
]

let enemyTeam;

let currentTurn = 0;
let currentAbilityUsed = 0;
let currentTarget = 0;
let turnTeam = "player";
let indexAnimation = 0;

let fightIsEnd = false;

let fightLog = ["Fight Started !"];

// Fight team

let actualTurnGame = 0;

