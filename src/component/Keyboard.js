import { ArrowNarrowLeftIcon } from '@heroicons/react/outline';
import Key from './Key';

const Keyboard = ({ disabled, onPress, state }) => {
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
    <div className="flex flex-col items-center justify-center md:space-y-1.5 space-y-0.5 md:pb-10">
      {keyboard.map((row, index) => (
        <div key={index} className="flex md:space-x-1 space-x-0.5">
          {row.map((key, index) => {
            return (
              <Key
                key={index}
                disabled={disabled}
                onPress={onPress}
                state={state[key]}
              >
                {key}
              </Key>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
