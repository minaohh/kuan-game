import Letter from './Letter';

const Word = ({ word }) => {
  const letters = word.split('');

  return (
    <div className="flex flex-row items-center justify-center space-x-1">
      <Letter>{letters[0]}</Letter>
      <Letter>{letters[1]}</Letter>
      <Letter>{letters[2]}</Letter>
      <Letter>{letters[3]}</Letter>
      <Letter>{letters[4]}</Letter>
    </div>
  );
};

export default Word;
