import { useState } from 'react';
import {
  ChartBarIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/outline';
import Modal from './Modal';

const Header = ({
  showHowModal,
  showStatsModal,
  showSettingsModal,
  toggleHowModal,
  toggleSettingsModal,
  toggleStatsModal,
}) => {
  return (
    <header className="flex items-center justify-between p-5 border-b">
      <button onClick={toggleHowModal}>
        <QuestionMarkCircleIcon className="w-6 h-6" />
      </button>
      <h1 className="pl-12 text-4xl font-extrabold leading-10">KUAN</h1>
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
