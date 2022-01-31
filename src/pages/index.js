import { useCallback, useEffect, useState } from 'react';

import Header from './component/Header';
import Keyboard from './component/Keyboard';
import Word from './component/Word';
import {
  checkWord,
  getKeyboardState,
  getWordDictLink,
  getWordOfTheDay,
  isWordValid,
} from '../utils/utils';
import { GAME_STATE_STR, GAME_STATUS } from '../utils/constants';
import toast, { Toaster } from 'react-hot-toast';

// Initial values
const INIT_BOARD_STATE = ['', '', '', '', '', ''];
const INIT_WOD = getWordOfTheDay();

const statistics = {
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

const INIT_GAME_STATE = {
  boardState: INIT_BOARD_STATE,
  evaluations: new Array(INIT_BOARD_STATE.length),
  gameStatus: GAME_STATUS.IN_PROGRESS,
  lastPlayed: new Date(),
  lastCompleted: null,
  rowIndex: 0,
  // keyboardState: getKeyboardState(),
  wod: INIT_WOD,
};

const tests = () => {
  console.log('word of the day : ', getWordOfTheDay());

  console.log('word link: ', getWordDictLink(INIT_WOD));

  // const guess = 'LIHOK'; // wod: hilom, guess: lihok, nipis
  // console.log('Guess: ', guess);
  // console.log('lettersCount: ', lettersCount());
  // console.log('is guess in dictionary? ', isWordValid(guess));

  // let result = checkWord(guess);
  // console.log('result: ', result);
  // console.log('keyboard: ', getKeyboardState(guess, result));
};

const Kuan = () => {
  // Game State
  const [gameState, setGameState] = useState(INIT_GAME_STATE);
  const [evaluations, setEvaluations] = useState(gameState.evaluations);
  const [boardState, setBoardState] = useState(gameState.boardState);
  const [gameStatus, setGameStatus] = useState(gameState.gameStatus);
  const [rowIndex, setRowIndex] = useState(gameState.rowIndex);
  const [lastPlayed, setLastPlayed] = useState(gameState.lastPlayed);
  const [lastCompleted, setLastCompleted] = useState(gameState.lastCompleted);
  const [wod, setWod] = useState(gameState.wod);
  // Stats
  const [stats, setStats] = useState(statistics);
  // Modal State
  const [showSettingsModal, setSettingsModalState] = useState(false);
  const [showStatsModal, setStatsModalState] = useState(false);
  const [showHowModal, setHowModalState] = useState(false);
  // Real-time
  const [keyboardState, setKeyboardState] = useState(getKeyboardState());
  const [guess, setGuess] = useState('');
  // Modal functions
  const toggleHowModal = () => setHowModalState(!showHowModal);
  const toggleSettingsModal = () => setSettingsModalState(!showSettingsModal);
  const toggleStatsModal = useCallback(
    () => setStatsModalState(!showStatsModal),
    [showStatsModal]
  );

  // tests();

  useEffect(() => {
    // Get user state
    const temp = window.localStorage.getItem('gameState');
    console.log('localStorage - get: ', temp);

    if (temp !== null) {
      const tempState = JSON.parse(temp);
      setGameState({ ...tempState });

      setBoardState(tempState.boardState);
      setEvaluations(tempState.evaluations);
      setGameStatus(tempState.gameStatus);
      setLastPlayed(tempState.lastPlayed);
      setLastCompleted(tempState.lastCompleted);
      setRowIndex(tempState.rowIndex);
      setWod(tempState.wod);

      // let i = 0;
      // while (boardState[i] !== '') {
      //   setKeyboardState(
      //     getKeyboardState(boardState[i], evaluations[i], keyboardState)
      //   );
      //   i++;
      // }
    }
  }, []);

  const checkGameStatus = useCallback(() => {
    return guess.toLowerCase() === wod.toLowerCase()
      ? GAME_STATUS.WIN
      : rowIndex < INIT_BOARD_STATE.length
      ? GAME_STATUS.IN_PROGRESS
      : GAME_STATUS.LOSE;
  }, [guess, rowIndex]);

  const handlePress = useCallback(
    (keyCode) => {
      if (keyCode >= 65 && keyCode <= 90) {
        // LETTERS
        if (guess.length < INIT_BOARD_STATE.length - 1) {
          const character = String.fromCharCode(keyCode);
          const letters = `${guess}${character}`;
          setGuess(letters);
        }
      } else if (keyCode === 8) {
        // BACKSPACE
        if (guess.length) {
          const letters = guess.substring(0, guess.length - 1);
          setGuess(letters);
        }
      } else if (keyCode === 13) {
        // ENTER KEY
        if (guess.length === INIT_BOARD_STATE.length - 1) {
          if (isWordValid(guess)) {
            const evaluation = checkWord(guess);
            evaluations[rowIndex] = evaluation;
            boardState[rowIndex] = guess;
            const keyboardState = getKeyboardState(
              guess,
              evaluation,
              keyboardState
            );
            setKeyboardState(keyboardState);
            setGuess('');
            setRowIndex(boardState.indexOf(''));
            setEvaluations([...evaluations]);
            setBoardState([...boardState]);
            setGameStatus(checkGameStatus());

            if (checkGameStatus() !== GAME_STATUS.IN_PROGRESS) {
              toggleStatsModal();
            }

            updateGameState();
          } else {
            toast.error('Kuan... Wala sa listahan\n(Word not on the list)');
          }
        }
      }
    },
    [
      checkGameStatus,
      evaluations,
      boardState,
      guess,
      rowIndex,
      toggleStatsModal,
      updateGameState,
    ]
  );

  const updateGameState = useCallback(() => {
    const newState = {
      ...gameState,
      boardState,
      evaluations,
      gameStatus,
      lastPlayed,
      lastCompleted,
      rowIndex,
      wod,
    };
    window.localStorage.setItem(GAME_STATE_STR, JSON.stringify(newState));
  });

  const onKeyPress = useCallback(
    (event) => {
      if (
        gameStatus === GAME_STATUS.IN_PROGRESS &&
        !showHowModal &&
        !showSettingsModal &&
        !showStatsModal
      ) {
        handlePress(event.keyCode);
      }
    },
    [gameStatus, handlePress, showHowModal, showSettingsModal, showStatsModal]
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
          gameStats={statistics}
          wordOfTheDay={wod}
        />
        <div className="space-y-1">
          {boardState.map((word, index) => (
            <Word
              key={index}
              evaluation={evaluations[index]}
              length={INIT_BOARD_STATE.length - 1}
              word={word || (index === rowIndex ? guess : '')}
            />
          ))}
        </div>
        <Keyboard
          disabled={
            gameStatus !== GAME_STATUS.IN_PROGRESS ||
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
