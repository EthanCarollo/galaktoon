/** 
 * * This script will hold every enumeration, in that case, it's more organized in a certain way
 * * In that case, i know that every variable who ends with the suffix "Enum" is here !
*/ 

const EngineStateEnum = {
    EngineOne : "engineOne", 
    EngineTwo : "engineTwo"
}

const TransitionStateEnum = {
    EnterIn : "enterIn",
    GoOut : "goOut"
}

const SceneManagerStateEnum = {
    Engine : "engine"
}



/**
 * @param {*} enumeration Enum where to verify
 * @param {*} value value to verify
 * @returns {boolean} if it is or not in the Enum
 */
const verifyValueIsInEnum = (enumeration, value) => Object.values(enumeration).includes(value);