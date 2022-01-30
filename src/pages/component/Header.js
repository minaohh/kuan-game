import {
  ChartBarIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/outline';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-1 border-b">
      <button>
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
        <button>
          <ChartBarIcon className="w-6 h-6" />
        </button>
        <button>
          <CogIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
