const LangPackage = {
    fr : "./json/lang/langFR.json",
    en : "./json/lang/langEN.json"
}

const setLanguageOnStart = () => {
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
            throw new Error("there is an issue with the language pack : " + error + " // Selected lang : " + language.toUpperCase);

        })
}

const setLanguageOfEveryPrompts = (languageData) => {
    let languageKey = Object.keys(languageData)
    console.log(languageKey)
    for(let i = 0; i < languageKey.length; i++)
    {
        switch(languageKey[i])
        {
            case "startMenu" : 
                setLanguageOfStartingMenu(languageData["startMenu"])
                break;
            case "dialog" :
                break;
        }
    }
}


const setLanguageOfStartingMenu = (startMenuPrompt) => {
    let languageKey = Object.keys(startMenuPrompt)
    for(let i = 0; i < languageKey.length; i++)
    {
        switch(languageKey[i])
        {
            case "start" : 
                startMenuChoices[0].text = startMenuPrompt[languageKey[i]]
                break;
            case "exit" :
                startMenuChoices[1].text = startMenuPrompt[languageKey[i]]
                break;
        }
    }
}