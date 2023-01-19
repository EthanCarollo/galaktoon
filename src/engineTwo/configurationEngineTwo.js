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
                name : "Attack1",
                type : "attack",
                id : 1
            },
            {
                name : "Attack1",
                type : "attack",
                id : 1
            },
            {
                name : "Attack1",
                type : "attack",
                id : 1
            }
        ],
        isAlive : true
    }, 
    {
        id : 0,
        hp : {
            current : 50,
            max : 50
        },
        isAlive : true
    }, 
    {
        id : 0,
        hp : {
            current : 50,
            max : 50
        },
        isAlive : true
    }
]

let enemyTeam = [
    {
        id : 1,
        hp : {
            current : 20,
            max : 50
        },
        isAlive : true
    },
    {
        id : 1,
        hp : {
            current : 30,
            max : 50
        },
        isAlive : true
    },
    {
        id : 1,
        hp : {
            current : 40,
            max : 50
        },
        isAlive : true
    }
]

let currentTurn = 0;
let currentAbilityUsed = 0;
let currentTarget = 0;

// Fight team

