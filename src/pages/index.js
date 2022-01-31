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
  checkGameStatus,
  keyboardStateInit,
  loadGameState,
  saveGameState,
  formatDate,
} from '../utils/utils';
import {
  GAME_STATE_KEY,
  GAME_STATISTICS_KEY,
  GAME_STATUS,
} from '../utils/constants';
import toast, { Toaster } from 'react-hot-toast';

// Initial values
export const INIT_BOARD_STATE = ['', '', '', '', '', ''];
const INIT_WOD = getWordOfTheDay();

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

const INIT_GAME_STATE = {
  boardState: INIT_BOARD_STATE,
  evaluations: new Array(INIT_BOARD_STATE.length),
  gameStatus: GAME_STATUS.IN_PROGRESS,
  lastPlayed: null,
  lastCompleted: null,
  rowIndex: 0,
  // keyboardState: getKeyboardState(),
  wod: INIT_WOD,
};

const Kuan = () => {
  // Game State
  const [evaluations, setEvaluations] = useState(INIT_GAME_STATE.evaluations);
  const [boardState, setBoardState] = useState(INIT_GAME_STATE.boardState);
  const [gameStatus, setGameStatus] = useState(INIT_GAME_STATE.gameStatus);
  const [rowIndex, setRowIndex] = useState(INIT_GAME_STATE.rowIndex);
  const [lastPlayed, setLastPlayed] = useState(INIT_GAME_STATE.lastPlayed);
  const [lastCompleted, setLastCompleted] = useState(
    INIT_GAME_STATE.lastCompleted
  );
  const [wod, setWod] = useState(INIT_GAME_STATE.wod);
  // Stats
  const [statistics, setStatistics] = useState(STATISTICS);
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
  const toggleStatsModal = () => setStatsModalState(!showStatsModal);

  const isGameInProgress =
    gameStatus === GAME_STATUS.IN_PROGRESS &&
    !showHowModal &&
    !showSettingsModal &&
    !showStatsModal;

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
            const gameStatus = checkGameStatus(guess, rowIndex, wod);
            let lastCompletedDate = lastCompleted;
            setKeyboardState(keyboardState);
            setEvaluations([...evaluations]);
            setBoardState([...boardState]);
            setGameStatus(gameStatus);

            if (
              gameStatus !== GAME_STATUS.IN_PROGRESS ||
              rowIndex === boardState.length - 1
            ) {
              if (gameStatus === GAME_STATUS.WIN) {
                lastCompletedDate = new Date();
                statistics.guesses[`${rowIndex + 1}`]++;
                statistics.gamesWon++;
                statistics.currentStreak++;
              } else {
                statistics.currentStreak = 0;
                statistics.guesses.fail++;
              }

              statistics.gamesPlayed++;
              statistics.winPercentage = Math.floor(
                (statistics.gamesWon / statistics.gamesPlayed) * 100
              );
              saveGameState(GAME_STATISTICS_KEY, { ...statistics });
              setStatsModalState(true);
            } else {
              setRowIndex(boardState.indexOf(''));
            }

            saveGameState(GAME_STATE_KEY, {
              boardState,
              evaluations,
              gameStatus,
              lastPlayed: new Date(),
              lastCompleted: lastCompletedDate,
              rowIndex,
              wod,
            });
            setGuess('');
          } else {
            toast.error('Kuan... Wala sa listahan\n(Word not on the list)');
          }
        }
      }
    },
    [evaluations, boardState, guess, lastCompleted, statistics, rowIndex, wod]
  );

  const onKeyPress = useCallback(
    (event) => {
      if (isGameInProgress) {
        handlePress(event.keyCode);
      }
    },
    [handlePress, isGameInProgress]
  );

  const onPress = (keyCode) => {
    handlePress(keyCode);
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress);
    return () => document.removeEventListener('keydown', onKeyPress);
  }, [onKeyPress]);

  useEffect(() => {
    // Load user info from local storage
    const tempGameState = loadGameState(GAME_STATE_KEY);
    const statistics = loadGameState(GAME_STATISTICS_KEY);

    if (tempGameState !== null) {
      const storage = tempGameState;

      // Check if we need to reset (new day)
      let reset =
        storage.lastPlayed &&
        storage.lastPlayed.slice(0, 10) !== formatDate(new Date());

      setLastPlayed(storage.lastPlayed);
      setLastCompleted(storage.lastCompleted);

      if (reset) {
        // new word for a new day
        setWod(getWordOfTheDay());
      } else {
        setBoardState(storage.boardState);
        setEvaluations(storage.evaluations);

        // Game Status
        setGameStatus(storage.gameStatus);
        if (storage.gameStatus !== GAME_STATUS.IN_PROGRESS) {
          setStatsModalState(true);
        }

        const newRow = storage.rowIndex + 1;
        setRowIndex(newRow);
        setWod(storage.wod);

        // KEYBOARD STATE
        let tempKeyboard = keyboardStateInit;
        storage.boardState.forEach((val, i) => {
          if (val !== '') {
            let kbs = getKeyboardState(
              val,
              storage.evaluations[i],
              tempKeyboard
            );
            tempKeyboard = kbs;
          }
        });
        setKeyboardState(tempKeyboard);
      }
    }

    if (statistics !== null) {
      setStatistics(statistics);
    }
  }, []);

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
          gameStatus={gameStatus}
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
          disabled={!isGameInProgress}
          onPress={onPress}
          state={keyboardState}
        />
      </main>
    </>
  );
};

export default Kuan;
