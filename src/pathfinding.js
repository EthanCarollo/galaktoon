/**
 * * Path finding a* algorithm using the map layer
 * * A* is a good choice of algorithm path finding in our case cause
 * * it's the algorithm that takes a very low performance
 */

const MOVE_STRAIGHT_COST = 10;
const MOVE_DIAGONAL_COST = 14;

const testPathfinding = () => {
    return searchPath([2,2], [10,10], actualPlayerMap.objectLayer)
}

/**
 * @param {array[int]} startPath x, y
 * @param {array[int]} pathToFind x, y
 * @param {array[int, int]} mapLayer map Layer on which we search to path find 
 */
const searchPath = (startPath, pathToFind, mapLayer) => {
    let pathGrid = getNodePathArray(mapLayer)

    let startNode = pathGrid[startPath[0]][startPath[1]]
    let endNode = pathGrid[pathToFind[0]][pathToFind[1]]
    if (startNode === null || endNode === null) {
        // Invalid Path
        return null;
    }

    let openList = [startNode];
    let closedList = [];

    for(let y = 0; y < pathGrid.length; y++)
    {;
        for(let x = 0; x < pathGrid[y].length; x++){ // Set all the g cost of the grid at the maximum cause the path didn't start 
            pathGrid[y][x].gCost = 999999; // 'maximum' lol
            pathGrid[y][x].cameFromNode = null; // actually, every nodes doesn't came from any node
        }
    }
    startNode.gCost = 0; // Then set the start gCost to 0 cause it's the start 
    startNode.hCost = calculateDistanceCost(startNode, endNode); // Calculate the hCost by the distance Cost between

    while(openList.length > 0)
    {
        let currentNode = getLowerFCostNode(openList)
        if(currentNode === endNode)
        {
            return calculatePathFromNode(endNode)
        }
        openList.splice(openList.indexOf(currentNode), 1)
        closedList.push(currentNode)
        let neighbours = getNeighbourNodeArray(currentNode, pathGrid)
        for(let i = 0; i < neighbours.length; i++)
        {
            if(closedList.includes(neighbours[i]))
            {
                continue;
            }
            if(neighbours[i].isWalkable === false)
            {
                continue;
            }

            let tentativeGCost = currentNode.gCost + calculateDistanceCost(currentNode, neighbours[i]);
            if(tentativeGCost < neighbours[i].gCost)
            {
                neighbours[i].cameFromNode = currentNode;
                neighbours[i].gCost = tentativeGCost;
                neighbours[i].hCost = calculateDistanceCost(neighbours[i], endNode);

                if(!openList.includes(neighbours[i]))
                {
                    openList.push(neighbours[i])
                }
            }
        }
    }

    return null;

}

//#region // * Node Logics

const calculatePathFromNode = (endNode) => {

    let pathArray = [] 
    pathArray.push(endNode)
    let currentNode = endNode;

    while (currentNode.cameFromNode !== null)
    {
        pathArray.push(currentNode.cameFromNode)
        currentNode = currentNode.cameFromNode
    }
    let pathToReturn = []
    console.log(pathArray)
    for(let i = pathArray.length-1; i>=0; i--)
    {
        pathToReturn.push(pathArray[i]);
    }
    return pathToReturn;
}

const getNeighbourNodeArray = (currentNode, currentGridPathfindingNode) => {
    let neighbourList = [];
    if(currentNode.posOnGrid[0] -1 >= 0)
    {
        neighbourList.push(currentGridPathfindingNode[currentNode.posOnGrid[0] - 1][ currentNode.posOnGrid[1]]); //  Left
    }
    if(currentNode.posOnGrid[0] + 1 < currentGridPathfindingNode.length)
    {
        neighbourList.push(currentGridPathfindingNode[currentNode.posOnGrid[0] + 1][ currentNode.posOnGrid[1]]); //  Right
    }
    if(currentNode.posOnGrid[1] - 1 >= 0) 
    {
        neighbourList.push(currentGridPathfindingNode[currentNode.posOnGrid[0]][currentNode.posOnGrid[1] -1]); // Bottom
    }
    if(currentNode.posOnGrid[1] + 1 < currentGridPathfindingNode.length) 
    {
        neighbourList.push(currentGridPathfindingNode[currentNode.posOnGrid[0]][ currentNode.posOnGrid[1] +1]); // Top
    }
    return neighbourList;
}

const getNodePathArray = (mapLayer) => {
    let arrayGridNode = new Array(mapLayer.length);
    for(let y = 0; y < arrayGridNode.length; y++)
    {
        arrayGridNode[y] = new Array(mapLayer.length);
        for(let x = 0; x < arrayGridNode[y].length; x++)
        {
            arrayGridNode[y][x] = getNode(y, x, mapLayer)
        }
    }
    return arrayGridNode;
}

const getNode = (x, y, mapLayer) => {
    let canWalk = true;
    if(mapLayer[y][x] !== -1)
    {
        canWalk = false;
    }
    return {
        posOnGrid : [x, y],
        gCost : 0,
        hCost : 0,
        fCost : 0,
        isWalkable : canWalk,
        cameFromNode : null
    }
}

const getFCostFromNodeObject = (node) => {
    return node.gCost + node.hCost
}

const getLowerFCostNode = (arrayNode) => {
    let lowestFCostNode = arrayNode[0]

    for (let i = 1; i < arrayNode.length; i++) {
        if (getFCostFromNodeObject(arrayNode[i]) < getFCostFromNodeObject(lowestFCostNode)) {
            lowestFCostNode = arrayNode[i];
        }
    }

    return lowestFCostNode;
}

const calculateDistanceCost = (nodeFrom, nodeTo) =>
    {
        let xDistance = Math.abs(nodeFrom.posOnGrid[0] - nodeTo.posOnGrid[0]);
        let yDistance = Math.abs(nodeFrom.posOnGrid[0] - nodeTo.posOnGrid[0]);
        let remaining = Math.abs(xDistance - yDistance);
        return MOVE_DIAGONAL_COST * Math.min(xDistance, yDistance) + MOVE_STRAIGHT_COST * remaining;
}

//#endregion