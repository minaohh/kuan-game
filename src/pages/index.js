import { useCallback, useEffect, useState } from 'react';

import Header from './component/Header';
import Keyboard from './component/Keyboard';
import Word from './component/Word';
import {
  checkWord,
  getKeyboardState,
  getWordOfTheDay,
  isWordValid,
} from '../utils/utils';
import { GAME_STATUS } from '../utils/constants';
import toast, { Toaster } from 'react-hot-toast';

const tests = () => {
  console.log('word of the day : ', getWordOfTheDay());

  const guess = 'LIHOK'; // wod: hilom, guess: lihok, nipis
  console.log('Guess: ', guess);
  // console.log('lettersCount: ', lettersCount());
  // console.log('is guess in dictionary? ', isWordValid(guess));

  let result = checkWord(guess);
  console.log('result: ', result);
  console.log('keyboard: ', getKeyboardState(guess, result));
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
  const [gameState, setGameState] = useState(GAME_STATUS.IN_PROGRESS);
  const [guess, setGuess] = useState('');
  const [keyboardState, setKeyboardState] = useState(getKeyboardState());
  const [rowIndex, setRowIndex] = useState(gameBoard.indexOf(''));
  const [showSettingsModal, setSettingsModalState] = useState(false);
  const [showHowModal, setHowModalState] = useState(false);
  const [showStatsModal, setStatsModalState] = useState(false);
  const [stats, setStats] = useState(STATISTICS);

  const toggleHowModal = () => setHowModalState(!showHowModal);
  const toggleSettingsModal = () => setSettingsModalState(!showSettingsModal);
  const toggleStatsModal = useCallback(
    () => setStatsModalState(!showStatsModal),
    [showStatsModal]
  );

  // tests();
  // console.log(gameBoard);

  const checkGameState = useCallback(() => {
    return guess.toLowerCase() === WORD_OF_THE_DAY.toLowerCase()
      ? GAME_STATUS.WIN
      : rowIndex < BOARD_STATE.length
      ? GAME_STATUS.IN_PROGRESS
      : GAME_STATUS.LOSE;
  }, [guess, rowIndex]);

  const handlePress = useCallback(
    (keyCode) => {
      if (keyCode >= 65 && keyCode <= 90) {
        if (guess.length < BOARD_STATE.length - 1) {
          const character = String.fromCharCode(keyCode);
          const letters = `${guess}${character}`;
          setGuess(letters);
        }
      } else if (keyCode === 8) {
        if (guess.length) {
          const letters = guess.substring(0, guess.length - 1);
          setGuess(letters);
        }
      } else if (keyCode === 13) {
        // enter
        if (guess.length === BOARD_STATE.length - 1) {
          if (isWordValid(guess)) {
            const evaluation = checkWord(guess);
            evaluations[rowIndex] = evaluation;
            gameBoard[rowIndex] = guess;
            const keyboardState = getKeyboardState(
              guess,
              evaluation,
              keyboardState
            );
            setKeyboardState(keyboardState);
            setGuess('');
            setRowIndex(gameBoard.indexOf(''));
            setEvaluations([...evaluations]);
            setGameBoard([...gameBoard]);
            setGameState(checkGameState());

            if (checkGameState() !== GAME_STATUS.IN_PROGRESS) {
              toggleStatsModal();
            }
          } else {
            toast.error('Kuan... Wala sa listahan\n(Word not on the list)');
          }
        }
      }
    },
    [checkGameState, evaluations, gameBoard, guess, rowIndex, toggleStatsModal]
  );

  const onKeyPress = useCallback(
    (event) => {
      if (
        gameState === GAME_STATUS.IN_PROGRESS &&
        !showHowModal &&
        !showSettingsModal &&
        !showStatsModal
      ) {
        handlePress(event.keyCode);
      }
    },
    [gameState, handlePress, showHowModal, showSettingsModal, showStatsModal]
  );

  const onPress = (keyCode) => {
    handlePress(keyCode);
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress);

    return () => document.removeEventListener('keydown', onKeyPress);
  }, [onKeyPress]);

  return (
    <>
      <Toaster position="top-left" />
      <main className="container flex flex-col justify-between mx-auto md:w-[500px] md:h-screen w-screen space-y-5">
        <Header
          showHowModal={showHowModal}
          showSettingsModal={showSettingsModal}
          showStatsModal={showStatsModal}
          toggleHowModal={toggleHowModal}
          toggleSettingsModal={toggleSettingsModal}
          toggleStatsModal={toggleStatsModal}
        />
        <div className="space-y-1">
          {gameBoard.map((word, index) => (
            <Word
              key={index}
              evaluation={evaluations[index]}
              length={BOARD_STATE.length - 1}
              word={word || (index === rowIndex ? guess : '')}
            />
          ))}
        </div>
        <Keyboard
          disabled={
            gameState !== GAME_STATUS.IN_PROGRESS ||
            showHowModal ||
            showSettingsModal ||
            showStatsModal
          }
          onPress={onPress}
          state={keyboardState}
        />
      </main>
    </>
  );
};

export default Kuan;
