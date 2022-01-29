import { useCallback, useEffect, useState } from 'react';

import Header from './component/Header';
import Keyboard from './component/Keyboard';
import Word from './component/Word';
import {
  checkWord,
  getWordOfTheDay,
  isWordValid,
  lettersCount,
} from '../utils/utils';

const tests = () => {
  console.log('word of the day : ', getWordOfTheDay());

  const guess = 'SILIP';
  console.log('Guess: ', guess);
  // console.log('lettersCount: ', lettersCount());
  // console.log('is guess in dictionary? ', isWordValid(guess));

  console.log('result: ', checkWord(guess));
};

const BOARD_STATE = ['', '', '', '', '', ''];

const STATISTICS = {
  currentStreak: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  guesses: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    fail: 0,
  },
  maxStreak: 0,
  winPercentage: 0,
};

const WORD_OF_THE_DAY = getWordOfTheDay();

const Kuan = () => {
  const [evaluations, setEvaluations] = useState(new Array(BOARD_STATE.length));
  const [gameBoard, setGameBoard] = useState(BOARD_STATE);
  const [guess, setGuess] = useState('');
  const [rowIndex, setRowIndex] = useState(gameBoard.indexOf(''));
  const [stats, setStats] = useState(STATISTICS);

  const onKeyPress = useCallback(
    (event) => {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        if (guess.length < BOARD_STATE.length - 1) {
          const character = String.fromCharCode(event.keyCode);
          const letters = `${guess}${character}`;
          setGuess(letters);
        }
      } else if (event.keyCode === 8) {
        if (guess.length) {
          const letters = guess.substring(0, guess.length - 1);
          setGuess(letters);
        }
      } else if (event.keyCode === 13) {
        if (guess.length === BOARD_STATE.length - 1) {
          if (isWordValid(guess)) {
            const evaluation = checkWord(guess);
            evaluations[rowIndex] = evaluation;
            gameBoard[rowIndex] = guess;
            setGuess('');
            setRowIndex(gameBoard.indexOf(''));
            setEvaluations([...evaluations]);
            setGameBoard([...gameBoard]);
          }
        }
      } else {
        event.preventDefault();
      }
    },
    [evaluations, gameBoard, guess, rowIndex]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress);

    return () => document.removeEventListener('keydown', onKeyPress);
  }, [onKeyPress]);

  return (
    <main className="container flex flex-col justify-between mx-auto w-[500px]">
      <Header />
      <div className="space-y-1 py-14">
        {gameBoard.map((word, index) => (
          <Word
            key={index}
            evaluation={evaluations[index]}
            length={BOARD_STATE.length - 1}
            word={word || (index === rowIndex ? guess : '')}
          />
        ))}
      </div>
      <Keyboard />
    </main>
  );
};

export default Kuan;
