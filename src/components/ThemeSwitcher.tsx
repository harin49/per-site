'use client';

import React, { useContext } from 'react';
import { ThemeContext, ThemeContextType } from 'src/providers/ThemeProvider';

const ThemeSwitcher = () => {
  const { toggleTheme } = useContext(ThemeContext) as ThemeContextType;

  const handleOnchange = () => {
    toggleTheme();
  };

  return (
    <div>
      <div>this is a theme switcher test</div>
      <label htmlFor="theme-checkbox">
        <input type="checkbox" data-testid="toggle-checkbox" onChange={handleOnchange} />
      </label>
    </div>
  );
};

export default ThemeSwitcher;
