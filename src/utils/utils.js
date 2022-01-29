import db from '../data/db.json';
import words from '../data/wod.json';
import { LANG_BISAYA } from './constants';

export const GAME_MODE = {
  language: LANG_BISAYA,
  length: 5,
};

// Returns the word of the day in the chosen language (string)
export const getWordOfTheDay = (mode = GAME_MODE) => {
  let today = formatDate(new Date());
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
  const ans = getWordOfTheDay(mode).split('');
  const guess = word.split('');
  let res = [];
  let code = '';

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === ans[i]) {
      code = 'correct';
    } else if (ans.includes(guess[i])) {
      code = 'present';
    } else {
      code = 'absent';
    }

    res.push(code);
  }

  return res;
};

// Formats date to yyyy-MM-dd
export const formatDate = (date) => date.toISOString().slice(0, 10);
