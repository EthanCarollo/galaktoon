
const showTutorial = () => {
    switch(tutorialManagerState)
    {
        case TutorialManagerStateEnum.Normal:
            break;
        case TutorialManagerStateEnum.KeyBoardTuto :
            showTutorialKeyBoard();
            break;
        case TutorialManagerStateEnum.EngineTwoTutorial :
            showTutorialEngineTwo();
            break;
        default :
            break;
    }
}

const showTutorialEngineTwo = () => {
    noStroke()
    fill(0, 180)
    textSize(18);
    switch(tutorialStep){
        case 0 :
            rect(0, 200, window.innerWidth, window.innerHeight)
            rect(500, 0, window.innerWidth-1000, 200.0001)
            showTutorialText("This is the informations of the player and the enemy, at the left it's you and on the right it's the enemy !")
            showEndTutorialWithCallback(() => tutorialStep++);
            break;
        case 1 :
            let offSetPositionCard = (window.innerHeight - abilityPosition[1].y)
            rect(0, 0, window.innerWidth, window.innerHeight - 150 - offSetPositionCard) // Big rect

            let widthCard = 580-offSetPositionCard/2;
            rect(window.innerWidth-widthCard, window.innerHeight - 150 - offSetPositionCard-0.1, widthCard, 800) // right
            rect(0, window.innerHeight - 150 - offSetPositionCard-0.1, widthCard, 800) // left

            textSize(16);

            showTutorialText("Here is your abiltiies ! it is represented by cards. Hover them with your mouse to reveal them ! If you click on them, it will show you the attack zone of the attack !", 250);
            showEndTutorialWithCallback(() => tutorialStep++, 250);
            break;
    }

}



const showTutorialKeyBoard = () => {
    playerCanMove = false;
    fill(0, 180)
    noStroke()

    rect(0, 0, window.innerWidth, window.innerHeight *0.72+0.2)
    rect(0, window.innerHeight *0.72, window.innerWidth * 0.8, window.innerHeight *0.33)

    if (keyIsDown(68)) keyBoardTested[0] = true;
    if (keyIsDown(81)) keyBoardTested[1] = true;
    if (keyIsDown(90)) keyBoardTested[2] = true;
    if (keyIsDown(83)) keyBoardTested[3] = true;

    noFill();

    showTutorialText("Here are the key for the movement and the interaction for the player, test every key !")
    let countTest = 0
    for(let i = 0; i < keyBoardTested.length; i++)
    {
        if(keyBoardTested[i] === false) countTest++;
    }
    if(countTest === 0)
    {
        showEndTutorialWithCallback();
    }
}

const showTutorialText = (textTutorial, yOff = 0) => {
    textAlign(CENTER, CENTER)
    let sizeBox = [750, 750/5]
    let position = [window.innerWidth / 2 - sizeBox[0] / 2, window.innerHeight / 2 - sizeBox[1] / 2 - yOff]
    fill(255, 255, 255)
    image(uiData[18].image, position[0], position[1], sizeBox[0], sizeBox[1])
    let paddingText = 20
    text(textTutorial, position[0]+paddingText, position[1], sizeBox[0]-paddingText*2, sizeBox[1])
    textAlign(LEFT, LEFT)
}

const showEndTutorialWithCallback = (callbackOnEnd = exitTutorial, yOff = 0) => {
    textAlign(CENTER, CENTER)
    let sizeBox = [500, 500/5]
    let position = [window.innerWidth / 2 - sizeBox[0] / 2, window.innerHeight / 2 + sizeBox[1] - yOff]
    image(uiData[18].image, position[0], position[1], sizeBox[0], sizeBox[1])
    text("Finish tutorial", position[0], position[1], sizeBox[0], sizeBox[1])
    createInputButtonWithCallback(position[0], position[1], sizeBox[0], sizeBox[1], callbackOnEnd)
    textAlign(LEFT, LEFT)
}

const exitTutorial = () => {
    playerCanMove = true;
    tutorialManagerState = TutorialManagerStateEnum.Normal;
}