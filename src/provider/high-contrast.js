import { createContext, useContext, useEffect, useState } from 'react';

const HIGH_CONTRAST = 'high-contrast';

const initialState = {
  highContrastState: false,
  toggleHighContrast: () => {},
};

const HighContrastContext = createContext(initialState);

export const useHighContrast = () => useContext(HighContrastContext);

const HighContrastProvider = ({ children }) => {
  const [highContrastState, setHighContrastState] = useState(null);

  const toggleHighContrast = () => {
    setHighContrastState(!highContrastState);
    window.localStorage.setItem(HIGH_CONTRAST, !highContrastState);
  };

  useEffect(() => {
    const state = window.localStorage.getItem(HIGH_CONTRAST);
    setHighContrastState(state === null ? false : state);
  }, []);

  return (
    <HighContrastContext.Provider
      value={{ highContrastState, toggleHighContrast }}
    >
      {children}
    </HighContrastContext.Provider>
  );
};

export default HighContrastProvider;
