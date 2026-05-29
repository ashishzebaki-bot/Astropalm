import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const SnackbarContext = createContext(null);
const DEFAULT_DURATION = 3000;

export function SnackbarProvider({ children }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: 'info',
    duration: DEFAULT_DURATION
  });

  const showSnackbar = useCallback(({ message, type = 'info', duration = DEFAULT_DURATION }) => {
    if (!message) return;

    setSnackbar({ open: true, message, type, duration });

    window.setTimeout(() => {
      setSnackbar((current) => ({ ...current, open: false }));
    }, duration);
  }, []);

  const hideSnackbar = useCallback(() => {
    setSnackbar((current) => ({ ...current, open: false }));
  }, []);

  const value = useMemo(() => ({ snackbar, showSnackbar, hideSnackbar }), [snackbar, showSnackbar, hideSnackbar]);

  return <SnackbarContext.Provider value={value}>{children}</SnackbarContext.Provider>;
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) throw new Error('useSnackbar must be used within SnackbarProvider');
  return context;
}

export default SnackbarContext;
