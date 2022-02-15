import { useHighContrast } from '../provider/high-contrast';

const Key = ({ children, disabled, onPress, state }) => {
  const { highContrastState } = useHighContrast();

  const onKeyPress = () => {
    const type = typeof children;

    if (type === 'string') {
      if (children.length > 1) {
        onPress(13);
      } else {
        onPress(children.toUpperCase().charCodeAt(0));
      }
    } else {
      onPress(8);
    }
  };

  return (
    <button
      className={[
        'text-lg font-bold uppercase md:min-w-[45px] md:h-[55px] h-16 min-w-8 rounded md:px-3 px-2.5 text-black',
        state === 'present' &&
          `${
            highContrastState
              ? 'bg-blue-400 border-blue-400'
              : 'bg-yellow-600 border-yellow-600'
          } dark:text-white`,
        state === 'absent' && 'bg-gray-600 border-gray-600 dark:text-white',
        state === 'correct' &&
          `${
            highContrastState
              ? 'bg-orange-600 border-orange-600'
              : 'bg-green-600 border-green-600'
          } dark:text-white`,
        state === 'none' || state === undefined ? 'bg-gray-200' : '',
      ].join(' ')}
      disabled={disabled}
      onClick={onKeyPress}
    >
      {children}
    </button>
  );
};

export default Key;
