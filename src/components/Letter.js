import React, { useContext, useEffect } from 'react'
// import { boardDefault } from '../Words'
import { AppContext } from '../App'

function Letter({ letterPos, attemptVal }) {
    const { board, correctWord, currAttempt, disabledLetters, setDisabledLetters } = useContext(AppContext);
    const letter = board[attemptVal][letterPos]

    const correct = correctWord.toUpperCase()[letterPos] === letter
    const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter)

    useEffect(() => {
        if (letter !== "" && !correct && !almost) {
            setDisabledLetters((prev) => [...prev, letter])
        }
    }, [currAttempt.attempt])


    const letterState = currAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "error");
    return <div className='letter' id={letterState}>{letter}</div>

}
export default Letter