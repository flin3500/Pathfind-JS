/**
 * @author Lin
 *
 * @param grid
 * @param startNode
 * @param finishNode
 */
func
export default function Bfs(grid, startNode, finishNode){
    const bfsOrder = [];
    // 1. add start node to current node list
    let curNodeList = [startNode];
    startNode.isVisit = true;
    // 2. use a count
    // let count = 0;
    // 2.
    while(curNodeList.length!==0){
        const curNode = curNodeList.shift();
        bfsOrder.push(curNode);
        if(curNode === finishNode){break}
        updateCurNodeList(curNode, grid, curNodeList);
        // count += 1
    }
    // 3. get the path
    const finalPath = getPath(finishNode).reverse()
    // 4. return the order
    return [bfsOrder,finalPath]
}

/**
 * @author Lin
 *
 * @param grid
 */
function getGirdWholeNum(grid){
    return (grid.length*grid[0].length);
}

/**
 * @author Lin
 *
 * @param node
 * @param grid
 * @param curNodeList
 */
function updateCurNodeList(node, grid, curNodeList){
    const neighbors = [];
    const {col, row} = node;
    if (row > 0 && grid[row - 1][col].isVisit === false)neighbors.push(grid[row - 1][col]);
    if (col > 0 && grid[row][col - 1].isVisit === false) neighbors.push(grid[row][col - 1]);
    if (row < grid.length - 1 && grid[row + 1][col].isVisit === false) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1 && grid[row][col + 1].isVisit === false) neighbors.push(grid[row][col + 1]);
    for (const neighbor of neighbors) {
        neighbor.previousNode = node;
        neighbor.isVisit = true;
        curNodeList.push(neighbor)
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
