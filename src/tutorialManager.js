
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
            showTutorialText(tutorialEngineTwoText[0]);
            showEndTutorialWithCallback(() => tutorialStep++);
            break;
        case 1 :
            rect(0, 200, window.innerWidth, window.innerHeight)
            rect(500, 0, window.innerWidth-1000, 200.0001)
            showTutorialText(tutorialEngineTwoText[1]);
            showEndTutorialWithCallback(() => tutorialStep++);
            break;
        case 2 :
            let offSetPositionCard = (window.innerHeight - abilityPosition[1].y)
            rect(0, 0, window.innerWidth, window.innerHeight - 150 - offSetPositionCard) // Big rect

            let widthCard = 580-offSetPositionCard/2;
            rect(window.innerWidth-widthCard, window.innerHeight - 150 - offSetPositionCard-0.1, widthCard, 800) // right
            rect(0, window.innerHeight - 150 - offSetPositionCard-0.1, widthCard, 800) // left

            textSize(16);

            showTutorialText(tutorialEngineTwoText[2], 150);
            break;
        case 3 :
            let sizeRect3 = 250;
            let offSetY = 135;
            rect(0, 0, window.innerWidth/2-sizeRect3/2, window.innerHeight) // Border left
            rect(window.innerWidth/2+sizeRect3/2, 0, window.innerWidth/2, window.innerHeight) // Border right

            rect(window.innerWidth/2-sizeRect3/2,0-offSetY,sizeRect3,window.innerHeight/2-sizeRect3/2) // top
            rect(window.innerWidth/2-sizeRect3/2,window.innerHeight/2+sizeRect3/2-offSetY,sizeRect3,window.innerHeight) // bot
            if (mouseIsPressed === true) attackInputInSecondEngine();
            showTutorialText(tutorialEngineTwoText[3], -160);
            break;
        case 4 :
            let sizeRect = 250;
            rect(0, 0, window.innerWidth/2-sizeRect/2, window.innerHeight) // Border left
            rect(window.innerWidth/2+sizeRect/2, 0, window.innerWidth/2, window.innerHeight) // Border right
    
            rect(window.innerWidth/2-sizeRect/2,0,sizeRect,window.innerHeight/2-sizeRect/2) // top
            rect(window.innerWidth/2-sizeRect/2,window.innerHeight/2+sizeRect/2,sizeRect,window.innerHeight/2-sizeRect/2) // bot
    
    
            if (mouseIsPressed === true) mooveInputInSecondEngine();
            showTutorialText(tutorialEngineTwoText[4], 260);
            break;
        case 5 :
            if (mouseIsPressed === true) mooveInputInSecondEngine();
            showTutorialText(tutorialEngineTwoText[5], 300);
            break;
        case 6 : 
            rect(0, 0, window.innerWidth, window.innerHeight *0.72+0.2)
            rect(0, window.innerHeight *0.72, window.innerWidth * 0.8, window.innerHeight *0.33)
            showTutorialText(tutorialEngineTwoText[6], -200);
            break;
        case 7 : 
            // the end case of the tutorial
            tutorialManagerState = TutorialManagerStateEnum.Normal;
            playerCanMove = true;
            tutorialStep = 0;
            engineTwoState = "Playing" 
            canInputEngineTwo = true;

    }

}



const eventOnTheTutorialEngine = (event) => {
    tutorialStep++;
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
    textSize(22)
    showTutorialText(tutorialKeyBoardText)
    let countTest = 0
    for(let i = 0; i < keyBoardTested.length; i++)
    {
        if(keyBoardTested[i] === false) countTest++;
    }
    if(countTest === 0)
    {
        showEndTutorialWithCallback(() => { exitTutorial(); keyboardIsShowing = false });
    }
}



const showTutorialText = (textTutorial, yOff = 0) => {
    textAlign(CENTER, CENTER)
    let sizeBox = [750, 750/5]
    let position = [window.innerWidth / 2 - sizeBox[0] / 2, window.innerHeight / 2 - sizeBox[1] / 2 - yOff -60]
    fill(255, 255, 255)
    image(uiData[18].image, position[0], position[1], sizeBox[0], sizeBox[1])
    let paddingText = 20
    text(textTutorial, position[0]+paddingText, position[1], sizeBox[0]-paddingText*2, sizeBox[1])
    textAlign(LEFT, LEFT)
}



const showEndTutorialWithCallback = (callbackOnEnd = exitTutorial, yOff = 0) => {
    textAlign(CENTER, CENTER)
    let sizeBox = [400, 400/5]
    let position = [window.innerWidth / 2 - sizeBox[0] / 2, window.innerHeight / 2 + sizeBox[1] - yOff -40]
    image(uiData[18].image, position[0], position[1], sizeBox[0], sizeBox[1])
    if(mouseIsHover(position[0], position[1], sizeBox[0], sizeBox[1])) image(uiData[27].image, position[0], position[1], sizeBox[0], sizeBox[1]);
    textSize(20)
    text("Continue", position[0], position[1], sizeBox[0], sizeBox[1])
    createInputButtonWithCallback(position[0], position[1], sizeBox[0], sizeBox[1], callbackOnEnd)
    textAlign(LEFT, LEFT)
}



const exitTutorial = () => {
    playerCanMove = true;
    tutorialManagerState = TutorialManagerStateEnum.Normal;
}