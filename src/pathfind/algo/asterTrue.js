/**
 * @author Lin
 *
 * @param grid
 * @param startNode
 * @param finishNode
 */
export default function AStar(grid, startNode, finishNode){
    const aStarOrder = [];
    let openList = [startNode];
    let closeList = [];
    setAllNodes(grid,finishNode)
    // need to sort by distance later
    startNode.distance = 0
    // need to
    startNode.g = 0
    while(openList.length >0){
        sortAllNodes(openList);
        const curNode = openList.shift();

        closeList.push(curNode)
        curNode.isVisit = true;

        aStarOrder.push(curNode)

        if(curNode === finishNode) break;
        updateOpenList(curNode, grid, openList)
    }
    const finalPath = getPath(finishNode).reverse()
    return [aStarOrder,finalPath]
}

/**
 * @author Lin
 *
 * @param grid
 * @param finalNode
 */
function setAllNodes(grid,finalNode){
    for (const row of grid) {
        for (const node of row) {
            node.g = Infinity
            // need to specify h method later, here is manhattan
            node.h = manhattanDistance(node,finalNode)
            node.distance = node.g + node.h
        }
    }
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
 * @param openList
 */
function updateOpenList(node, grid, openList){
    const neighbors = [];
    const {col, row} = node;
    if (row > 0)neighbors.push(grid[row - 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (row < grid.length - 1 ) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1 ) neighbors.push(grid[row][col + 1]);
    for (let neighbor of neighbors) {
        if(neighbor.isVisit === false){
            if(!findInList(neighbor, openList)) {
                openList.push(neighbor);
                neighbor.previousNode = node;
                neighbor.g = node.g + 1;
            }
            else{
                if(node.g + 1 < neighbor.g){
                    neighbor.previousNode = node;
                    neighbor.g = node.g + 1;
                }
            }

        }
    }
}

function manhattanDistance(node,finalNode){
    return (Math.abs(node.row - finalNode.row)+Math.abs(node.col - finalNode.col));
}

function findInList(findNode, list){
    for(let node of list){
        if(node===findNode){
            return true;
        }
    }
    return false;
}

function getPath(node){
    const finalPath = [];
    while(node){
        finalPath.push(node);
        node = node.previousNode;
    }
    return finalPath;
}

