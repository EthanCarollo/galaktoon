
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
            showTutorialText("This is the informations of the player and the enemy, at the left it's you and on the right it's the enemy!");
            showEndTutorialWithCallback(() => tutorialStep++);
            break;
        case 1 :
            rect(0, 200, window.innerWidth, window.innerHeight)
            rect(500, 0, window.innerWidth-1000, 200.0001)
            showTutorialText("The first bar on the top (in red) is the health bar! The second one is the moovement point bar and the third is the ability point bar!");
            showEndTutorialWithCallback(() => tutorialStep++);
            break;
        case 2 :
            let offSetPositionCard = (window.innerHeight - abilityPosition[1].y)
            rect(0, 0, window.innerWidth, window.innerHeight - 150 - offSetPositionCard) // Big rect

            let widthCard = 580-offSetPositionCard/2;
            rect(window.innerWidth-widthCard, window.innerHeight - 150 - offSetPositionCard-0.1, widthCard, 800) // right
            rect(0, window.innerHeight - 150 - offSetPositionCard-0.1, widthCard, 800) // left

            textSize(16);

            showTutorialText("Here is your abiltiies! it is represented by cards. Hover them with your mouse to reveal them! If you click on them, it will show you the attack zone of the attack! Click on the first card to selected it.", 150);
            break;
        case 3 :
            let sizeRect3 = 250;
            let offSetY = 135;
            rect(0, 0, window.innerWidth/2-sizeRect3/2, window.innerHeight) // Border left
            rect(window.innerWidth/2+sizeRect3/2, 0, window.innerWidth/2, window.innerHeight) // Border right

            rect(window.innerWidth/2-sizeRect3/2,0-offSetY,sizeRect3,window.innerHeight/2-sizeRect3/2) // top
            rect(window.innerWidth/2-sizeRect3/2,window.innerHeight/2+sizeRect3/2-offSetY,sizeRect3,window.innerHeight) // bot
            if (mouseIsPressed === true) attackInputInSecondEngine();
            showTutorialText("Once the ability is selected, you just need to use it on the enemy!", -160);
            break;
        case 4 :
            let sizeRect = 250;
            rect(0, 0, window.innerWidth/2-sizeRect/2, window.innerHeight) // Border left
            rect(window.innerWidth/2+sizeRect/2, 0, window.innerWidth/2, window.innerHeight) // Border right
    
            rect(window.innerWidth/2-sizeRect/2,0,sizeRect,window.innerHeight/2-sizeRect/2) // top
            rect(window.innerWidth/2-sizeRect/2,window.innerHeight/2+sizeRect/2,sizeRect,window.innerHeight/2-sizeRect/2) // bot
    
    
            if (mouseIsPressed === true) mooveInputInSecondEngine();
            showTutorialText("If you click on Void, you can see where you can moove and you are now in moovement state!", 260);
            break;
        case 5 :
            if (mouseIsPressed === true) mooveInputInSecondEngine();
            showTutorialText("Now, you just have to moove on the map by clicking on a blue colored tile!", 300);
            break;
        case 6 : 
            rect(0, 0, window.innerWidth, window.innerHeight *0.72+0.2)
            rect(0, window.innerHeight *0.72, window.innerWidth * 0.8, window.innerHeight *0.33)
            showTutorialText("The tutorial fight is now finish, you can have fun in the game now! Finish your turn by clicking on the next turn button!", -200);
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
    if(tutorialManagerState === TutorialManagerStateEnum.EngineTwoTutorial)
    {
        switch(event){
            case "selected0" :
                if(tutorialStep === 2) tutorialStep++; break;
            case "attacked" :
                if(tutorialStep === 3) tutorialStep++; break;
            case "selectedMoove" :
                if(tutorialStep === 4) tutorialStep++; break;
            case "mooved" :
                if(tutorialStep === 5) tutorialStep++; break;
            case "nextTurn" : 
                if(tutorialStep === 6) tutorialStep++; break;
        }
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
    textSize(22)
    showTutorialText("Here are the key for the movement and the interaction for the player, test every key!")
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