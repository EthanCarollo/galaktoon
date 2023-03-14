
//#region // ! Global Player configuration


let actualPlayerXP = 0;
let maxPlayerXP = 100;
// * XP VALUE, if actual is > to max, then LEVEL UP
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

//#endregion

//#region // * Engine One Player configuration

let playerSpeed = 5;
let playerCanInteract = true;

//#endregion

//#region // * Engine Two Player configuration

//#endregion

// ----------------