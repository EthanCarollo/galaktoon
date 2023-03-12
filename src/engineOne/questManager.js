let questList = [
    
];

const addQuestToList = (questId) => {
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
        textAlign(LEFT, TOP);
        textSize(15)
        text(questList[i].name, xPosQuestList, yStartList + sizeYContainerQuest* i, sizeQuestList, sizeQuestList)
        textSize(8)
        text(questList[i].description, xPosQuestList, yStartList + sizeYContainerQuest* i + 25, sizeQuestList, sizeQuestList)
    }
}