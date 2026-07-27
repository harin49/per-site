'use client';

import React, { useContext } from 'react';
import { ThemeContext, ThemeContextType } from 'src/providers/ThemeProvider';

const ThemeSwitcher = () => {
  const { selectedTheme, toggleTheme } = useContext(ThemeContext) as ThemeContextType;

  return (
    <button
      type="button"
      className="theme-switcher"
      data-testid="toggle-checkbox"
      onClick={toggleTheme}
      aria-label={selectedTheme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      {selectedTheme === 'light' ? '☀' : '☾'}
    </button>
  );
};

export default ThemeSwitcher;
