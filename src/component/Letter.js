const Letter = ({ children, evaluation }) => {
  return (
    <div
      className={[
        'flex items-center justify-center border-2 w-12 h-12 md:w-[65px] md:h-[65px] dark:text-white dark:border-gray-400',
        evaluation === 'present' &&
          'bg-yellow-600 border-yellow-600 dark:border-yellow-600 text-white',
        evaluation === 'absent' &&
          'bg-gray-600 border-gray-600 dark:border-gray-600 text-white',
        evaluation === 'correct' &&
          'bg-green-600 border-green-600 dark:border-green-600 text-white',
        evaluation === 'none' && 'text-black',
      ].join(' ')}
    >
      <h1 className="text-4xl font-extrabold uppercase cursor-default">
        {children || ''}
      </h1>
    </div>
  );
};

export default Letter;
