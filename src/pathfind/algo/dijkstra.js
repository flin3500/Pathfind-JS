/**
 * @author Lin
 *
 * @param grid
 * @param startNode
 * @param finishNode
 */
export default function Dijkstra(grid, startNode, finishNode){
    const dijkstraOrder = [];
    // 1. get all nodeS on the grid and set all distance to Infinity
    const allNodes = getAllNodes(grid)
    // 2. set the start distance to be 0
    startNode.distance = 0
    // 3.
    while(allNodes.length >0){
        // 1. sort the allNodes list
        sortAllNodes(allNodes)
        // 2. get the closest node
        const closeNode = allNodes.shift()
        // 3. set the closest as isVisit
        closeNode.isVisit = true;
        // 4. add this node to dijkstraOrder
        dijkstraOrder.push(closeNode)
        // 5. if find the finish node, break
        if(closeNode === finishNode) break;
        // 6. update neighbors distance
        updateNeighbor(closeNode, grid)
    }
    // 4. get the path
    const finalPath = getPath(finishNode).reverse()
    // 4. return the order
    return [dijkstraOrder,finalPath]
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
 */
function updateNeighbor(node, grid){
    const neighbors = [];
    const {col, row} = node;
    if (row > 0)neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    for (const neighbor of neighbors) {
        if (neighbor.distance > node.distance + 1) {
            neighbor.distance = node.distance + 1;
            neighbor.previousNode = node;
        }
    }
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

