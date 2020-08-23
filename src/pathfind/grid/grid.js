import React,{Component} from 'react'
import './grid.css'
import Node from "./node/node"

import Dijkstra from "../algo/dijkstra"

const ROW = 26
const COL = 70
const START_NODE_ROW = 12
const START_NODE_COL = 20
const FINISH_NODE_ROW = 12
const FINISH_NODE_COL = 50

export default class Gird extends Component{
    constructor(){
        super ()
        this.state = {
            grid:[]
        }
    }


    componentDidMount(){
        const grid = this.createGrid(ROW, COL);
        this.setState({grid});
    }

    // Create the whole grid
    createGrid = (row, col) => {
        const grid = [];
        for(let i = 0 ; i < row ; i++){
            const row = [];
            for(let j = 0 ; j < col ; j++){
                row.push(this.createNode(i, j));
            }
            grid.push(row);
        }
        return grid;
    }

    // Create each node inside the grid
    createNode = (i, j) => {
        return{
            row: i,
            col: j,
            isStart: i === START_NODE_ROW && j === START_NODE_COL,
            isFinish: i === FINISH_NODE_ROW && j === FINISH_NODE_COL,
            isVisit: false,
        }
    }

    getDijkstra(){
        const{grid} = this.state
        const startNode = grid[START_NODE_ROW][START_NODE_COL]
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
        const dijkstra = Dijkstra(grid, startNode, finishNode)
        this.animateDijkstra(dijkstra[0],dijkstra[1])
        // this.animatePath(dijkstra[1])
    }

    animateDijkstra(dijkstraOrder,pathOrder){
        for (let i = 0; i< dijkstraOrder.length; i++){
            if(i === dijkstraOrder.length -1){
                setTimeout(() => {
                    this.animatePath(pathOrder)
                }, 5*i);
                console.log(1)
            }
            setTimeout(() => {
                const node = dijkstraOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).classList.add('isVisit');
            }, 5*i);
            console.log(0)
        }
    }

    animatePath(pathOrder){
        let last;
        for (let i = 0; i< pathOrder.length; i++){
            setTimeout(() => {
                const node = pathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).classList.add('isPath','isStart');
                if (i!==0) {
                    last.classList.remove("isStart");
                }
                last = document.getElementById(`node-${node.row}-${node.col}`)
            }, 15*i);
        }
    }



    render(){
        const{grid} = this.state
        return(
            <>
                <button onClick={() => this.getDijkstra()}>Dijkstra</button>
                <button>AStar</button>
                <table>
                    <tbody>
                        {grid.map((row,rowIndex) => {
                            return(
                                <tr key={rowIndex}>
                                    {row.map((node,nodeIndex)=>{
                                        const{
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
