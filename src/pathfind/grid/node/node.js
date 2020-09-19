import React,{Component} from 'react'
import './node.css'

/**
 * @author Lin
 *
 */
export default class Node extends Component{
    render(){
    const{
            row,
            col,
            isStart,
            isFinish,
            isVisit
        } = this.props

        return(
        <td id={`node-${row}-${col}`}
            className={
            isFinish ? 'isFinish':
            isStart ?'isStart': isVisit ?'isVisit':''}/>
        )
    }
}
