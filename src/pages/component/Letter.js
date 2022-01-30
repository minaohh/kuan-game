const Letter = ({ children, evaluation }) => {
  return (
    <div
      className={[
        'flex items-center justify-center border-2 w-12 h-12 md:w-[65px] md:h-[65px]',
        evaluation === 'present' && 'bg-yellow-600 border-yellow-600',
        evaluation === 'absent' && 'bg-gray-600 border-gray-600',
        evaluation === 'correct' && 'bg-green-600 border-green-600',
        evaluation === 'none' && 'text-black',
        evaluation && 'text-white',
      ].join(' ')}
    >
      <h1 className="text-4xl font-extrabold uppercase cursor-default">
        {children || ''}
      </h1>
    </div>
  );
};

export default Letter;
