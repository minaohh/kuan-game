import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import {
  ChartBarIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  ExternalLinkIcon,
  ShareIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { event } from 'react-ga';
import toast from 'react-hot-toast';

import Modal from './Modal';
import Word from './Word';
import { useHighContrast } from '../provider/high-contrast';
import { GAME_STATUS } from '../utils/constants';
import {
  calculateTimeLeft,
  getShareStatus,
  getWordDictLink,
  getWordOfTheDay,
} from '../utils/utils';

const Header = ({
  showHowModal,
  showStatsModal,
  showSettingsModal,
  toggleHowModal,
  toggleSettingsModal,
  toggleStatsModal,
  gameStats, //Statistics modal content
  gameState,
  wordOfTheDay = getWordOfTheDay(),
}) => {
  const { highContrastState, toggleHighContrast } = useHighContrast();
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState(theme === 'dark');
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [guesses, setGuesses] = useState([]);
  // const [copied, setCopied] = useState(false);
  const showShareButton =
    typeof window !== 'undefined' && !!window?.navigator?.share;

  const { boardState, evaluations, gameStatus } = gameState;

  const toggleTheme = () => {
    setEnabled(theme !== 'dark');
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const max = Math.max(
      gameStats.guesses['1'],
      gameStats.guesses['2'],
      gameStats.guesses['3'],
      gameStats.guesses['4'],
      gameStats.guesses['5'],
      gameStats.guesses['6']
    );

    const guesses = [];
    guesses.push({
      percentage: Math.floor((gameStats.guesses['1'] / max) * 100),
      value: gameStats.guesses['1'],
    });
    guesses.push({
      percentage: Math.floor((gameStats.guesses['2'] / max) * 100),
      value: gameStats.guesses['2'],
    });
    guesses.push({
      percentage: Math.floor((gameStats.guesses['3'] / max) * 100),
      value: gameStats.guesses['3'],
    });
    guesses.push({
      percentage: Math.floor((gameStats.guesses['4'] / max) * 100),
      value: gameStats.guesses['4'],
    });
    guesses.push({
      percentage: Math.floor((gameStats.guesses['5'] / max) * 100),
      value: gameStats.guesses['5'],
    });
    guesses.push({
      percentage: Math.floor((gameStats.guesses['6'] / max) * 100),
      value: gameStats.guesses['6'],
    });
    setGuesses([...guesses]);
  }, [gameStats]);

  const share = () => {
    event({
      action: 'Share results',
      category: 'GAME_SHARE',
    });
    return getShareStatus(
      boardState,
      evaluations,
      gameStatus,
      theme === 'dark',
      highContrastState
    );
  };

  const handleShare = () => {
    window?.navigator?.share({
      title: 'Kuan',
      text: share(),
    });
  };

  return (
    <header className="flex items-center justify-between p-1 border-b">
      <a className="cursor-pointer" onClick={toggleHowModal}>
        <QuestionMarkCircleIcon className="w-6 h-6 dark:text-white" />
      </a>
      <h1 className="flex flex-col items-center justify-center pl-12 text-4xl leading-8 dark:text-gray-100">
        <span className="font-extrabold">KUAN</span>
        <span className="text-sm font-light text-center ">
          A Bisaya clone of{' '}
          <a
            href="https://www.powerlanguage.co.uk/wordle/"
            target="_blank"
            rel="noreferrer"
          >
            🔗Wordle
          </a>
        </span>
      </h1>
      <div className="flex space-x-5">
        <a className="cursor-pointer" onClick={toggleStatsModal}>
          <ChartBarIcon className="w-6 h-6 dark:text-white" />
        </a>
        <a className="cursor-pointer" onClick={toggleSettingsModal}>
          <CogIcon className="w-6 h-6 dark:text-white" />
        </a>
      </div>

      {/* How to Play modal dialog */}
      <Modal show={showHowModal} title="How to Play" toggle={toggleHowModal}>
        <p className="flex flex-col">
          <span className="">
            Guess the <span className="font-extrabold">KUAN</span> in 6 tries.
          </span>
          <span className="mb-2 text-sm italic font-extralight">
            Tagnaa ang <span className="font-normal">KUAN</span> sa 6 ka
            pagsulay.
          </span>
          <span className="">
            Each guess must be a valid 5-letter word. Hit the enter button to
            submit.
          </span>
          <span className="mb-2 text-sm italic font-extralight">
            Kada tagna, dapat 5 ka letra ang pulong. I-enter dayun pag human.
          </span>
          <span className="">
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </span>
          <span className="mb-2 text-sm italic font-extralight">
            Paghuman ug tagna, mubag-o ang kolor sa tiles para mapakita kung
            unsa kaduol ang imong tagna sa KUAN.
          </span>
        </p>
        <hr />
        <div className="flex flex-col items-start space-y-4">
          <span className="font-bold">Examples</span>
          <Word
            evaluation={['correct', 'none', 'none', 'none', 'none']}
            length={5}
            word="NGANO"
          />
          <span className="flex flex-col">
            <span>
              The letter <span className="font-bold">N</span> is in the word and
              in the correct spot.
            </span>
            <span className="text-sm italic font-extralight">
              Naa ang letrang <span className="font-normal">N</span> sa word ug
              sakto ang plastar
            </span>
          </span>
          <Word
            evaluation={['none', 'present', 'none', 'none', 'none']}
            length={5}
            word="TANAN"
          ></Word>
          <span className="flex flex-col">
            <span>
              The letter <span className="font-bold">A</span> is in the word but
              in the wrong spot.
            </span>
            <span className="text-sm italic font-extralight">
              Naa ang letrang <span className="font-normal">N</span> sa word
              pero dili insakto ang plastar
            </span>
          </span>
          <Word
            evaluation={['none', 'none', 'none', 'none', 'absent']}
            length={5}
            word="MAHAL"
          ></Word>
          <span className="flex flex-col">
            <span>
              The letter <span className="font-bold">L</span> is not in the word
              in any spot.
            </span>
            <span className="text-sm italic font-extralight">
              Wala ang letrang <span className="font-normal">N</span> sa word
            </span>
          </span>
        </div>

        <hr />
        <span className="flex flex-col mb-3 font-semibold">
          <span>A new KUAN will be available each day!</span>
          <span className="text-sm italic font-extralight">
            Naay bag-ong KUAN adlaw-adlaw
          </span>
        </span>
      </Modal>

      {/* Statistics modal dialog */}
      <Modal show={showStatsModal} title="Statistics" toggle={toggleStatsModal}>
        <div className="flex flex-col items-center space-y-5 text-center">
          <div className="flex flex-row space-x-6">
            <div className="flex flex-col">
              <span className="text-2xl md:text-4xl">
                {gameStats.gamesPlayed}
              </span>
              <span className="text-xs font-light">Played</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-4xl">
                {gameStats.winPercentage}
              </span>
              <span className="text-xs font-light">Win %</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-4xl">
                {gameStats.currentStreak}
              </span>
              <span className="text-xs font-light">
                Current
                <br />
                Streak
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-4xl">
                {gameStats.maxStreak}
              </span>
              <span className="text-xs font-light">
                Max
                <br />
                Streak
              </span>
            </div>
          </div>

          {/* Graph */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">Guess Distribution</h3>
            <div className="flex flex-col items-start justify-center space-y-1 font-mono text-sm text-right">
              {guesses.map((guess, index) => (
                <div key={index} className="flex flex-row w-full space-x-1">
                  <p>{index + 1}</p>
                  <div
                    className={`px-1 text-white ${
                      gameStatus === GAME_STATUS.WIN &&
                      gameState.rowIndex - 1 === index
                        ? highContrastState
                          ? 'bg-orange-600'
                          : 'bg-green-600'
                        : 'bg-gray-600'
                    }`}
                    style={{
                      minWidth: '10%',
                      width:
                        guess.percentage > 10 ? `${guess.percentage}%` : null,
                    }}
                  >
                    <span>{guess.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Word definition */}
          {gameStatus !== GAME_STATUS.IN_PROGRESS && (
            <div className="flex flex-col">
              <h1 className="font-mono text-2xl font-normal tracking-widest md:text-4xl">
                {wordOfTheDay.toUpperCase()}
              </h1>
              <Link href={getWordDictLink(wordOfTheDay)}>
                <a
                  className="inline-flex items-center h-8 px-5 text-sm text-white align-middle transition-colors duration-150 bg-indigo-500 rounded-lg hover:bg-indigo-800"
                  target="_blank"
                >
                  <span>View Definition</span>
                  <ExternalLinkIcon className="w-4 h-4 ml-2" />
                </a>
              </Link>
            </div>
          )}

          {/* Next word */}
          {gameStatus !== GAME_STATUS.IN_PROGRESS && (
            <div className="flex items-center justify-center space-x-5">
              <div className="flex flex-col">
                <h1 className="font-semibold ">NEXT KUAN</h1>
                <h1 className="font-mono text-xl tracking-wider md:text-4xl">
                  {`${timeLeft.hours < 10 ? '0' : ''}${timeLeft.hours}`}:
                  {`${timeLeft.minutes < 10 ? '0' : ''}${timeLeft.minutes}`}:
                  {`${timeLeft.seconds < 10 ? '0' : ''}${timeLeft.seconds}`}
                </h1>
              </div>
              <div className="">
                {showShareButton ? (
                  <button
                    onClick={handleShare}
                    className={`inline-flex items-center px-5 m-2 text-white transition-colors duration-150 rounded-lg h-14 focus:shadow-outline hover:bg-green-900 ${
                      highContrastState
                        ? 'bg-orange-600 hover:bg-orange-900'
                        : 'bg-green-600 hover:bg-green-900'
                    }`}
                  >
                    <span className="text-xl font-semibold md:text-3xl">
                      SHARE
                    </span>
                    <ShareIcon className="w-5 h-5 ml-2 md:w-8 md:h-8" />
                  </button>
                ) : (
                  <CopyToClipboard
                    text={share()}
                    onCopy={() => {
                      // setCopied(true);
                      toast.success('Copied successfully!');
                    }}
                  >
                    <button
                      // onClick={share}
                      className={`inline-flex items-center px-5 m-2 text-white transition-colors duration-150 rounded-lg h-14 focus:shadow-outline ${
                        highContrastState
                          ? 'bg-orange-600 hover:bg-orange-900'
                          : 'bg-green-600 hover:bg-green-900'
                      }`}
                    >
                      <span className="text-xl font-semibold md:text-3xl">
                        SHARE
                      </span>
                      <ShareIcon className="w-5 h-5 ml-2 md:w-8 md:h-8" />
                    </button>
                  </CopyToClipboard>
                )}
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Settings Modal */}
      <Modal
        show={showSettingsModal}
        title="Settings"
        toggle={toggleSettingsModal}
      >
        <div className="space-y-6 w-60 md:w-96">
          <div className="flex items-center justify-between">
            <p>Dark Mode</p>
            <Switch
              checked={enabled}
              onChange={toggleTheme}
              className={`${
                enabled
                  ? highContrastState
                    ? 'bg-orange-600'
                    : 'bg-green-600'
                  : 'bg-gray-800'
              }
          relative inline-flex flex-shrink-0 h-6 w-14 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200`}
            >
              <span className="sr-only">Change Theme</span>
              <span
                aria-hidden="true"
                className={`${enabled ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-5 w-8 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
              />
            </Switch>
          </div>
          <div className="flex items-center justify-between">
            <p>High Contrast</p>
            <Switch
              checked={highContrastState}
              onChange={toggleHighContrast}
              className={`${highContrastState ? 'bg-orange-600' : 'bg-gray-800'}
          relative inline-flex flex-shrink-0 h-6 w-14 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200`}
            >
              <span className="sr-only">Change Theme</span>
              <span
                aria-hidden="true"
                className={`${
                  highContrastState ? 'translate-x-5' : 'translate-x-0'
                }
            pointer-events-none inline-block h-5 w-8 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
              />
            </Switch>
          </div>
          <div className="flex items-center justify-between">
            <p>Feedback</p>
            <div className="space-x-3 divide-x-2 divide-gray-600">
              <Link href="mailto:teamminjay@gmail.com?subject=Kuan%20Feedback">
                <a className="underline" target="_blank">
                  Email
                </a>
              </Link>
              <Link href="https://twitter.com/intent/tweet?screen_name=TeamMinJay">
                <a className="pl-3 underline" target="_blank">
                  Twitter
                </a>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p>Social Share</p>
            <div className="space-x-3 divide-x-2 divide-gray-600">
              <Link
                href={`https://twitter.com/share?text=${encodeURI(
                  'Katong wala pa suway, panuway mo!\nOg katong wala pa ka-Kuan, pag-Kuan namo!\n\n'
                )}&hashtags=wordle,KanangKuan,bisaya&url=${encodeURI(
                  'https://kuan.vercel.app'
                )}`}
              >
                <a className="underline" target="_blank">
                  Tweet
                </a>
              </Link>
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(
                  'https://kuan.vercel.app'
                )}&quote=${encodeURI(
                  'Katong wala pa suway, panuway mo!\nOg katong wala pa ka-Kuan, pag-Kuan namo!'
                )}`}
              >
                <a className="pl-3 underline" target="_blank">
                  Facebook
                </a>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p>Privacy Policy</p>
            <div className="space-x-3 divide-x-2 divide-gray-600">
              <Link href="https://www.privacypolicygenerator.info/live.php?token=gi9itqZsJM64YEvwFTZ5eAeuY6RFmZmb">
                <a className="underline" target="_blank">
                  Read
                </a>
              </Link>
            </div>
          </div>
          <hr />

          {/* About */}
          <div className="flex flex-col items-center justify-center pt-4 text-center">
            <h1 className="space-x-3 text-4xl font-bold">
              <span>KUAN</span>
              <small className="font-mono text-sm text-gray-400">v1.0.8</small>
            </h1>
            <span className="pt-4 space-y-2 text-sm font-light text-left justify-items-start">
              <p>
                KUAN (word game) is a Bisaya or Cebuano clone of the popular
                game,{' '}
                <a
                  href="https://www.powerlanguage.co.uk/wordle/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  🔗Wordle
                </a>
                .{' '}
              </p>
              <p>
                Words list parsed from{' '}
                <a
                  href="https://cebuano.pinoydictionary.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  🔗cebuano.pinoydictionary.com
                </a>
              </p>
              <p>
                Try Wordle in Tagalog:{' '}
                <a
                  href="https://saltong.carldegs.com//"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  🔗saltong.carldegs.com
                </a>
              </p>

              <p className="flex flex-col pt-6 font-light ">
                <span>
                  <a
                    href="https://ko-fi.com/minjay"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-gray-700 hover:underline decoration-pink-800 dark:text-yellow-300 dark:decoration-yellow-100"
                  >
                    🔗 Help us build a website and keep it running.
                  </a>
                </span>

                <span>
                  Created with ❤ by{' '}
                  <a
                    href="https://twitter.com/TeamMinJay"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline decoration-pink-800 "
                  >
                    <span className="font-normal">🔗TeamMinJay </span>
                  </a>
                </span>
              </p>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold"></h1>
          </div>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
