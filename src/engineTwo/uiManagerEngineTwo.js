const displayEngineTwoUI = () => {
    displayDebug();
}

const displayDebug = () => {
    fill(255,0,0,100)
    text("Actual turn is " + whichEntityTurn, 0, 0)
    noFill()
    displayAbility()
}

const displayAbility = () => {
    let size = 100;
    fill(0,0,255,100)
    for(let i = 0; i < playerTeam[0].abilities.length; i ++)
    {   
        let x = 0+size*(i*1.25);
        rect(x,window.innerHeight-size,size,size)
        createInputButtonWithCallback(x, window.innerHeight-size,size,size, () => {
            selectAbility(i);
        })
    }
    noFill()
}

const selectAbility = (ability) => {
    console.log("Selected ability = " + ability);
    selectedAbility = ability;
}