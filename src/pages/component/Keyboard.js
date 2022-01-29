import { ArrowNarrowLeftIcon } from '@heroicons/react/outline';
import Key from './Key';

const Keyboard = () => {
  const keyboard = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    [
      'enter',
      'z',
      'x',
      'c',
      'v',
      'b',
      'n',
      'm',
      <ArrowNarrowLeftIcon key="back" className="w-5 h-5" />,
    ],
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-1.5">
      {keyboard.map((row, index) => (
        <div key={index} className="flex space-x-1">
          {row.map((key, index) => (
            <Key key={index}>{key}</Key>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
