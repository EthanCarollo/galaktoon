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
        }
    }
}




const setLanguageTutorial = (tutorialPrompt) => {
    let tutoLanguageKey = Object.keys(tutorialPrompt)

    for(let i = 0; i < tutoLanguageKey.length; i++)
    {
        switch(tutoLanguageKey[i])
        {
            case "engineTwoTutorial" :
                tutorialText = tutorialPrompt[tutoLanguageKey[i]]
                break;
        }
    }
}




/**
 * * setLanguage function for the story
 * @param {Object} storyPrompt this is an object 
 */
const setLanguageOfStories = (storyPrompt) => {
    
    for(let i = 0; i < storyPrompt.length; i++)
    {
        DifferentListStory[i].text = storyPrompt[i].text;
    }
    
}




/**
 * * setLanguage Function for the dialog menu
 * @param {Object} npcPrompt this is an object 
 */
const setLanguageOfNpc = (npcPrompt) => {
    /**
     *  * Triple for to set every language of every npc
     */

    for(let k = 0; k < npcPrompt.length; k++)
    {
        npcData[k].name = npcPrompt[k].name 
        for(let j = 0; j < npcData[k].dialogs.length; j++)
        {
            for(let l = 0; l <npcData[k].dialogs[j].length;l++)
            {
                    npcData[k].dialogs[j][l].text = npcPrompt[k].dialogs[j][l].text
                    npcData[k].dialogs[j][l].rewardText = npcPrompt[k].dialogs[j][l].rewardText
                    npcData[k].dialogs[j][l].altText = npcPrompt[k].dialogs[j][l].altText
            }
        }
    }
    
}



/**
 * * setLanguage Function for the starting menu
 * @param {Object} startMenuPrompt this is an object that contains "start" or "exit"
 */
const setLanguageOfStartingMenu = (startMenuPrompt) => {
    let languageKey = Object.keys(startMenuPrompt)
    for(let i = 0; i < languageKey.length; i++)
    {
        switch(languageKey[i])
        {
            case "start" : 
                StartMenuChoices[0].text = startMenuPrompt[languageKey[i]]
                break;
            case "exit" :
                StartMenuChoices[1].text = startMenuPrompt[languageKey[i]]
                break;
        }
    }
}