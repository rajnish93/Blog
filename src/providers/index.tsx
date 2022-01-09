import React, { createContext, FC } from 'react';
import useDarkMode from '../hooks/darkMode';

export const ThemeContext = createContext<any | void>('light');

const ThemeProvider: FC<'{}'> = ({ children }) => {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
