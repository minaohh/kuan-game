import {
  ChartBarIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/outline';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-5 border-b">
      <button>
        <QuestionMarkCircleIcon className="w-6 h-6" />
      </button>
      <h1 className="pl-12 text-4xl font-extrabold leading-10">KUAN</h1>
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
