import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

function App() {
  const [score, setScore] = useState(0)
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord("hello");
      const scr=localStorage.getItem("score");
      if(scr)setScore(parseInt(scr));
    });
  }, []);

  const onEnter = () => {
    if (currAttempt.letter !== correctWord.length) return;

    let currWord = "";
    for (let i = 0; i < correctWord.length; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    if (currWord.toLowerCase() === correctWord.toLowerCase()) {
      setGameOver({ gameOver: true, guessedWord: true });
      setScore(score+1);
      console.log(typeof score);
      localStorage.setItem("score",score+1);
      return;
    }
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onSelectLetter = (key) => {
    if (currAttempt.letter > correctWord.length) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle  Score={score}</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          setDisabledLetters,
          disabledLetters,
          gameOver,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;