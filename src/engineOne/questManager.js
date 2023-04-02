let questList = [

];

const addQuestToList = (questId) => {
    questList.push(questData[questId]);
    if(questData[questId].eventOnStart !== null)
    {
        startSpecificQuestEvents(questData[questId].eventOnStart);
    }
}

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

// * Quest Goal Animation
const showGoalQuest = () => {
    updateAnimationQuestGoal();
    for(let i = 0; i < questList.length; i++)
    {
        if(questList[i].questGoal !== null)
        {
            if(playerOnMap.id === questList[i].questGoal.map && questList[i].questGoal.position !== null)
            {
                imageMode(CORNER);
                let positionGoalOnMap = getCoordWithTileCoord(questList[i].questGoal.position[0], questList[i].questGoal.position[1]-1); // get vector position on map
                let xGoal =  positionGoalOnMap.x + cameraVector.x + playerVector.x - 45, yGoal = positionGoalOnMap.y + cameraVector.y + playerVector.y -60;
                image(uiData[17].image, xGoal, yGoal + animationIndexUiQuestGoal, tileSize, tileSize)
            }
        }
    }
}

let animationIndexUiQuestGoal = 0;
let toggleAnimationQuestIndex = false;
const updateAnimationQuestGoal = () => {
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
// * Quest Goal Animation

// ? There is some questType : fight, talk
const addQuestProgression = (questIdProgression, questType) => { // Update a progression using an ID
    for(let i = 0; i< questList.length; i++)
    {
        if(questList[i].idQuestProgression+"" === questIdProgression && 
            questList[i].currentProgression < questList[i].maxProgression &&
            questList[i].questType === questType)
        {
            questList[i].currentProgression ++;
        }
        checkQuestIsFinish(questList[i]);
    }
}

const addQuestProgressionOnEndFight = (teamProgressionToAdd) => { // Update the progression after a fight 
    for(let i = 0; i < teamProgressionToAdd.length; i++)
    {
        addQuestProgression(teamProgressionToAdd[i].id)
    }
}

const checkQuestIsFinish = (quest) => { // Check if a specific quest is finshed
    if(quest.currentProgression >= quest.maxProgression)
    {
        quest.isFinished = true;
        return true
    }
    return false;
}

const finishQuest = (questId) => {
    for(let i = 0; i < questList.length; i++)
    {
        if(questList[i].id === questId)
        {
            questList.splice(i, 1)
            return;
        }
    }
}

// ! Quest specific events

const startSpecificQuestEvents = (questEventString) => {
    switch(questEventString)
    {
        case "goNextTutoStep" :
            mapData[0].npcOnMap[0].nextCase = [12, 10];
            break;
        default :
            throw new Error("Specific event isn't set inside the startSpecificQuestEvents() : " + questEventString)
    }
}