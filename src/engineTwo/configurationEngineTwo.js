// Fight team

let playerTeam = [
    {
        id : 0,
        hp : {
            current : 30,
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

let enemyTeam = [
    {
        id : 1,
        hp : {
            current : 20,
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
    },
    {
        id : 1,
        hp : {
            current : 30,
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
    },
    {
        id : 1, 
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

let currentTurn = 0;
let currentAbilityUsed = 0;
let currentTarget = 0;
let turnTeam = "player";
let indexAnimation = 0;

// Fight team

let actualTurnGame = 0;

