// import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { boardDefault, generateWordSet,todaysWord } from './Words';
import { useState, createContext, useEffect } from 'react';
import GameOver from './components/GameOver';

export const AppContext = createContext();

function App() {
  const [board, setboard] = useState(boardDefault)
  const [currAttempt, setcurrAttempt] = useState({ attempt: 0, letterPos: 0 })
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([])
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false
  })
  const [correctWord, setCorrectWord] = useState("")

 
  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet)
      setCorrectWord(words.todaysWord);
    })
  }, [])


  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setboard(newBoard)
    setcurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 })

  }
  const onDelete = () => {
    if (currAttempt.letterPos === 0) return; const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setboard(newBoard)
    setcurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 })

  }
  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;
    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i]
    }
    setcurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true })
      return;
    }
    else if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false })
      return
    }
  }

  return (
    <div className="App">
      <nav>
        <h1>
          Wordle
        </h1>
      </nav>
      <AppContext.Provider value={{ board, setboard, currAttempt, setcurrAttempt, onDelete, onEnter, onSelectLetter, correctWord, disabledLetters, setDisabledLetters, gameOver, setGameOver }}>
        {/* //using app context the components inside it will have access to all the useState cases. */}
        <div className='game'>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
