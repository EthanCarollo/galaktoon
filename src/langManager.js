const LangPackage = {
    fr : "./json/lang/langFR.json"
}

const setLanguageOnStart = () => {
    if(localStorage.getItem("lang") === null) return;

    loadSpecificLanguage("fr");
}

/**
 * @param {string} language this is a string, ex : "en" for English && "fr" for French
 */
const loadSpecificLanguage = (language) => {
    fetch(LangPackage[language])
        .then(rep => rep.json())
        .then(rep => { 
            setLanguageOfEveryPrompts(rep.data)
        })
        .catch(error => { 
            // error handling
            throw new Error("there is an issue with the language pack : " + error + " // Selected lang : " + language.toUpperCase());

        })
}

const setLanguageOfEveryPrompts = (languageData) => {
    let languageKey = Object.keys(languageData)

    for(let i = 0; i < languageKey.length; i++)
    {
        switch(languageKey[i])
        {
            case "startMenu" : 
                setLanguageOfStartingMenu(languageData["startMenu"])
                break;
            case "npc" :
                setLanguageOfNpc(languageData["npc"])
                break;
            case "story" :
                setLanguageOfStories(languageData["story"])
                break;
            case "tutorial" :
                setLanguageTutorial(languageData["tutorial"])
                break;
            case "quests" :
                setLanguageQuests(languageData["quests"])
                break;
            case "planets" :
                setLanguagePlanets(languageData["planets"])
                break;
            case "engineTwo" :
                setLanguageEngineTwo(languageData["engineTwo"])
                break;
            default :
                throw new Error("text language isn't properly set // doesn't exist : " + languageKey[i])
        }
    }
}


const setLanguageEngineTwo = (engineTwoText) => {
    console.log(engineTwoText)
    endFightText = engineTwoText.endFight
    startFightText = engineTwoText.startFight
}


const setLanguagePlanets = (planetsText) => {
    for(let i = 0; i < planetsText.length;i ++)
    {
        planetsData[i].description = planetsText[i].description
        planetsData[i].name = planetsText[i].name
    }
}


const setLanguageQuests = (questsText) => {
    for(let i = 0; i < questsText.length;i ++)
    {
        questData[i].description = questsText[i].description
        questData[i].name = questsText[i].name
    }
}



const setLanguageTutorial = (tutorialText) => {
    let tutoLanguageKey = Object.keys(tutorialText)

    for(let i = 0; i < tutoLanguageKey.length; i++)
    {
        switch(tutoLanguageKey[i])
        {
            case "engineTwoTutorial" :
                tutorialEngineTwoText = tutorialText[tutoLanguageKey[i]]
                break;
            case "keyboardTutorial" :
                tutorialKeyBoardText = tutorialText[tutoLanguageKey[i]]
                break;
            case "explorationTutorial" :
                tutorialExplore = tutorialText[tutoLanguageKey[i]]
                break;
            default :
                throw new Error("tutorial text language isn't properly set : " + tutoLanguageKey[i])
        }
    }
}




/**
 * * setLanguage function for the story
 * @param {Object} storyText this is an object 
 */
const setLanguageOfStories = (storyText) => {
    
    for(let i = 0; i < storyText.length; i++)
    {
        DifferentListStory[i].text = storyText[i].text;
    }
    
}




/**
 * * setLanguage Function for the dialog menu
 * @param {Object} npcText this is an object 
 */
const setLanguageOfNpc = (npcText) => {
    /**
     *  * Triple for to set every language of every npc
     */

    for(let k = 0; k < npcText.length; k++)
    {
        npcData[k].name = npcText[k].name 
        for(let j = 0; j < npcData[k].dialogs.length; j++)
        {
            for(let l = 0; l <npcData[k].dialogs[j].length;l++)
            {
                    npcData[k].dialogs[j][l].text = npcText[k].dialogs[j][l].text
                    npcData[k].dialogs[j][l].rewardText = npcText[k].dialogs[j][l].rewardText
                    npcData[k].dialogs[j][l].altText = npcText[k].dialogs[j][l].altText
            }
        }
    }
    
}



/**
 * * setLanguage Function for the starting menu
 * @param {Object} startMenuText this is an object that contains "start" or "exit"
 */
const setLanguageOfStartingMenu = (startMenuText) => {
    let languageKey = Object.keys(startMenuText)
    for(let i = 0; i < languageKey.length; i++)
    {
        switch(languageKey[i])
        {
            case "start" : 
                StartMenuChoices[0].text = startMenuText[languageKey[i]]
                break;
            case "exit" :
                StartMenuChoices[1].text = startMenuText[languageKey[i]]
                break;
            default :
                throw new Error("start text language isn't properly set : " + languageKey[i])
        }
    }
}