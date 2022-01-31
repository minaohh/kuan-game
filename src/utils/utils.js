import db from '../data/db.json';
import words from '../data/wod.json';
import { GAME_STATUS, LANG_CEBUANO } from './constants';

export const GAME_MODE = {
  language: LANG_CEBUANO,
  length: 5,
};

const letterCountInit = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
  f: 0,
  g: 0,
  h: 0,
  i: 0,
  j: 0,
  k: 0,
  l: 0,
  m: 0,
  n: 0,
  o: 0,
  p: 0,
  q: 0,
  r: 0,
  s: 0,
  t: 0,
  u: 0,
  v: 0,
  w: 0,
  x: 0,
  y: 0,
  z: 0,
};

export const keyboardStateInit = {
  a: 'none',
  b: 'none',
  c: 'none',
  d: 'none',
  e: 'none',
  f: 'none',
  g: 'none',
  h: 'none',
  i: 'none',
  j: 'none',
  k: 'none',
  l: 'none',
  m: 'none',
  n: 'none',
  o: 'none',
  p: 'none',
  q: 'none',
  r: 'none',
  s: 'none',
  t: 'none',
  u: 'none',
  v: 'none',
  w: 'none',
  x: 'none',
  y: 'none',
  z: 'none',
};

// Returns the word of the day in the chosen language (string)
export const getWordOfTheDay = (mode = GAME_MODE) => {
  let today = formatDate(new Date());
  // return 'ngano';
  return words[today][mode.language];
};

// Check if the word is in the dictionary
// Returns true if valid, false otherwise
export const isWordValid = (guess, mode = GAME_MODE) => {
  guess = guess.toLowerCase();
  return db[mode.language][mode.length].includes(guess);
};

// Checks if the user's guess is correct
// Returns an array: absent - grey, present - yellow, correct - green
export const checkWord = (word, mode = GAME_MODE) => {
  word = word.toLowerCase();
  const ans = getWordOfTheDay().split('');
  const guess = word.split('');
  let res = ['', '', '', '', ''];
  let letters = lettersCount();

  // Check green first so there's no duplicates
  guess.forEach((val, i) => {
    if (val === ans[i] && letters[val] > 0) {
      res[i] = 'correct';
      letters[val]--;
    }
  });

  // Check the rest
  guess.forEach((val, i) => {
    if (res[i] != 'correct') {
      if (ans.includes(val) && letters[val] > 0) {
        res[i] = 'present';
        letters[val]--;
      } else {
        res[i] = 'absent';
      }
    }
  });

  return res;
};

// guess: string, guessResult: []
// Returns an object of letters containing the key state: (none, abs, pres, cor)
export const getKeyboardState = (
  guess,
  guessResult,
  keyboard = keyboardStateInit,
  mode = GAME_MODE
) => {
  if (guess && guessResult) {
    let guessArr = guess.toLowerCase().split('');

    guessArr.forEach((g, idx) => {
      if (keyboard[g] !== 'correct') {
        keyboard[g] = guessResult[idx];
      }
    });
  }

  return keyboard;
};

// Returns an object with the occurrences of each letter
export const lettersCount = (word = getWordOfTheDay(), mode = GAME_MODE) => {
  let letters = letterCountInit;
  // let word = getWordOfTheDay();

  [...word].forEach((c) => {
    letters[c]++;
  });

  return letters;
};

export const calculateTimeLeft = () => {
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay.setHours(0);
  nextDay.setMinutes(0);
  nextDay.setSeconds(0);
  let difference = nextDay - new Date();

  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

// Formats date to yyyy-MM-dd
export const formatDate = (date) => date.toISOString().slice(0, 10);

// Returns the link of the correct word
export const getWordDictLink = (wod = getWordOfTheDay(), mode = GAME_MODE) => {
  // e.g. https://cebuano.pinoydictionary.com/word/sayaw/
  return `https://${mode.language}.pinoydictionary.com/word/${wod}/`;
};

export const checkGameStatus = (guess, rowIndex, wod, mode = GAME_MODE) => {
  // console.log('guess', answer);
  // console.log('stat', answer.toLowerCase() === wod.toLowerCase());

  return guess.toLowerCase() === wod.toLowerCase()
    ? GAME_STATUS.WIN
    : rowIndex < mode.length + 1
    ? GAME_STATUS.IN_PROGRESS
    : GAME_STATUS.LOSE;
};
