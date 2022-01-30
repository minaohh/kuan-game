import { useState } from 'react';
import {
  ChartBarIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/outline';
import Modal from './Modal';

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
      <Modal
        show={showHowModal}
        title="How to Play"
        toggle={toggleHowModal}
      ></Modal>
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
