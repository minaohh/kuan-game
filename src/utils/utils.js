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
  const ans = getWordOfTheDay().split('');
  const guess = word.split('');
  let res = [];
  let code = '';
  let letters = lettersCount();

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === ans[i] && letters[guess[i]] > 0) {
      code = 'correct';
      letters[guess[i]]--;
    } else if (ans.includes(guess[i]) && letters[guess[i]] > 0) {
      code = 'present';
    } else {
      code = 'absent';
    }
    console.log(letters);
    res.push(code);
  }

  return res;
};

// Returns an object with the occurrences of each letter
export const lettersCount = (mode = GAME_MODE) => {
  let letters = {
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
  let word = getWordOfTheDay();

  [...word].forEach((c) => {
    letters[c]++;
  });

  return letters;
};

// Formats date to yyyy-MM-dd
export const formatDate = (date) => date.toISOString().slice(0, 10);
