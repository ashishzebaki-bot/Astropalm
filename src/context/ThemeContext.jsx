import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { APP_CONFIG } from '../config/appConfig';
import { localStorageService } from '../services/storage/localStorageService';

const ThemeContext = createContext(null);

const THEMES = {
  cosmicDark: {
    id: 'cosmicDark',
    name: 'Cosmic Dark',
    colors: {
      background: '#090B1A',
      surface: '#11152A',
      primary: '#7C4DFF',
      secondary: '#4DA3FF',
      accent: '#7CF7FF',
      text: '#FFFFFF',
      muted: '#C7C9D3'
    }
  }
};

const DEFAULT_THEME = 'cosmicDark';

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(DEFAULT_THEME);

  useEffect(() => {
    const settings = localStorageService.get(APP_CONFIG.STORAGE_KEYS.SETTINGS, {});
    const savedTheme = settings?.theme || DEFAULT_THEME;

    setThemeId(THEMES[savedTheme] ? savedTheme : DEFAULT_THEME);
    applyTheme(THEMES[savedTheme] ? savedTheme : DEFAULT_THEME);
  }, []);

  const setTheme = (newThemeId) => {
    if (!THEMES[newThemeId]) return;

    setThemeId(newThemeId);
    applyTheme(newThemeId);

    const settings = localStorageService.get(APP_CONFIG.STORAGE_KEYS.SETTINGS, {});

    localStorageService.set(APP_CONFIG.STORAGE_KEYS.SETTINGS, {
      ...settings,
      theme: newThemeId,
      updatedAt: Date.now()
    });
  };

  const value = useMemo(
    () => ({
      themeId,
      currentTheme: THEMES[themeId],
      themes: Object.values(THEMES),
      setTheme
    }),
    [themeId]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) throw new Error('useTheme must be used inside ThemeProvider');

  return context;
}

function applyTheme(themeId) {
  const theme = THEMES[themeId];
  if (!theme) return;

  const root = document.documentElement;

  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--theme-${key}`, value);
  });

  root.setAttribute('data-theme', themeId);
}

export default ThemeContext;
