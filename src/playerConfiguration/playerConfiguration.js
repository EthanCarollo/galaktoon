// ----------------

const getAmountPowerOfAbility = (amount, level) => {
    console.log(level)
    return amount * (level)
}

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

let actualPlayerXP = 0;
let maxPlayerXP = 100;
// * XP VALUE, if actual is > to max, then LEVEL UP

let playerSpeed = 5;
let playerVector;

const updatePlayerLevel = (char) => {
    if(actualPlayerXP >= maxPlayerXP){
        let valueMultiplier = 1.2;
        actualPlayerXP -= maxPlayerXP;
        char.level ++;
        char.hp.max = Math.floor(char.hp.max * valueMultiplier);
        char.hp.current = Math.floor(char.hp.current * valueMultiplier);
        maxPlayerXP = Math.floor(maxPlayerXP * valueMultiplier);
    }
}

// ----------------