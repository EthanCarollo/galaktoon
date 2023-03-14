const isAMovableCase = (x, y) => {
    for(let i = 0; i < canMoveCase.length; i++)
    {
        if(x === canMoveCase[i][0] && y === canMoveCase[i][1])
        {
            return true
        }
    }
    return false
}
const resetMovableCase = () => {
    canMoveCase = [];
}