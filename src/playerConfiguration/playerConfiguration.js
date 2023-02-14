// ----------------

let playerTeam = [
    {
        id : 0,
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

let actualPlayerXP = 0;
let maxPlayerXP = 100;
// * XP VALUE, if actual is > to max, then LEVEL UP

let playerSpeed = 5;
let playerVector;

const updatePlayerLevel = () => {
    if(actualPlayerXP >= maxPlayerXP){
        actualPlayerXP -= maxPlayerXP;
        level ++;
    }
}

// ----------------