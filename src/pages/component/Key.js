const Key = ({ children, onPress }) => {
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
      className="text-lg font-bold uppercase bg-gray-200 md:min-w-[45px] md:h-[55px] h-16 min-w-8 rounded md:px-3 px-2.5"
      onClick={onKeyPress}
    >
      {children}
    </button>
  );
};

export default Key;
