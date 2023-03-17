import React, { useCallback, useEffect, useContext } from "react";
import { AppContext } from "../App";
import Letter from './Letter'

const Board = () => {
    const { correctWord } = useContext(AppContext);
    var nos = [];
    for (let i = 0; i < correctWord.length; i++) {
        nos.push(i);
    }
    let itemList0 = nos.map((index) => {
        return <Letter letterPos={index} attemptVal={0} />
    })
    let itemList1 = nos.map((index) => {
        return <Letter letterPos={index} attemptVal={1} />
    })
    let itemList2 = nos.map((index) => {
        return <Letter letterPos={index} attemptVal={2} />
    })
    let itemList3 = nos.map((index) => {
        return <Letter letterPos={index} attemptVal={3} />
    })
    let itemList4 = nos.map((index) => {
        return <Letter letterPos={index} attemptVal={4} />
    })
    let itemList5 = nos.map((index) => {
        return <Letter letterPos={index} attemptVal={5} />
    })

    return (
        <div className='board'>
            <div className='row'>
                {itemList0}
            </div>
            <div className='row'>
                {itemList1}
            </div>
            <div className='row'>
                {itemList2}
            </div>
            <div className='row'>
                {itemList3}
            </div>
            <div className='row'>
                {itemList4}
            </div>
            <div className='row'>
                {itemList5}
            </div>
        </div>
    )
}

export default Board