/**
 * * Path finding a* algorithm using the map layer
 * ? Why choose a* path finding instead of another ?
 * * A* is a good choice of algorithm path finding in our case cause
 * * it's the algorithm that takes a very low performance and is very efficace
 * For more informations, check pseudo code of the a* algorithm on wikipedia : 
 * https://en.wikipedia.org/wiki/A*_search_algorithm 
 */

// ! Test function, deprecated but usefull if i need to do any test
const testPathfinding = (map = actualPlayerMap.objectLayer, start = [0, 0], end = [10, 10]) => {
    return searchPath(start, end, map) // Easy if you just wan't to test it in your console
}

/**
 * @param {array[int]} startPath [x, y] this is the position where we from
 * @param {array[int]} pathToFind [x, y] this is the position we want to reach in pur array
 * @param {array[int, int]} mapLayer map Layer on which we search to path find 
 */
const searchPath = (startPath, pathToFind, mapLayer) => {
    let pathGrid = getNodePathArray(mapLayer)

    let startNode = pathGrid[startPath[0]][startPath[1]]
    let endNode = pathGrid[pathToFind[0]][pathToFind[1]]
    if (startNode === null || endNode === null) return null; // Doing it on invalid Path 
    

    let openList = [startNode]; // This will be the list of every node we will explore
    let closedList = []; // This will be the list of every node we explored 


    startNode.gCost = 0; // Then set the start gCost to 0 cause it's the start 
    startNode.hCost = calculateDistanceCost(startNode, endNode); // Calculate the hCost by the distance Cost between

    while(openList.length > 0) // If the open list still contains some node, it will just WHILEEEEEEE
    {
        let currentNode = getLowerFCostNode(openList)
        if(currentNode === endNode) return calculatePathFromNode(endNode); // If the current node is = to the end node, then we found our path and we just need to calculate it
        

        openList.splice(openList.indexOf(currentNode), 1)
        /** 
         * Now, we just need to delete the current node from the open list cause we are 
         * actually exploring it and then push it to the closest one.
        */
        closedList.push(currentNode)

        let neighbours = getNeighbourNodeArray(currentNode, pathGrid)
        for(let i = 0; i < neighbours.length; i++)
        {

            if(closedList.includes(neighbours[i])) continue; // if the neighbour is already explored
            if(neighbours[i].isWalkable === false) continue; // if the neighbour is walkable

            // tentativeGcost is the distance from start to the neighbor through current
            let tentativeGCost = currentNode.gCost + calculateDistanceCost(currentNode, neighbours[i]); 

            if(tentativeGCost < neighbours[i].gCost) // bigger is the g cost, closer the node is from the end
            {
                // That means that this path is better than any previous one.
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

    return null; // if it returns null, that means no path exist

}

//#region // * Node Logics



/**
 * @param {object} endNode this is the end node, we will calculate our path on him
 * @returns {array[object]} this will returns an array of nodes that contains every positions 
 */
const calculatePathFromNode = (endNode) => {
    /**
     * * This function just go from the endNode and while on him for every node.cameFromNode he has, in that case,
     * * we can track our path and add it to an array that we will reverse, in javascript, the reverse() function
     * * works really weird so i do it with my own 'method'. 
     */

    let pathArray = [] 
    pathArray.push(endNode)
    let currentNode = endNode;

    while (currentNode.cameFromNode !== null)
    {
        pathArray.push(currentNode.cameFromNode)
        currentNode = currentNode.cameFromNode
    }

    // My own 'method'... 
    let pathToReturn = []
    for(let i = pathArray.length-1; i>=0; i--)
    {
        pathToReturn.push(pathArray[i]);
    }
    // TODO : Find a better way to reverse an array

    return pathToReturn;
}



/**
 * @param {object} currentNode the current node that we are looking for find neighbours
 * @param {array[object]} currentGridPathfindingNode this is an array of object (specificially, object node)
 * @returns {array[object]} returns the neighbour node array of the current node
 */
const getNeighbourNodeArray = (currentNode, currentGridPathfindingNode) => {
    let neighbourList = [];
    /**
     * * This algorithm is created in case we want to handle diagonal movement too, but in our case, 
     * * we just want to have straight movement so i just take the 4 straight directionnal neighbours
     * * of the node in the array
     */

    if(currentNode.posOnGrid[0] -1 >= 0) neighbourList.push(currentGridPathfindingNode[currentNode.posOnGrid[0] - 1][ currentNode.posOnGrid[1]]); 
    // Get left node if exists
    if(currentNode.posOnGrid[0] + 1 < currentGridPathfindingNode.length) neighbourList.push(currentGridPathfindingNode[currentNode.posOnGrid[0] + 1][ currentNode.posOnGrid[1]]); 
    // Get right node if exists
    if(currentNode.posOnGrid[1] - 1 >= 0) neighbourList.push(currentGridPathfindingNode[currentNode.posOnGrid[0]][currentNode.posOnGrid[1] -1]); 
    // Get bottom node if exists
    if(currentNode.posOnGrid[1] + 1 < currentGridPathfindingNode.length) neighbourList.push(currentGridPathfindingNode[currentNode.posOnGrid[0]][ currentNode.posOnGrid[1] +1]); 
    // Get top node if exists

    return neighbourList;
}

/**
 * 
 * @param {array[array[int]]} mapLayer the current map layer on which we are building our node grid
 * @returns {array[array[object]]} this si the 2 Dimensional array based on our mapLayer that contains every node
 */
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



/**
 * @param {int} x x of the node
 * @param {int} y y of the node
 * @param {array} mapLayer the current map layer on which we are building the node
 * @returns {object} the node of the position of the map layer
 */
const getNode = (x, y, mapLayer = null) => {
    let canWalk = true;
    if(mapLayer !== null && mapLayer[y][x] !== -1)
    {
        canWalk = false; 
        /**
         * * In my case, the canWalk is only when a case is not equal to -1
         * * But in the case of other game, it can be when the tileData of the tile selected has
         * * a collider on.
         */
    }
    return {
        posOnGrid : [x, y],
        gCost : 999999, // set node gCost to the 'maximum' lol
        hCost : 0,
        fCost : 0,
        isWalkable : canWalk,
        cameFromNode : null
    }
}



/**
 * @param {object} node this need to be a node object with g cost and f cost 
 * @returns {int} this function returns the gCost + the hCost and it is the fCost
 */
const getFCostFromNodeObject = (node) => {
    return node.gCost + node.hCost
}



/**
 * @param {array[object]} arrayNode this is the array of node object
 * @returns {object} this function just return the node with the lowest fCost (fCost is the gCost + the hCost of a node)
 */
const getLowerFCostNode = (arrayNode) => {
    let lowestFCostNode = arrayNode[0]

    for (let i = 1; i < arrayNode.length; i++) {
        if (getFCostFromNodeObject(arrayNode[i]) < getFCostFromNodeObject(lowestFCostNode)) {
            lowestFCostNode = arrayNode[i];
        }
    }

    return lowestFCostNode;
}



/**
 * All these object in parameters are Nodes, nodes is used in this a* path finding with my function getNode who generates nodes object
 * @param {object} nodeFrom the node we are coming from 
 * @param {object} nodeTo the node we are going too
 * @returns {int} the distance cost between 2 nodes
 */ 
const calculateDistanceCost = (nodeFrom, nodeTo) =>
    {
        let xDistance = Math.abs(nodeFrom.posOnGrid[0] - nodeTo.posOnGrid[0]);
        let yDistance = Math.abs(nodeFrom.posOnGrid[1] - nodeTo.posOnGrid[1]);
        let remaining = Math.abs(xDistance - yDistance);
        return Math.min(xDistance, yDistance) + MoveStraightCost * remaining;
}

//#endregion