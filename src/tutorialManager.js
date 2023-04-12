
const showTutorial = () => {
    switch(tutorialManagerState)
    {
        case TutorialManagerStateEnum.Normal:
            break;
        case TutorialManagerStateEnum.KeyBoardTuto :
            showTutorialKeyBoard();
            break;
        default :
            break;
    }
}

const showTutorialKeyBoard = () => {
    playerCanMove = false;
    console.log("Show that")
    fill(0, 180)
    noStroke()

    rect(0, 0, window.innerWidth, window.innerHeight *0.72+0.2)
    rect(0, window.innerHeight *0.72, window.innerWidth * 0.8, window.innerHeight *0.33)

    if (keyIsDown(68)) keyBoardTested[0] = true;
    if (keyIsDown(81)) keyBoardTested[1] = true;
    if(keyIsDown(90)) keyBoardTested[2] = true;
    if(keyIsDown(83)) keyBoardTested[3] = true;

    noFill();

    showTutorialText("Here are the key for the movement and the interaction for the player, test every key !")
    let countTest = 0
    for(let i = 0; i < keyBoardTested.length; i++)
    {
        if(keyBoardTested[i] === false) countTest++;
    }
    if(countTest === 0)
    {
        showExitTutorialText();
    }
}

const showTutorialText = (textTutorial) => {
    textAlign(CENTER, CENTER)
    let sizeBox = [750, 750/5]
    let position = [window.innerWidth / 2 - sizeBox[0] / 2, window.innerHeight / 2 - sizeBox[1] / 2]
    fill(255, 255, 255)
    image(uiData[18].image, position[0], position[1], sizeBox[0], sizeBox[1])
    let paddingText = 20
    text(textTutorial, position[0]+paddingText, position[1], sizeBox[0]-paddingText, sizeBox[1])
    textAlign(LEFT, LEFT)
}

const showExitTutorialText = () => {
    textAlign(CENTER, CENTER)
    let sizeBox = [500, 500/5]
    let position = [window.innerWidth / 2 - sizeBox[0] / 2, window.innerHeight / 2 + sizeBox[1]]
    image(uiData[18].image, position[0], position[1], sizeBox[0], sizeBox[1])
    text("Finish tutorial", position[0], position[1], sizeBox[0], sizeBox[1])
    createInputButtonWithCallback(position[0], position[1], sizeBox[0], sizeBox[1], exitTutorial)
    textAlign(LEFT, LEFT)
}

const exitTutorial = () => {
    playerCanMove = true;
    tutorialManagerState = TutorialManagerStateEnum.Normal;
}