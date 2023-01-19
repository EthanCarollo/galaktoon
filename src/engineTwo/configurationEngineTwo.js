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
                id : 1
            },
            {
                name : "Heal",
                type : "heal",
                amount : 20,
                id : 4
            },
            {
                name : "HealAll",
                type : "healAll",
                amount : 10,
                id : 5
            }
        ],
        isAlive : true
    }, 
    {
        id : 0,
        hp : {
            current : 0,
            max : 50
        },
        abilities : [
            {
                name : "Attack",
                type : "attack",
                amount : 20,
                id : 1
            },
            {
                name : "Heal",
                type : "heal",
                amount : 20,
                id : 4
            },
            {
                name : "HealAll",
                type : "healAll",
                amount : 10,
                id : 5
            }
        ],
        isAlive : true
    }, 
    {
        id : 0,
        hp : {
            current : 10,
            max : 50
        },
        abilities : [
            {
                name : "Attack",
                type : "attack",
                amount : 20,
                id : 1
            },
            {
                name : "Heal",
                type : "heal",
                amount : 20,
                id : 4
            },
            {
                name : "HealAll",
                type : "healAll",
                amount : 10,
                id : 5
            }
        ],
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

let actualTurnGame = 0;

