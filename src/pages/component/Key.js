const Key = ({ children, disabled, onPress, state }) => {
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
        'text-lg font-bold uppercase bg-gray-200 md:min-w-[45px] md:h-[55px] h-16 min-w-8 rounded md:px-3 px-2.5 text-black',
        state === 'present' &&
          'bg-yellow-600 border-yellow-600 dark:text-white',
        state === 'absent' && 'bg-gray-600 border-gray-600 dark:text-white',
        state === 'correct' && 'bg-green-600 border-green-600 dark:text-white',
      ].join(' ')}
      disabled={disabled}
      onClick={onKeyPress}
    >
      {children}
    </button>
  );
};

export default Key;
