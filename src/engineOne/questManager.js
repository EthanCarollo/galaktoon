
/**
 * @param {int} questId the id of the quest to add to the Array
 */
const addQuestToList = (questId) => {
    /**
     * TODO : If we already have a quest, we can't add the quest so
     */
    questList.push(questData[questId]);
    if(questData[questId].eventOnStart !== null)
    {
        startSpecificQuestEvents(questData[questId].eventOnStart);
    }
}


/**
 * 
 * @param {int} questIdProgression the id of the progression that correspond to the quest
 * @param {string} questType the string type used in the switch
 */
const addQuestProgression = (questIdProgression, questType) => { // Update a progression using an ID
    /**
     * * For on the questList to add progression to the current quest and then check if the quest is finish, 
     * * so we can end the quest.
     */
    for(let i = 0; i< questList.length; i++)
    {
        if(questList[i].idQuestProgression+"" === questIdProgression+"" && 
            questList[i].currentProgression < questList[i].maxProgression &&
            questList[i].questType === questType)
        {
            questList[i].currentProgression ++;
        }
        checkQuestIsFinish(questList[i]);
    }
}



/**
 * @param {int} teamProgressionToAdd teamArray of every npc killed in the last fight wasn't in the quest list and can be add in the questList progression
 */
const addQuestProgressionOnEndFight = (teamProgressionToAdd) => { // Update the progression after a fight 
    for(let i = 0; i < teamProgressionToAdd.length; i++)
    {
        addQuestProgression(teamProgressionToAdd[i].id, "fight") // the progression quest must be type of fight
    }
}


/**
 * @param {object} quest the quest object
 * @returns {boolean} if the quest is finished or not
 */
const checkQuestIsFinish = (quest) => { // Check if a specific quest is finshed
    if(quest.currentProgression >= quest.maxProgression)
    {
        if(quest.isFinished !== true)
        {
            quest.isFinished = true;
            endSpecificQuestEvents(quest.eventOnEnd);
        }
        return true
    }
    return false;
}



/**
 * @param {int} questId 
 */
const finishQuest = (questId) => {
    for(let i = 0; i < questList.length; i++)
    {
        if(questList[i].id === questId)
        {
            questList.splice(i, 1) // Delete the quest with the quest id
            return;
        }
    }
}



//#region // * Specific event region

/**
 * 
 * @param {string} questEventString the start event quest string
 */
const startSpecificQuestEvents = (questEventString) => {
    /** 
     * * This is usefull in case we need to have some events on start quest
     */
    switch(questEventString)
    {
        case "goNextTutoStep" :
            tutorialManagerState = TutorialManagerStateEnum.KeyBoardTuto;
            mapData[0].npcOnMap[0].nextCase = searchPath(mapData[0].npcOnMap[0].pos, [3, 5], mapData[0].map.objectLayer); // Here it's the AI who mmoves
            break;
        case "goFightTuto" :
            addNpcToMap(4, [2, 6], 'dialog', [1, 0], 'pop')
            break;
        case "goOnPlanetBob" :
            playerCanExplore = true;
            mapData[0].npcOnMap[0].nextCase = searchPath(mapData[0].npcOnMap[0].pos, [7, 3], mapData[0].map.objectLayer); // Here it's the AI who mooves
            break;
        case "addNewAbility1" :
            planetsData[2].isExplorable = true;
            playerTeam[0].abilities[1].isLocked = false; // unlock the first ability
            launchAdvancedTips("New Card Unlocked !", uiData[playerTeam[0].abilities[1].id].image)
            break;
        case "addNewAbility2" :
            planetsData[3].isExplorable = true;
            playerTeam[0].abilities[2].isLocked = false; // unlock the first ability
            launchAdvancedTips("New Card Unlocked !", uiData[playerTeam[0].abilities[2].id].image)
            break;
        case null :
            break;
        default :
            throw new Error("Specific event isn't set inside the startSpecificQuestEvents() : " + questEventString)
    }
}


/**
 * 
 * @param {string} questEventString the start event quest string
 */
const endSpecificQuestEvents = (questEventString) => {
    /** 
     * * This is usefull in case we need to have some events on start quest
     */
    if(questEventString === undefined) return;
    switch(questEventString)
    {
        case "finishFightQuestBob" :
            mapData[2].npcOnMap[0].nextCase = searchPath(mapData[2].npcOnMap[0].pos, [15, 17], mapData[2].map.objectLayer); // Here it's the AI who mooves
            mapData[2].npcOnMap[0].interaction = "dialog";
            mapData[2].npcOnMap[1].state = "dead"
            npcData[3].actualDialogIndex = 3; // Update the dialog of the npc of the ai
            finishQuest(2);
            addQuestToList(3);
            break;
        default :
            throw new Error("Specific event isn't set inside the startSpecificQuestEvents() : " + questEventString)
    }
}

//#endregion



//#region // * Show quest on UI or Map region

const showQuestList = () => {
    let sizeXContainerQuest = 500;
    let sizeYContainerQuest = sizeXContainerQuest/5; // Width : 500 Height : 100
    let xPosQuestList = 40;
    let yPosQuestList = 25;
    let fontSize = 20;
    textSize(fontSize)
    textAlign(LEFT, TOP);
    image(uiData[21].image, 0, 0, sizeXContainerQuest / 1.5, 1000)
    image(uiData[19].image, xPosQuestList, yPosQuestList, sizeXContainerQuest, sizeYContainerQuest)

    let yStartList = yPosQuestList * 2 + 15;
    for(let i = 0; i < questList.length; i++)
    {
        let paddingQuest = 20;
        image(uiData[18].image, xPosQuestList, yStartList + sizeYContainerQuest* i, sizeXContainerQuest, sizeYContainerQuest)
        fill(255);
        textSize(12)
        textAlign(RIGHT, BOTTOM);
        text(questList[i].currentProgression + " / " + questList[i].maxProgression, 
            xPosQuestList + paddingQuest / 2, 
            yStartList + sizeYContainerQuest* i + paddingQuest / 2, 
            sizeXContainerQuest - paddingQuest, 
            sizeYContainerQuest - paddingQuest)

        textAlign(LEFT, TOP);
        textSize(15)
        text(questList[i].name, 
            xPosQuestList + paddingQuest / 2, 
            yStartList + sizeYContainerQuest* i + paddingQuest / 2, 
            sizeXContainerQuest - paddingQuest, 
            sizeYContainerQuest - paddingQuest)

        textSize(8)
        text(questList[i].description, xPosQuestList +  + paddingQuest / 2, 
            yStartList + sizeYContainerQuest* i + 25  + paddingQuest / 2, 
            sizeXContainerQuest - paddingQuest, 
            sizeYContainerQuest - paddingQuest)
    }
}


/**
 * ! Deprecated Method, we no longer use that cause it was juged not usefull in the game.
 */
const showGoalQuest = () => {
    /** 
     * * This function set the current goal of every quest on the map if the current map is the same
     * * than the current quest goal
     */
    updateAnimationQuestGoal();
    for(let i = 0; i < questList.length; i++)
    {
        if(questList[i].questGoal !== null)
        {
            if(playerOnMap.id === questList[i].questGoal.map && questList[i].questGoal.position !== null && !checkQuestIsFinish(questList[i]))
            {
                imageMode(CORNER);
                let positionGoalOnMap = getCoordWithTileCoord(questList[i].questGoal.position[0], questList[i].questGoal.position[1]-1); // get vector position on map
                let xGoal =  positionGoalOnMap.x + cameraVector.x + playerVector.x - 45, yGoal = positionGoalOnMap.y + cameraVector.y + playerVector.y -60;
                image(uiData[17].image, xGoal, yGoal + animationIndexUiQuestGoal, tileSize, tileSize)
            }
        }
    }
}

const updateAnimationQuestGoal = () => {
    /**
     * * Update the animation of the arrow on the top of the current goal
     */

    if(animationIndexUiQuestGoal > 20 || toggleAnimationQuestIndex === true){
        animationIndexUiQuestGoal -= 0.25
        toggleAnimationQuestIndex = true;
    }
    if(animationIndexUiQuestGoal > -5 && toggleAnimationQuestIndex === false){
        animationIndexUiQuestGoal += 0.25
    }
    if(toggleAnimationQuestIndex === true && animationIndexUiQuestGoal < 0)
    {
        toggleAnimationQuestIndex = false;
    }
    
}

//#endregion