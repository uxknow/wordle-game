import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  const toggleTheme = () => {
    if(theme === 'dark') {
      localStorage.setItem('theme', 'light')
      document.body.classList.remove('dark')
      setTheme('light')
    } else {
      localStorage.setItem('theme', 'dark')
      document.body.classList.add('dark')
      setTheme('dark')
  }
  }

  useEffect(() => {
    if (theme === 'dark') document.body.classList.add('dark')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
