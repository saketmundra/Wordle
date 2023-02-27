import React, { useContext } from 'react'
import { AppContext } from '../App'

const GameOver = () => {
    const{gameOver, currAttempt,correctWord}=useContext(AppContext)
  return (
    <div className='gameOver'>
        <h3>{gameOver.guessedWord?"You correctly guessed the word":"Try Again"}</h3>
        <h1>Correct: {correctWord}</h1>
        {gameOver.guessedWord && (
            <h3> You guessed the word in {currAttempt.attempt} attempts</h3>
        )}
    </div>
  )
}

export default GameOver