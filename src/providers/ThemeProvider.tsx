'use client';

import React, { createContext, useState, useEffect } from 'react';

export type ThemeContextType = {
  selectedTheme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedTheme, setSelectedTheme] = useState('light');

  useEffect(() => {
    if (selectedTheme === 'dark') {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [selectedTheme]);

  const toggleTheme = () => {
    setSelectedTheme(selectedTheme === 'light' ? 'dark' : 'light');
  };

  return <ThemeContext.Provider value={{ selectedTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
