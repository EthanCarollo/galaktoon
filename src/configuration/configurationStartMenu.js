let startMenuState = StartMenuStateEnum.Loading;

let indexLogoStartMenu = -150;
let maxSizeOfTheLogo = 300;
let logoOffSet = [0, 0];

let startMenuChoices = [
    {
        text : 'Start Game',
        callback : () => { launchEngine(EngineStateEnum.EngineOne); }
    },
    {
        text : 'Exit Game',
        callback : () => { 
            window.open("", "_self");
            window.close(); 
        }
    } // TODO : Are you sure to exit the game ?
]