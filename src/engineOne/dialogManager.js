/**
 * @param {object} npc object from the npc.json
 */
const launchNpcDialog = (npc) => {
  /**
   * * Interact with the npc and launch the dialog if we have dialog
   */

  npcInteractedData = npcData[npc.id]
  
  if(npcInteractedData.dialogs !== undefined)
  {

    setNpcDirectionWithThePlayerDirection(npc);

    addQuestProgression(npcInteractedData.id, "talk") // Add the quest progression if a quest exist with the type : "talk" and the id of the npc

    npcDialoged = npcInteractedData

    uiEngineOneState = UiEngineOneStateEnum.Dialoging;

  }else{
    // TODO : some annexe events if we interact with a pnj without dialog
  }
}

const goNextDialog = (lengthDialog = null) => {
  /**
   * * Advance in the dialog and exit the dialog if it's the last dialog of the dialog array
   */
  if(lengthDialog !== null && typeof(lengthDialog) === typeof(dialogTextIndex) && dialogTextIndex !== lengthDialog)
  {
    dialogTextIndex = lengthDialog;
    return;
  }
  dialogTextIndex = 0;
  actualDialog++;
  if(actualDialog >= npcDialoged.dialogs[npcDialoged.actualDialogIndex].length){
    exitDialog()
  }

}

const exitDialog = () => {
  /**
   * * Reset most of values to the normal and end the dialog
   */
  uiEngineOneState = UiEngineOneStateEnum.Normal;
  backgroundTransition = 0;
  playerState = PlayerStateEnum.Normal
  actualDialog = 0;
  npcDialoged = null;
  return;
}

//#region // * Dialog UI using Dialog UI Component

const displayDialogNpc = (npcDialoged) => {
    
    backgroundTransitionEffect();
    
    playerState = PlayerStateEnum.Dialog
  
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

const showChoiceBoxDependingToTheType = (
  xStartDialog, 
  yStartDialog, 
  sizeXDialog, 
  sizeYDialog, 
  dialog, 
  callback = () => {
      dialog.questIsGived = true;
      addQuestToList(dialog.quest)
      goNextDialog();
  }) => {
  /** 
   * * Set the different dialog choice depending on the interaction type
   */
  switch(dialog.interactionType)
  {
    case "cannotRefuse" :
      showAcceptOnlyButton(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, callback);
      break;
    default :
      showDialogChoiceBox(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, callback);
      break;
  }
}
  
//#endregion

//#region // * Dialog UI Component Region



const showAcceptOnlyButton = (xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, callback) => {
  textAlign(CENTER, CENTER);
  
  let sizeYChoice = sizeYDialog / 3;
  let sizeXChoice = sizeXDialog / 3;
  let paddingXChoice = sizeYDialog/1.5;
  let paddingYChoice = sizeYDialog/4;

  textSize(sizeYChoice/4.5);

  let dialogBox = uiData[11].image;
  let xBoxTrue = xStartDialog + sizeXDialog - sizeXChoice - paddingXChoice;
  let boxChoiceTrue = image(dialogBox, xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
  
  fill(255)
  changeFillOnHover(xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, 20, 254, 2)
  if(mouseIsHover(xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice))
  {
    let boxChoiceHover = image(uiData[20].image, xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
  }

  text(acceptText, xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)

  createInputButtonWithCallback(xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, callback);

  let xBoxFalse = xStartDialog + paddingXChoice;
  tint(125,125,125)

  if(refuseIsShaking === true)
  {
    xBoxFalse += getRandomInt(5) - getRandomInt(5)
    yStartDialog += getRandomInt(5) - getRandomInt(5)
  }
  let boxChoiceFalse = image(dialogBox, xBoxFalse, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
  noTint()
  fill(125)
  text("Refuse", xBoxFalse, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
  imageMode(CENTER)
  image(uiData[16].image, xBoxFalse+sizeXChoice/2, yStartDialog-sizeYChoice/4, sizeYChoice, sizeYChoice)
  imageMode(CORNER)

  createInputButtonWithCallback(xBoxFalse, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, 
    () => {
        refuseIsShaking = true;
        setTimeout(() => {
          refuseIsShaking = false;
        }, 500);
    });

}


// loadNewMap(mapData[0], [-15, -15]);
const showDialogChoiceBox = (xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, callback) => {
  
  textAlign(CENTER, CENTER);
  
  let sizeYChoice = sizeYDialog / 3;
  let sizeXChoice = sizeXDialog / 3;
  let paddingXChoice = sizeYDialog/1.5;
  let paddingYChoice = sizeYDialog/4;

  textSize(sizeYChoice/4.5);

  let dialogBox = uiData[11].image;
  let xBoxTrue = xStartDialog + sizeXDialog - sizeXChoice - paddingXChoice;
  let boxChoiceTrue = image(dialogBox, xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
  
  fill(255)
  changeFillOnHover(xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, 20, 254, 2)
  if(mouseIsHover(xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice))
  {
    let boxChoiceHover = image(uiData[20].image, xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
  }

  text(acceptText, xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)

  createInputButtonWithCallback(xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, callback);

  let xBoxFalse = xStartDialog + paddingXChoice;
  let boxChoiceFalse = image(dialogBox, xBoxFalse, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
        
  fill(255)
  changeFillOnHover(xBoxFalse, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, 253, 3, 3)
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
    
  
  let sizeYChoice = sizeYDialog / 3;
  let sizeXChoice = sizeXDialog / 3;
  let paddingXChoice = sizeYDialog/1.5;
  let paddingYChoice = sizeYDialog/4;

  textSize(sizeYChoice/4.5);

  let dialogBox = uiData[11].image;
  let xBoxTrue = window.innerWidth / 2 - sizeXChoice / 2;
  let boxAcceptReward = image(dialogBox, xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)

  fill(255)
  changeFillOnHover(xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, 20, 254, 2)

  text(finishQuestText, xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)

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
    case "GivedQuest" :
      actualDialogNpc = creatingStringWithDelay(dialog.altText);
      break;
    case "Reward" :
      actualDialogNpc = creatingStringWithDelay(dialog.rewardText);
      break;
    default :
      actualDialogNpc = creatingStringWithDelay(dialog.text);
  }

  textSize(sizeYDialog/11);
  textAlign(LEFT, TOP)
  fill(255)
  text(actualDialogNpc, xStartDialog +paddingXText, yStartDialog+paddingYText, sizeXDialog-paddingSizeXBox, sizeYDialog-paddingSizeYBox);

}



const setDialogInput = (xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, dialog, npc) => {
/**
 * * Setting the current text for the length for the verification in the next dialog
 * * Then, switch case on the state of the dialog to show different in put on different
 * * dialog
 */

  let textDialog = dialog.text
  if(dialog.state === "GivedQuest") textDialog = dialog.altText
  if(dialog.state === "Reward") textDialog = dialog.rewardText


  if(dialogTextIndex !== textDialog.length)
  {
    createInputButtonWithCallback(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, () => { goNextDialog(textDialog.length) });
    textSize(sizeYDialog/15);
    textAlign(RIGHT, BOTTOM)
    text("Click", xStartDialog, yStartDialog, sizeXDialog-72.5, sizeYDialog-47.5)
    textAlign(LEFT, TOP)
    return;
  }

  switch(dialog.state)
  {
    case "Normal" :
      createInputButtonWithCallback(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, goNextDialog);
      break;
    case "Fight" :
      showAcceptOnlyButton(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, () => {
        if(launchFightOnEngineTwo(dialog.fight) === false) exitDialog();
      });
      break;
    case "HaveQuestToGive" :
      showChoiceBoxDependingToTheType(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, dialog);
      break;
    case "GivedQuest" :
      createInputButtonWithCallback(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, goNextDialog);
      break;
    case "Reward" :
      showRewardBox(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, npc, dialog);
      break;
    case "returnOnTheSpaceShip" :
      showChoiceBoxDependingToTheType(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, dialog, ()=>{loadNewMap(mapData[0], [-8.3, -3]); goNextDialog()})
      // This type just teleport the player to the space ship
      break;
    case "finishTheGame" :
      createInputButtonWithCallback(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, () => {
        goNextDialog()
        launchNpcDialog(mapData[3].npcOnMap[2])
      });
      break;
    case "launchSalatonion" :
      createInputButtonWithCallback(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, () => {
        goNextDialog()
        launchNpcDialog(mapData[3].npcOnMap[3])
      });
      break;
    case "launchEnd" :
      createInputButtonWithCallback(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, () => {
        goNextDialog()
        launchEndGame();
      });
      break;
    case "appearBobAfterFight" :
      createInputButtonWithCallback(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, ()=>{
        goNextDialog()
        if(freeBobKidHappens === false){
          let numberNpc = addNpcToMap(9, [20, 21], 'dialog', [1, 0], 'idle', true, 1)
          mapData[1].npcOnMap[numberNpc-1].nextCase = searchPath(mapData[1].npcOnMap[numberNpc-1].pos, [12, 21], mapData[1].map.objectLayer);
        }
      });
      break;
    case "freeBobKid" :
      createInputButtonWithCallback(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, ()=>{
        goNextDialog()
        if(freeBobKidHappens === false){
          freeBobKidHappens = true;
          mapData[2].npcOnMap.splice(0, 1)
          launchNpcDialog(mapData[1].npcOnMap[2])
          mapData[1].map.objectLayer[23][6] = 97;
          mapData[1].map.objectLayer[23][7] = 96;
          let numberNpc = addNpcToMap(10, [6, 20], 'dialog', [1, 0], 'idle', true, 1)
          mapData[1].npcOnMap[numberNpc-1].nextCase = searchPath(mapData[1].npcOnMap[numberNpc-1].pos, [10, 21], mapData[1].map.objectLayer);
        }
      });
      break ;
    default :
      throw new Error("State isn't defined or doesn't exist")
  }
}



const setQuestState = (dialog) => {
  dialog.state = "Normal";
  switch(dialog.type)
  {
    case "fight" :
      if(dialog.fight !== undefined) dialog.state = "Fight";
      break;
    case "quest" :
      if(dialog.questIsGived === true) {

        dialog.state = "GivedQuest"
        if(checkQuestIsFinish(questData[dialog.quest]) === true) dialog.state = "Reward";

      }else if(dialog.questIsGived === false)
      {
        dialog.state = "HaveQuestToGive"
      }
      break;
    case "returnOnTheSpaceShip" :
      dialog.state = "returnOnTheSpaceShip"
      break;
    case "finishTheGame" :
      dialog.state = "finishTheGame";
      break;
    case "launchSalatonion" :
      dialog.state = "launchSalatonion";
      break;
    case "launchEnd" :
      dialog.state = "launchEnd";
      break;
    case "appearBobAfterFight" :
      dialog.state = "appearBobAfterFight";
      break;
    case "freeBobKid" :
      dialog.state = "freeBobKid";
      break;
  }

}

//#endregion

//#region // * Dialog UI Effect Region

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
  if(dialogTextIndex >= textToDelay.length) dialogTextIndex = textToDelay.length; 
  
  return textToDelay.substr(0, Math.floor(dialogTextIndex));
}

//#endregion
