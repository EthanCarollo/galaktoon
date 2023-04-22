

const runStoryBoard = () => {
    imageMode(CENTER)
    background(20 ,255);
    let imageStoryBoardToClip = uiData[storyBoardId].image;
    for(let i = 0; i < 3; i++)
    {
        let storyBoard = imageStoryBoardToClip.get(400*i, 0, 400, 800);
        tint(255,storyBoardOpacity[i])
        image(storyBoard,window.innerWidth / 2 - 500 + 500*i, window.innerHeight / 2 - (255 - storyBoardOpacity[i]), 400, 800)
    }
    updateOpacityStoryBoard();
    imageMode(CORNER)
    noTint();
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
    text("Finish Story", xStart, yStart, width, height)
    textAlign(TOP, LEFT);
    createInputButtonWithCallback(xStart, yStart, width, height, endStoryBoard)
    
}



const endStoryBoard = () => {
    engineOneState = EngineOneStateEnum.Playing; 
    resetOpacityStoryBoard();
}





//#region // * Opacity Story Board region
const updateOpacityStoryBoard = () => {
    for(let i = 0; i < storyBoardOpacity.length; i++)
    {
        if(storyBoardOpacity[i] < 255){ 
            console.log(storyBoardOpacity[i])
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