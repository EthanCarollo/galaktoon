/**
 * * This is a small program usefull when we need to just show some tips.
 * * This can be used everywhere in every engine, actually it's just an optionnal
 * * features.
 * ! Features Classic Tips isn't really used in the game
 */


//#region // * Classic Tips region

// Launch part

/**
 * @param {string} newTipsToShow the text of the new tips to show 
 */
function launchTips(newTipsToShow){
    if(tipsIsActived === true) return;
    tipsToShow = newTipsToShow
    tipsIsActived = true;
    indexOfTips = 0;
} 

// Run part

const runTips = () => {
    if(tipsIsActived === true) showTips();
    if(advancedTipsIsActived === true) showAdvancedTips();
}


const showTips = () => {
    updateTipsEase();

    let widthTips = 600;
    let heightTips = widthTips/5;

    image(uiData[18].image, window.innerWidth/2-widthTips/2, 0 - 350 + indexOfTips, widthTips, heightTips);
    textAlign(CENTER, CENTER)
    textSize(16)
    fill(255,255,255)
    text(tipsToShow, window.innerWidth/2-widthTips/2, 0 - 350 + indexOfTips, widthTips, heightTips)
    textAlign(LEFT,TOP)
}


const updateTipsEase = () => {
    if(indexOfTipsEase === "in")
    {
        indexOfTips = lerp(indexOfTips,410.5,0.05)
        if(indexOfTips >= 410) setTimeout(() => {
            indexOfTipsEase = "out"; 
        }, 1500);
    }else{
        indexOfTips = lerp(indexOfTips,-0.5,0.02)
        if(indexOfTipsEase <= 0) endTips();
    }
}

// End part

const endTips = () => {
    indexOfTipsEase = "in";
    tipsIsActived = false;
    indexOfTips = 0;
}

//#endregion

//#region // * Advanced Tips Region


function launchAdvancedTips(newTipsToShow, imageToShowWithTips){
    if(advancedTipsIsActived === true) return;
    advancedImageToShow = imageToShowWithTips;
    advancedTipsToShow = newTipsToShow
    advancedTipsIsActived = true;
    indexOfAdvancedTipsEase = "in";
    indexOfAdvancedTips = 0;
}

// Run part

const showAdvancedTips = () => {
    updateAdvancedTipsEase();
    let widthTips = 400;
    let heightTips = widthTips/3;
    let ratio = advancedImageToShow.height / advancedImageToShow.width;
    if(ratio < 0) throw new Error("Ratio Image for advanced tips is not good, image must be higher in height than width, ratio : " + ratio);
    let widthImage = 140;
    let heightImage = widthImage * ratio;

    image(uiData[44].image, 25, window.innerHeight - indexOfAdvancedTips, widthTips, heightTips);
    imageMode(CENTER)
    image(advancedImageToShow, 25+widthTips-widthImage/2+widthImage/1.5, window.innerHeight - indexOfAdvancedTips+ heightTips/2, widthImage, heightImage)
    imageMode(CORNER)
    textAlign(CENTER, CENTER)
    textSize(23)
    fill(255,255,255)
    text(advancedTipsToShow, 25, window.innerHeight - indexOfAdvancedTips, widthTips, heightTips)
    textAlign(LEFT,TOP)
}


const updateAdvancedTipsEase = () => {
    let maxEaseIn = 150;
    if(indexOfAdvancedTipsEase === "in")
    {
        indexOfAdvancedTips = lerp(indexOfAdvancedTips,maxEaseIn + 0.5,0.05)
        if(indexOfAdvancedTips >= maxEaseIn) setTimeout(() => {
            indexOfAdvancedTipsEase = "out"; 
        }, 1500);
    }else{
        indexOfAdvancedTips = lerp(indexOfAdvancedTips,-50.5,0.02)
        if(indexOfAdvancedTips <= -50) endAdvancedTips();
    }
}

// End part

const endAdvancedTips = () => {
    indexOfAdvancedTipsEase = "in";
    advancedTipsIsActived = false;
    indexOfAdvancedTips = 0;
}

//#endregion