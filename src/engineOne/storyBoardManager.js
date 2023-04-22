

const runStoryBoard = () => {
    imageMode(CENTER)
    textAlign(CENTER, CENTER)
    background(20 ,255);
    let imageStoryBoardToClip = uiData[DifferentListStory[currentStoryBoard].id].image;
    for(let i = 0; i < 3; i++)
    {
        let storyBoard = imageStoryBoardToClip.get(400*i, 0, 400, 800);
        tint(255,storyBoardOpacity[i])
        let position = [window.innerWidth / 2 - 500 + 500*i, window.innerHeight / 2 - (255 - storyBoardOpacity[i])]
        image(storyBoard, position[0], position[1], 400, 800)
        fill(255, storyBoardOpacity[i])
        showStoryBoardText(i, position)
    }
    updateOpacityStoryBoard();
    imageMode(CORNER)
    textAlign(LEFT, TOP)
    noTint(); noFill();
    if(areAllStoryBoardIsOnTheScreen() === true) showButtonEndStoryBoard();
}



const showButtonEndStoryBoard = () => {
    let width = 500;
    let height = width / 5;
    let xStart = window.innerWidth / 2 - width / 2;
    let yStart = window.innerHeight - height * 1.5;
    image(uiData[18].image, xStart, yStart, width, height)
    if(mouseIsHover(xStart, yStart, width, height) === true)
    {
        image(uiData[27].image, xStart, yStart, width, height)
    }
    fill(255, 255, 255)
    textAlign(CENTER, CENTER);
    textSize(28);
    text("Continue...", xStart, yStart, width, height)
    textAlign(TOP, LEFT);
    createInputButtonWithCallback(xStart, yStart, width, height, endStoryBoard)
    
}



const endStoryBoard = () => {
    engineOneState = EngineOneStateEnum.Playing; 
    playerCanMove = true;
    resetOpacityStoryBoard();
}


/**
 * @param {int} index index of the stories
 * @param {array[int]} position [x, y] position of the storyboard 
 */
const showStoryBoardText = (index, position) => {
    textSize(16)
    let yOverflow = position[1]+300;
    if(index === 1) yOverflow = position[1]-300;
    let textToShow = DifferentListStory[currentStoryBoard].text[index]
    image(uiData[22].image, position[0], yOverflow, 350, 80)
    text(textToShow, position[0]-170, yOverflow-50, 340, 100)
}

//#region // * Opacity Story Board region
const updateOpacityStoryBoard = () => {
    for(let i = 0; i < storyBoardOpacity.length; i++)
    {
        if(storyBoardOpacity[i] < 255){ 
            storyBoardOpacity[i] = lerp(storyBoardOpacity[i], 255.1, 0.075);
            break;
        }
    }
}

const areAllStoryBoardIsOnTheScreen = () => {
    let count = 0;
    for(let i = 0; i < storyBoardOpacity.length; i++)
    {
        if(storyBoardOpacity[i] >= 255) count++;
    }
    return count === 3;
}

const resetOpacityStoryBoard = () => {
    for(let i = 0; i < storyBoardOpacity.length; i++)
    {
        storyBoardOpacity[i] = 0
    }
}
//#endregion