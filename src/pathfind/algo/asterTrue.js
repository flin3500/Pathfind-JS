/**
 * @author Lin
 *
 * @param grid
 * @param startNode
 * @param finishNode
 */
export default function AStar(grid, startNode, finishNode){
    const aStarOrder = [];
    const allNodes = getAllNodes(grid);
    startNode.distance = 0
    startNode.g = 0
    while(allNodes.length >0){
        sortAllNodes(allNodes)
        const closeNode = allNodes.shift()
        aStarOrder.push(closeNode);
        if(closeNode === finishNode)break
        updateOpenList(closeNode, grid, finishNode);
    }
    console.log(aStarOrder)
    const finalPath = getPath(finishNode).reverse()
    return [aStarOrder,finalPath]
}

/**
 * @author Lin
 *
 * @param grid
 */
function getAllNodes(grid){
    const allNodeS = []
    for (const row of grid) {
        for (const node of row) {
            node.distance = Infinity
            node.g = Infinity
            allNodeS.push(node)
        }
    }
    return allNodeS
}

/**
 * @author Lin
 *
 * @param list
 */
function sortAllNodes(list){
    list.sort(compare("distance"))
}
/**
 * @author Lin
 *
 * @param property
 */
function compare(property){
    return function(obj1,obj2){
        const value1 = obj1[property];
        const value2 = obj2[property];
        return value1 - value2;
    }
}

/**
 * @author Lin
 *
 * @param node
 * @param grid
 * @param finishNode
 */
function updateOpenList(node, grid, finishNode){
    const neighbors = [];
    const {col, row} = node;
    if (row > 0 ) neighbors.push(grid[row - 1][col]);
    if (col > 0 ) neighbors.push(grid[row][col - 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    for (let neighbor of neighbors) {
        const newDistance = node.g + 1 + manhattanDistance(neighbor, finishNode)
        if (neighbor.distance > newDistance) {
            neighbor.g = node.g + 1
            neighbor.distance = newDistance;
            // test
            // document.getElementById(`node-${neighbor.row}-${neighbor.col}`).innerText = neighbor.distance;
            neighbor.previousNode = node;
        }
    }
}

/**
 * @author Lin
 *
 * @param node
 * @param finalNode
 */
function manhattanDistance(node,finalNode){
    return (Math.abs(node.row - finalNode.row)+Math.abs(node.col - finalNode.col));
}

/**
 * @author Lin
 *
 * @param node
 */
function getPath(node){
    const finalPath = [];
    while(node){
        finalPath.push(node);
        node = node.previousNode;
    }
    return finalPath;
}
