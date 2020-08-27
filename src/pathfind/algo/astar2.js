export default function Astar2(grid, startNode, finishNode){
    const aStarOrder = [];
    const allNodes = getAllNodes(grid);
    startNode.distance = 0
    while(allNodes.length > 0){
        sortAllNodes(allNodes)
        const closeNode = allNodes.shift()
        aStarOrder.push(closeNode);
        if(closeNode === finishNode)break
        updateOpenList(closeNode, grid, finishNode);
    }
    const finalPath = getPath(finishNode).reverse()
    return [aStarOrder,finalPath]
}


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

function sortAllNodes(list){
    list.sort(compare("distance"))
}
function compare(property){
    return function(obj1,obj2){
        const value1 = obj1[property];
        const value2 = obj2[property];
        return value1 - value2;
    }
}

function updateOpenList(node, grid, finishNode){
    const neighbors = [];
    const {col, row} = node;
    if (row > 0 ) neighbors.push(grid[row - 1][col]);
    if (col > 0 ) neighbors.push(grid[row][col - 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    for (let neighbor of neighbors) {
        if (neighbor.distance > node.distance + 1 + manhattanDistance(neighbor, finishNode)) {
            neighbor.distance = node.distance + 1 + manhattanDistance(neighbor, finishNode);
            neighbor.previousNode = node;
        }
    }
}

function manhattanDistance(node,finalNode){
    return (Math.abs(node.row - finalNode.row)+Math.abs(node.col - finalNode.col));
}

function getPath(node){
    const finalPath = [];
    while(node){
        finalPath.push(node);
        node = node.previousNode;
    }
    return finalPath;
}
