const createInputButtonWithCallback = (xStartButton, yStartButton, sizeXButton, sizeYButton, callbackFunction = errorCallbackFunctionButton) => { // callback function is naturally an error !
    if( mouseIsHover(xStartButton, yStartButton, sizeXButton, sizeYButton) )
    {
        cursor('pointer') // Changing the cursor into a pointer if pointer is in the button
    }
    
    if( mouseIsHover(xStartButton, yStartButton, sizeXButton, sizeYButton) && mouseIsPressed === true )
    {
        canvas.mouseReleased(callbackFunction)
    }
}

const createShowTextOnHover = (xStartButton, yStartButton, sizeXButton, sizeYButton, textToShow = "Hovered", fontSize = 16) => { // callback function is naturally an error !
    if( mouseIsHover(xStartButton, yStartButton, sizeXButton, sizeYButton) )
    {
        fill(255,255,255)

        textSize(fontSize)
        textAlign(CENTER,CENTER);

        drawingContext.shadowBlur = 10;
        drawingContext.shadowColor = 'black';

        text(textToShow, mouseX, mouseY-10)

        drawingContext.shadowBlur = 0;

    }
}

const changeFillOnHover = (xStartButton, yStartButton, sizeXButton, sizeYButton, red = 255, green = 255, blue = 255) => { // callback function is naturally an error !
    if( mouseIsHover(xStartButton, yStartButton, sizeXButton, sizeYButton) )
    {
        fill(red,green,blue)
    }
}

const mouseIsHover = (xStartButton, yStartButton, sizeXButton, sizeYButton) => mouseX > xStartButton && mouseY > yStartButton && mouseX < xStartButton + sizeXButton && mouseY < yStartButton + sizeYButton

const errorCallbackFunctionButton = () => {
    throw new Error("This Button doesn't have a Function ! (uiManagerEngineOne.js --> const createInputButtonWithWallback)")
}