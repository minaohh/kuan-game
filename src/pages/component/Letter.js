const Letter = ({ children }) => {
  return (
    <div className="flex items-center justify-center border-2 w-[65px] h-[65px]">
      <h1 className="text-4xl font-extrabold uppercase cursor-default">
        {children || ''}
      </h1>
    </div>
  );
};

export default Letter;
