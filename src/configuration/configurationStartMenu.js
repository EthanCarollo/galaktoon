let startMenuState = StartMenuStateEnum.Loading;

let indexLogoStartMenu = -150;
let maxSizeOfTheLogo = 300;
let logoOffSet = [0, 0];

const StartMenuChoices = [
    {
        text : 'Start Game',
        callback : () => { engineOneState = EngineOneStateEnum.StoryBoard; launchEngine(EngineStateEnum.EngineOne); launchNpcDialog(playerOnMap.npcOnMap[0]) }
    },
    {
        text : 'Exit Game',
        callback : () => { 
            window.open("", "_self");
            window.close(); 
        }
    } // TODO : Are you sure to exit the game ?
]

const LangMenuChoices = [
    {
        text : 'EN',
        callback : () => { 
            localStorage.removeItem("lang")
            restartGame(); 
        }
    },
    {
        text : 'FR',
        callback : () => { 
            localStorage.setItem("lang", "fr"); 
            restartGame();
        }
    }
]

let loadingBarOpacity = 255;