let questList = [

];

const addQuestToList = (questId) => {
    console.log(questId)
    questList.push(questData[questId]);
}

const showQuestList = () => {
    let sizeQuestList = 500;
    let xPosQuestList = 40;
    let yPosQuestList = 25;
    let fontSize = 20;
    textSize(fontSize)
    textAlign(LEFT, TOP);
    text("- Quests List", xPosQuestList, yPosQuestList, sizeQuestList, sizeQuestList)


    let yStartList = yPosQuestList * 2 + 15;
    let sizeXContainerQuest = sizeQuestList;
    let sizeYContainerQuest = 100;
    for(let i = 0; i < questList.length; i++)
    {
        textSize(12)
        textAlign(RIGHT, BOTTOM);
        text(questList[i].currentProgression + " / " + questList[i].maxProgression, xPosQuestList, yStartList + sizeYContainerQuest* i, sizeQuestList, sizeYContainerQuest)

        textAlign(LEFT, TOP);
        textSize(15)
        text(questList[i].name, xPosQuestList, yStartList + sizeYContainerQuest* i, sizeQuestList, sizeYContainerQuest)

        textSize(8)
        text(questList[i].description, xPosQuestList, yStartList + sizeYContainerQuest* i + 25, sizeQuestList, sizeYContainerQuest)
    }
}

const addQuestProgression = (questIdProgression) => { // Update a progression using an ID
    for(let i = 0; i< questList.length; i++)
    {
        if(questList[i].idQuestProgression === questIdProgression && questList[i].currentProgression < questList[i].maxProgression)
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