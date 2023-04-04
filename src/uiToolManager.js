/**
 * 
 * @param {int} xStartButton 
 * @param {int} yStartButton 
 * @param {int} sizeXButton 
 * @param {int} sizeYButton 
 * @param {function} callbackFunction automatically set to errorCallbackFunctionButton who just send a specific error for that case
 */
const createInputButtonWithCallback = (xStartButton, yStartButton, sizeXButton, sizeYButton, callbackFunction = errorCallbackFunctionButton) => { // callback function is naturally an error !
    /**
     * * To make it works, i use mouseReleased lied to the canvas, with that i can easily do 
     * * a onMouseUp isntead of a onMouseDown and it takes much less codes !
     */
    
    if( mouseIsHover(xStartButton, yStartButton, sizeXButton, sizeYButton) )
    {
        cursor('pointer') // Changing the cursor into a pointer if pointer is in the button
    }
    
    if( mouseIsHover(xStartButton, yStartButton, sizeXButton, sizeYButton) && mouseIsPressed === true )
    {
        canvas.mouseReleased(callbackFunction)
    }
}



// ! This function is used nowhere and i don't think i will use it
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



/**
 * @param {int} xStartButton 
 * @param {int} yStartButton 
 * @param {float} sizeXButton 
 * @param {float} sizeYButton 
 * @param {int} red tint of red in rgb
 * @param {int} green tint of green in rgb
 * @param {int} blue tint of blue in rgb
 */
const changeFillOnHover = (xStartButton, yStartButton, sizeXButton, sizeYButton, red = 255, green = 255, blue = 255) => {
    if( mouseIsHover(xStartButton, yStartButton, sizeXButton, sizeYButton) )
    {
        /**
         * * Just set the color on hover a button
         */
        fill(red,green,blue)
    }
}



/**
 * 
 * @param {*} xStartButton 
 * @param {*} yStartButton 
 * @param {*} sizeXButton 
 * @param {*} sizeYButton 
 * @returns {boolean} if the player is hover or not the position and the size
 */
const mouseIsHover = (xStartButton, yStartButton, sizeXButton, sizeYButton) => mouseX > xStartButton && mouseY > yStartButton && mouseX < xStartButton + sizeXButton && mouseY < yStartButton + sizeYButton


const errorCallbackFunctionButton = () => {
    /**
     * * Default callback when we createInputButtonWithCallback
     */
    throw new Error("This Button doesn't have a Function ! (uiManagerEngineOne.js --> const createInputButtonWithWallback) Don't forget createInputButtonWithWallback takes 5 parameters")
}