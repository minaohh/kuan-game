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
      className="text-lg font-bold uppercase bg-gray-200 min-w-[45px] h-[55px] rounded px-3"
      onClick={onKeyPress}
    >
      {children}
    </button>
  );
};

export default Key;
