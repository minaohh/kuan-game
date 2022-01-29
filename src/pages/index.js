import {
  ChartBarIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/outline';
import Keyboard from './component/Keyboard';
import Word from './component/Word';

const Kuan = () => {
  return (
    <main className="container flex flex-col justify-between mx-auto w-[500px]">
      <header className="flex items-center justify-between p-5 border-b">
        <button>
          <QuestionMarkCircleIcon className="w-8 h-8" />
        </button>
        <h1 className="text-4xl font-extrabold leading-10">KUAN</h1>
        <div className="flex space-x-5">
          <button>
            <ChartBarIcon className="w-8 h-8" />
          </button>
          <button>
            <CogIcon className="w-8 h-8" />
          </button>
        </div>
      </header>
      <div className="space-y-1 py-14">
        <Word word={''} />
        <Word word={''} />
        <Word word={''} />
        <Word word={''} />
        <Word word={''} />
        <Word word={''} />
      </div>
      <Keyboard />
    </main>
  );
};

export default Kuan;
