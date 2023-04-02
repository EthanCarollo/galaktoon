const launchNpcDialog = (npc) => {

    npcInteractedData = npcData[npc.id]
  
    if(npcInteractedData.dialogs !== undefined)
    {

      setNpcDirectionWithThePlayerDirection(npc);

      addQuestProgression(npcInteractedData.id, "talk") // Add the quest progression if a quest exist with the type : "talk" and the id of the npc

      npcDialoged = npcInteractedData

    }else{
      // probably some annexe events
    }
  }


const displayDialogNpc = (npcDialoged) => {
    
  backgroundTransitionEffect();
  
  playerState = "dialoging"

  let actualDialogIndex = npcDialoged.actualDialogIndex;
  
  let dialogBox = uiData[11].image;
  let sizeXDialog = window.innerWidth/ 1.45;
  let sizeYDialog = sizeXDialog/5;
  let xStartDialog = (window.innerWidth /2) - (sizeXDialog/2);
  let yStartDialog = window.innerHeight - sizeYDialog;

  showNpcSpriteInDialog(npcDialoged);
  
  fill(0, 0, 0);
  let box = image(dialogBox, xStartDialog, yStartDialog, sizeXDialog, sizeYDialog)
  textSize(sizeYDialog/11);
  
  setQuestState(npcDialoged.dialogs[actualDialogIndex][actualDialog])

  showDialogText(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, npcDialoged.dialogs[actualDialogIndex][actualDialog])
  setDialogInput(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, npcDialoged.dialogs[actualDialogIndex][actualDialog], npcDialoged);
      

}

const showChoiceBoxForQuestDependingToTheType = (xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, dialog) => {
  switch(dialog.interactionType)
  {
    case "cannotRefuse" :
      showAcceptOnlyButton(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, dialog);
      break;
    default :
      showDialogChoiceBoxForQuest(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, dialog);
      break;
  }
}// Set the different choice depending on which quest type it is  

  // Dialog Component

const showAcceptOnlyButton = (xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, quest) => {
    textAlign(CENTER, CENTER);
    
    let sizeYChoice = sizeYDialog / 2.4;
    let sizeXChoice = sizeXDialog / 2.4;
    let paddingXChoice = sizeXDialog/2 - sizeXChoice/2;
    let paddingYChoice = sizeYDialog/2.5;

    textSize(sizeYChoice/4.5);

    let dialogBox = uiData[11].image;
    let xBoxTrue = xStartDialog + paddingXChoice;
    let boxChoiceTrue = image(dialogBox, xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
    
    fill(255)
    changeFillOnHover(xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, 125, 255, 125)
    if(mouseIsHover(xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice))
    {
      let boxChoiceHover = image(uiData[20].image, xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
    }

    text("Accept", xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
  
    createInputButtonWithCallback(xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, 
        () => {
            quest.questIsGived = true;
            addQuestToList(quest.quest)
            goNextDialog();
        });
}

const showDialogChoiceBoxForQuest = (xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, quest) => {
    
    textAlign(CENTER, CENTER);
    
    let sizeYChoice = sizeYDialog / 2.4;
    let sizeXChoice = sizeXDialog / 2.4;
    let paddingXChoice = sizeYDialog/2.75;
    let paddingYChoice = sizeYDialog/2.5;

    textSize(sizeYChoice/4.5);

    let dialogBox = uiData[11].image;
    let xBoxTrue = xStartDialog + paddingXChoice;
    let boxChoiceTrue = image(dialogBox, xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
    
    fill(255)
    changeFillOnHover(xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, 125, 255, 125)
    if(mouseIsHover(xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice))
    {
      let boxChoiceHover = image(uiData[20].image, xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
    }

    text("Accept", xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
  
    createInputButtonWithCallback(xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, 
        () => {
            quest.questIsGived = true;
            addQuestToList(quest.quest)
            goNextDialog();
        });
    let xBoxFalse = xStartDialog + sizeXDialog - sizeXChoice - paddingXChoice;
    let boxChoiceFalse = image(dialogBox, xBoxFalse, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
          
    fill(255)
    changeFillOnHover(xBoxFalse, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, 255, 125, 125)
    if(mouseIsHover(xBoxFalse, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice))
    {
      let boxChoiceHover = image(uiData[20].image, xBoxFalse, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
    }

    text("Refuse", xBoxFalse, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)

    createInputButtonWithCallback(xBoxFalse, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, 
        () => {
            goNextDialog();
        });
    fill(0)
    
}

const showRewardBox = (xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, npc, dialog) => {
  
  textAlign(CENTER, CENTER);
    
  let sizeYChoice = sizeYDialog / 2.2;
  let sizeXChoice = sizeXDialog / 2.2;
  let paddingXChoice = sizeYDialog/2.75;
  let paddingYChoice = sizeYDialog/2.3;

  textSize(sizeYChoice/4.5);

  let dialogBox = uiData[11].image;
  let xBoxTrue = window.innerWidth / 2 - sizeXChoice / 2;
  let boxAcceptReward = image(dialogBox, xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
  
  fill(255)
  changeFillOnHover(xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, 0, 180, 0)

  text("Accept Reward", xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)

  createInputButtonWithCallback(xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, 
      () => {
        finishQuest(dialog.quest);
        actualDialog = 0;
        dialogTextIndex = 0;
        if(npc.actualDialogIndex < npc.dialogs.length-1)
        {
          npc.actualDialogIndex++;
        }
      });
  fill(255)

}
  
const showNpcSpriteInDialog = (npcDialoged, whoDialog = 1) => {
    let sizeSpriteDialog = window.innerWidth/4.5;
  
    let xSprite1 = window.innerWidth - sizeSpriteDialog;
    let xSprite2 = 0;
  
    let ySprite = window.innerHeight - sizeSpriteDialog / 1.2;
    
    let spritePlayerAnimate = spritesData[0].image.get(0,0,30,30)
    let spriteNpcAnimate = spritesData[npcDialoged.spriteId].image.get(0,0,30,30)

    let spritePres1
    let spritePres2

    switch(whoDialog){
      case 1 :
        spritePres1 = image(spriteNpcAnimate, xSprite1, ySprite, sizeSpriteDialog, sizeSpriteDialog)
        tint(80, 80, 80);
        spritePres2 = image(spritePlayerAnimate, xSprite2, ySprite, sizeSpriteDialog, sizeSpriteDialog)
        noTint();
        break;
      case 0 :
        tint(80, 80, 80);
        spritePres1 = image(spriteNpcAnimate, xSprite1, ySprite, sizeSpriteDialog, sizeSpriteDialog)
        noTint();
        spritePres2 = image(spritePlayerAnimate, xSprite2, ySprite, sizeSpriteDialog, sizeSpriteDialog)
        break;
      default :
      throw new Error("Error in the show Sprite in dialog, the whoDialog variable should be 1 or 0 and it's actually : " + whoDialog)
    }
}

const showDialogText = (xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, dialog) => {
  let paddingXText = sizeYDialog/2.5;
  let paddingYText = sizeYDialog/3.75;

  let paddingSizeXBox = paddingXText*2;
  let paddingSizeYBox = paddingYText*2;
  
  let actualDialogNpc;

  switch(dialog.state)
  {
    case "Normal" :
      actualDialogNpc = creatingStringWithDelay(dialog.text);
      break;
    case "HaveQuestToGive" :
      actualDialogNpc = creatingStringWithDelay(dialog.text);
      break;
    case "GivedQuest" :
      actualDialogNpc = creatingStringWithDelay(dialog.altText);
      break;
    case "Reward" :
      actualDialogNpc = creatingStringWithDelay(dialog.rewardText);
      break;
    default :
      throw new Error("State isn't defined or doesn't exist")
  }

  textSize(sizeYDialog/11);
  textAlign(LEFT, TOP)
  fill(255)
  text(actualDialogNpc, xStartDialog +paddingXText, yStartDialog+paddingYText, sizeXDialog-paddingSizeXBox, sizeYDialog-paddingSizeYBox);
}

const setDialogInput = (xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, dialog, npc) => {
  switch(dialog.state)
  {
    case "Normal" :
      createInputButtonWithCallback(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, goNextDialog);
      break;
    case "HaveQuestToGive" :
      showChoiceBoxForQuestDependingToTheType(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, dialog);
      break;
    case "GivedQuest" :
      createInputButtonWithCallback(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, goNextDialog);
      break;
    case "Reward" :
      showRewardBox(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, npc, dialog);
      break;
    default :
      throw new Error("State isn't defined or doesn't exist")
  }
}

const setQuestState = (dialog) => {
  dialog.state = "Normal"

  if(dialog.questIsGived === true) {
    dialog.state = "GivedQuest"
    if(checkQuestIsFinish(questData[dialog.quest]) === true){
      dialog.state = "Reward"
    }
  }else if(dialog.questIsGived === false)
  {
    dialog.state = "HaveQuestToGive"
  }
}

  // Dialog Component

  // ! Dialog Effect

  let backgroundTransition = 0;
const backgroundTransitionEffect = () => {
    // Background transition
    if(backgroundTransition < 115){
      backgroundTransition+= 5;
    }
    background(0,0,0,backgroundTransition)
    // Background transition
  }

  var dialogTextIndex = 0;
const creatingStringWithDelay = (textToDelay) => {
    if(dialogTextIndex < textToDelay.length)
    {
      dialogTextIndex += 0.3;
    }
    return textToDelay.substr(0, Math.floor(dialogTextIndex));
  }

  // ! Dialog Effect
  
  // ? Dialog Logic

const goNextDialog = () => {
    dialogTextIndex = 0;
    actualDialog++;
    if(actualDialog >= npcDialoged.dialogs[npcDialoged.actualDialogIndex].length){
      exitDialog()
    }

  }

const exitDialog = () => {
    backgroundTransition = 0;
    playerState = "normal"
    actualDialog = 0;
    npcDialoged = null;
    return;
  }

  // ? Dialog Logic