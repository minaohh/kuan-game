import { useState } from 'react';
import { Switch } from '@headlessui/react';
import {
  ChartBarIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  ExternalLinkIcon,
  ShareIcon,
} from '@heroicons/react/outline';
import { getWordDictLink, getWordOfTheDay } from '../../utils/utils';
import { useTheme } from 'next-themes';

import Modal from './Modal';
import Word from './Word';

const Header = ({
  showHowModal,
  showStatsModal,
  showSettingsModal,
  toggleHowModal,
  toggleSettingsModal,
  toggleStatsModal,
  gameStats, //Statistics modal content
  wordOfTheDay = getWordOfTheDay(),
}) => {
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState(theme === 'dark');

  const toggleTheme = () => {
    setEnabled(theme !== 'dark');
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="flex items-center justify-between p-1 border-b">
      <button onClick={toggleHowModal}>
        <QuestionMarkCircleIcon className="w-6 h-6 dark:text-white" />
      </button>
      <h1 className="flex flex-col items-center justify-center pl-12 text-4xl leading-8 dark:text-gray-100">
        <span className="font-extrabold">KUAN</span>
        <span className="text-sm font-light text-center ">
          A Bisaya clone of{' '}
          <a
            href="https://www.powerlanguage.co.uk/wordle/"
            target="_blank"
            rel="noreferrer"
          >
            Wordle
          </a>
        </span>
      </h1>
      <div className="flex space-x-5">
        <button onClick={toggleStatsModal}>
          <ChartBarIcon className="w-6 h-6 dark:text-white" />
        </button>
        <button onClick={toggleSettingsModal}>
          <CogIcon className="w-6 h-6 dark:text-white" />
        </button>
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
          <span className="font-extralight italic text-sm">
            Naay bag-ong KUAN adlaw-adlaw
          </span>
        </span>
      </Modal>

      {/* Statistics modal dialog */}
      <Modal show={showStatsModal} title="Statistics" toggle={toggleStatsModal}>
        <div className="flex flex-col text-center space-y-5 items-center">
          <div className="flex flex-row space-x-6">
            <div className="flex flex-col">
              <span className="text-4xl">{gameStats.gamesPlayed}</span>
              <span className="text-xs font-light">Played</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl">{gameStats.winPercentage}</span>
              <span className="text-xs font-light">Win %</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl">{gameStats.currentStreak}</span>
              <span className="text-xs font-light">
                Current
                <br />
                Streak
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl">{gameStats.maxStreak}</span>
              <span className="text-xs font-light">
                Max
                <br />
                Streak
              </span>
            </div>
          </div>

          {/* Graph */}
          <div className="flex flex-col">
            <h3 className="font-bold text-lg">Guess Distribution</h3>
            <p className="font-thin">Insert bar graph here (TODO)</p>
          </div>

          <hr />

          {/* Word definition */}
          <div className="flex flex-col">
            <h1 className="font-bold text-4xl font-normal font-mono tracking-widest">
              {wordOfTheDay.toUpperCase()}
            </h1>
            <button
              onClick={() => window.open(getWordDictLink(wordOfTheDay))}
              className="rounded flex-row flex align-middle bg-indigo-500 py-2 px-4 text-white"
            >
              <span>View Definition</span>
              <ExternalLinkIcon className="w-6 h-6 ml-2" />
            </button>
          </div>
          <hr />

          {/* Next word */}
          <div className="grid grid-cols-2 divide-x gap-x-4">
            <div className="flex flex-col">
              <h1 className="font-semibold ">NEXT KUAN</h1>
              <h1 className="text-4xl tracking-wider">11:16:23</h1>
            </div>
            <div className="">
              <button
                onClick={() => {}}
                className="rounded flex-row flex align-middle bg-green-600 py-2 px-4 text-white"
              >
                <span className="font-semibold text-xl">SHARE</span>
                <ShareIcon className="w-6 h-6 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Settings Modal */}
      <Modal
        show={showSettingsModal}
        title="Settings"
        toggle={toggleSettingsModal}
      >
        <div className="w-52 md:w-80">
          <div className="flex items-center justify-between">
            <strong>Dark Mode</strong>
            <Switch
              checked={enabled}
              onChange={toggleTheme}
              className={`${enabled ? 'bg-green-600' : 'bg-gray-800'}
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
        </div>
      </Modal>
    </header>
  );
};

export default Header;
