import React,{Component} from 'react'
import './grid.css'
import Node from "./node/node"

import Dijkstra from "../algo/dijkstra"
import Bfs from "../algo/bfs"
import AStar from "../algo/astar";

const ROW = 26
const COL = 70
const START_NODE_ROW = 5
const START_NODE_COL = 20
const FINISH_NODE_ROW = 13
const FINISH_NODE_COL = 50


export default class Gird extends Component {
    constructor() {
        super()
        this.state = {
            grid: []
        }
    }

    /**
     * @author Lin
     *
     */
    componentDidMount() {
        const grid = this.createGrid(ROW, COL);
        this.setState({grid});
    }

    createGrid = (row, col) => {
        // Create the whole grid
        const grid = [];
        for (let i = 0; i < row; i++) {
            const row = [];
            for (let j = 0; j < col; j++) {
                row.push(this.createNode(i, j));
            }
            grid.push(row);
        }
        return grid;
    }

    createNode = (i, j) => {
        // Create single node inside the grid
        return {
            row: i,
            col: j,
            isStart: i === START_NODE_ROW && j === START_NODE_COL,
            isFinish: i === FINISH_NODE_ROW && j === FINISH_NODE_COL,
            isVisit: false,
            isWater: false
        }
    }
    /**
     * @author Lin
     *
     */
    getDijkstra() {
        const {grid} = this.state
        const startNode = grid[START_NODE_ROW][START_NODE_COL]
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
        const dijkstra = Dijkstra(grid, startNode, finishNode)
        this.animateAlgo(dijkstra[0], dijkstra[1])
    }

    /**
     * @author Lin
     *
     */
    getBfs() {
        const {grid} = this.state
        const startNode = grid[START_NODE_ROW][START_NODE_COL]
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
        const bfs = Bfs(grid, startNode, finishNode)
        this.animateAlgo(bfs[0], bfs[1])
    }

    /**
     * @author Lin
     *
     */
    getAStar() {
        const {grid} = this.state
        const startNode = grid[START_NODE_ROW][START_NODE_COL]
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
        const aStar = AStar(grid, startNode, finishNode)
        this.animateAlgo(aStar[0], aStar[1])
    }

    animateAlgo(algoOrder, pathOrder) {
        for (let i = 0; i < algoOrder.length; i++) {
            if (i === algoOrder.length - 1) {
                setTimeout(() => {
                    this.animatePath(pathOrder)
                }, 5 * i);
            }
            setTimeout(() => {
                const node = algoOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).classList.add('isVisitAnimate');
            }, 5 * i);
        }
    }

    animatePath(pathOrder) {
        let last;
        for (let i = 0; i < pathOrder.length; i++) {
            setTimeout(() => {
                const node = pathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).classList.add('isPath', 'isStart');
                if (i !== 0) {
                    last.classList.remove("isStart");
                }
                last = document.getElementById(`node-${node.row}-${node.col}`)
            }, 15 * i);
        }
    }


    render() {
        const {grid} = this.state
        return (
            <>
                <button onClick={() => this.getDijkstra()}>Dijkstra</button>
                <button onClick={() => this.getBfs()}>Bfs</button>
                <button onClick={() => this.getAStar()}>AStar</button>
                <table>
                    <tbody>
                    {grid.map((row, rowIndex) => {
                        return (
                            <tr key={rowIndex}>
                                {row.map((node, nodeIndex) => {
                                    const {
                                        row,
                                        col,
                                        isStart,
                                        isFinish,
                                        isVisit
                                    } = node;
                                    return (
                                        <Node
                                            key={nodeIndex}
                                            row={row}
                                            col={col}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isVisit={isVisit}
                                        />
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </>
        )
    }
}
