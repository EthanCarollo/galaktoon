const launchNpcDialog = (npc) => {

    npcInteractedData = npcData[npc.id]
  
    if(npcInteractedData.dialogs !== undefined)
    {
      console.log("launch a dialog")
      console.log(npc)
      console.log(npcInteractedData)
      npcDialoged = npcInteractedData
    }else{
      console.log("no dialog disponible")
    }
  }


const displayDialogNpc = (npcDialoged) => {
    textAlign(LEFT, TOP);
  
    backgroundTransitionEffect();
  
    playerState = "dialoging"
  
    let dialogBox = uiData[11].image;
  
    let sizeYDialog = 250;
    let sizeXDialog = 1250;
    let xStartDialog = (window.innerWidth /2) - (sizeXDialog/2);
    let yStartDialog = window.innerHeight - sizeYDialog;
  
    showNpcSpriteInDialog(npcDialoged);
  
    fill(0, 0, 0);
    let box = image(dialogBox, xStartDialog, yStartDialog, sizeXDialog, sizeYDialog)
    textSize(24);
  
    let paddingXText = 125;
    let paddingYText = 80;
    let paddingSizeXBox = paddingXText*2;
    let paddingSizeYBox = paddingYText*2;
  
    let actualDialogNpc = creatingStringWithDelay(npcDialoged.dialogs[actualDialog].text);
  
    text(actualDialogNpc, xStartDialog +paddingXText, yStartDialog+paddingYText, sizeXDialog-paddingSizeXBox, sizeYDialog-paddingSizeYBox);

    if(npcDialoged.dialogs[actualDialog].quest === undefined || npcDialoged.dialogs[actualDialog].questIsGived === true){
        console.log(npcDialoged.dialogs[actualDialog])
        createInputButtonWithCallback(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, goNextDialog);
    }else{
        showDialogChoiceBox(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, npcDialoged.dialogs[actualDialog])
    }
  
  }

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
const creatingStringWithDelay = (string) => {
    if(dialogTextIndex < string.length)
    {
      dialogTextIndex += 0.3;
    }
    return string.substr(0, Math.floor(dialogTextIndex));
  }

  // ! Dialog Effect

  // Dialog Component

const showDialogChoiceBox = (xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, quest) => {
    
    textSize(18);
    textAlign(CENTER, CENTER);
    
    let sizeYChoice = sizeYDialog / 2.4;
    let sizeXChoice = sizeXDialog / 2.4;
    let paddingXChoice = 100;
    let paddingYChoice = 95;

    let dialogBox = uiData[11].image;
    let xBoxTrue = xStartDialog + paddingXChoice;
    let boxChoiceTrue = image(dialogBox, xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
    text("Accept", xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)

    createInputButtonWithCallback(xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, 
        () => {
            quest.questIsGived = true;
            addQuestToList(quest.quest)
            goNextDialog();
        });

    let xBoxFalse = xStartDialog + sizeXDialog - sizeXChoice - paddingXChoice;
    let boxChoiceFalse = image(dialogBox, xBoxFalse, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
    text("Refuse", xBoxFalse, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)

    createInputButtonWithCallback(xBoxFalse, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, 
        () => {
            goNextDialog();
        });
  }
  
const showNpcSpriteInDialog = (npcDialoged) => {
    let sizeSpriteDialog = 450;
  
    let xSprite1 = window.innerWidth - (sizeSpriteDialog * 1);
    let xSprite2 = 0;
  
    let ySprite = window.innerHeight - sizeSpriteDialog / 1.2;
    
    let spritePlayerAnimate = spritesData[0].image.get(0,0,30,30)
    let spriteNpcAnimate = spritesData[npcDialoged.spriteId].image.get(0,0,30,30)
    let spritePres1 = image(spriteNpcAnimate, xSprite1, ySprite, sizeSpriteDialog, sizeSpriteDialog)
    let spritePres2 = image(spritePlayerAnimate, xSprite2, ySprite, sizeSpriteDialog, sizeSpriteDialog)
  }

  // Dialog Component
  
  // ? Dialog Logic

const goNextDialog = () => {
    dialogTextIndex = 0;
    actualDialog++;

    if(actualDialog >= npcDialoged.dialogs.length){
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