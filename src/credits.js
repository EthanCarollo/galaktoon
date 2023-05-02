
let startCredits = 0;
let opacityCredits = 0;
let opacityTextCredits = 0;
let easeInOpacity = true;
let creditsText = "Designers \nJeremy Berthet\nLouane Chatel\nBillie-Lou Azzano\n\nDevelopper \nEthan CAROLLO"

const showCredits = () => {

    startCredits += 1;
    background(0, 0, 0, opacityCredits)
    fill(255, 255, 255, opacityTextCredits)

    if(opacityTextCredits < 0)
    {
        showRestartButton();
        return;
    }

    if(easeInOpacity === true) {
        opacityCredits ++;
        opacityTextCredits ++;
        if(opacityCredits >= 350) setTimeout(() => {
            easeInOpacity = false;
        }, 1500);
        textAlign(CENTER, CENTER)
        textSize(32)
        text(creditsText, 0, 0, window.innerWidth, window.innerHeight)
        textAlign(LEFT, TOP)
    }else{
        opacityTextCredits --;
        textAlign(CENTER, CENTER)
        textSize(32)
        text("Thank you!", 0, 0, window.innerWidth, window.innerHeight)
        textAlign(LEFT, TOP)
    }
}

const showRestartButton = () => {
    let width = 500;
    let height = width / 5;
    let xStart = window.innerWidth / 2 - width / 2;
    let yStart = window.innerHeight / 2 - height / 2;
    image(uiData[18].image, xStart, yStart, width, height)
    if(mouseIsHover(xStart, yStart, width, height) === true)
    {
        image(uiData[27].image, xStart, yStart, width, height)
    }
    fill(255, 255, 255)
    textAlign(CENTER, CENTER);
    textSize(20);
    text("RESTART GAME", xStart, yStart, width, height)
    textAlign(TOP, LEFT);
    createInputButtonWithCallback(xStart, yStart, width, height, restartGame)
    
}

const restartGame = () => {
    window.location.reload();
}