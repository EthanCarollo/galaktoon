/**
 * This script will hold every enumeration.
 * ? How the Enum Object of Galaktoon works ?
 * * The Enum holds every specified value for bunch of things, in my case i usually use it for the differents states
 * * of my Engine or my SceneManager
 * ? Why am I using this ?
 * * I use this cause i think it's more easy to find every existing variables, so if i see the suffix "Enum" in a variable or
 * * a function, i just need to go here ! This is not for a performance issue it's just to be a little better organized
 */



const EngineStateEnum = {
    EngineOne : "engineOne", 
    EngineTwo : "engineTwo"
}

const PlayerStateEnum = {
    Normal : "normal",
    Dialog : "dialog"
}

const EngineOneStateEnum = {
    Playing : 'playing',
    Cinematic : 'cinematic'
}

const TransitionStateEnum = {
    EnterIn : "enterIn",
    GoOut : "goOut"
}

const SceneManagerStateEnum = {
    Engine : "engine",
    StartMenu : "startMenu"
}

const StartMenuStateEnum = {
    Loading : "loading",
    Normal : "normal"
}



/**
 * @param {*} enumeration Enum where to verify
 * @param {*} value value to verify
 * @returns {boolean} if it is or not in the Enum
 */
const verifyValueIsInEnum = (enumeration, value) => Object.values(enumeration).includes(value);