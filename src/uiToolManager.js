const createInputButtonWithCallback = (xStartButton, yStartButton, sizeXButton, sizeYButton, callbackFunction = errorCallbackFunctionButton) => { // callback function is naturally an error !
    if( mouseX > xStartButton && 
        mouseY > yStartButton && 
        mouseX < xStartButton + sizeXButton && 
        mouseY < yStartButton + sizeYButton)
    {
        cursor('pointer') // Changing the cursor into a pointer if pointer is in the button
    }
    
    if( mouseX > xStartButton && 
        mouseY > yStartButton && 
        mouseX < xStartButton + sizeXButton && 
        mouseY < yStartButton + sizeYButton && 
        mouseIsPressed === true )
    {
        canvas.mouseReleased(callbackFunction)
    }
}


const errorCallbackFunctionButton = () => {
    throw new Error("This Button doesn't have a Function ! (uiManagerEngineOne.js --> const createInputButtonWithWallback)")
}