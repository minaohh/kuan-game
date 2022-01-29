import Letter from './Letter';

const Word = ({ length, word }) => {
  const characters = new Array(length);
  const letters = word.split('');

  for (let i = 0; i < length; i++) {
    characters[i] = letters[i] || '';
  }

  return (
    <div className="flex flex-row items-center justify-center space-x-1">
      {characters.map((letter, index) => (
        <Letter key={index}>{letter}</Letter>
      ))}
    </div>
  );
};

export default Word;
