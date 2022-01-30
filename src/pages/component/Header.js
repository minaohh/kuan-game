import { useState } from 'react';
import {
  ChartBarIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/outline';
import Modal from './Modal';
import Word from './Word';

const Header = () => {
  const [showSettingsModal, setSettingsModalState] = useState(false);
  const [showHowModal, setHowModalState] = useState(false);
  const [showStatsModal, setStatsModalState] = useState(false);

  const toggleSettingsModal = () => setSettingsModalState(!showSettingsModal);
  const toggleHowModal = () => setHowModalState(!showHowModal);
  const toggleStatsModal = () => setStatsModalState(!showStatsModal);

  return (
    <header className="flex items-center justify-between p-1 border-b">
      <button onClick={toggleHowModal}>
        <QuestionMarkCircleIcon className="w-6 h-6" />
      </button>
      <h1 className="pl-12 text-4xl leading-8 flex flex-col items-center justify-center">
        <span className="font-extrabold">KUAN</span>
        <span className="text-center text-sm font-light ">
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
          <ChartBarIcon className="w-6 h-6" />
        </button>
        <button onClick={toggleSettingsModal}>
          <CogIcon className="w-6 h-6" />
        </button>
      </div>

      {/* How to Play modal dialog */}
      <Modal show={showHowModal} title="How to Play" toggle={toggleHowModal}>
        <p className="flex flex-col">
          <span className="">
            Guess the <span className="font-extrabold">KUAN</span> in 6 tries.
          </span>
          <span className="mb-2 font-extralight italic text-sm">
            Tagnaa ang <span className="font-normal">KUAN</span> sa 6 ka
            pagsulay.
          </span>
          <span className="">
            Each guess must be a valid 5-letter word. Hit the enter button to
            submit.
          </span>
          <span className="mb-2 font-extralight italic text-sm">
            Kada tagna, dapat 5 ka letra ang pulong. I-enter dayun pag human.
          </span>
          <span className="">
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </span>
          <span className="mb-2 font-extralight italic text-sm">
            Paghuman ug tagna, mubag-o ang kolor sa tiles para mapakita kung
            unsa kaduol ang imong tagna sa KUAN.
          </span>
        </p>
        <hr />
        <div className="flex flex-col space-y-4 items-start">
          <span className="font-bold">Examples</span>
          <Word
            evaluation={['correct', 'none', 'none', 'none', 'none']}
            length={5}
            word="NGANO"
          ></Word>
          <span className="flex flex-col">
            <span>
              The letter <span className="font-bold">N</span> is in the word and
              in the correct spot.
            </span>
            <span className="font-extralight italic text-sm">
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
            <span className="font-extralight italic text-sm">
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
            <span className="font-extralight italic text-sm">
              Wala ang letrang <span className="font-normal">N</span> sa word
            </span>
          </span>
        </div>
      </Modal>

      <Modal
        show={showStatsModal}
        title="Statistics"
        toggle={toggleStatsModal}
      ></Modal>

      <Modal
        show={showSettingsModal}
        title="Settings"
        toggle={toggleSettingsModal}
      ></Modal>
    </header>
  );
};

export default Header;
