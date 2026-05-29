import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { routeConstants } from '../router/routeConstants';
import { useSnackbar } from '../context/SnackbarContext';

const EXIT_TIMEOUT = 2000;

export function useDoubleBackExit({ onExitRequested } = {}) {
  const location = useLocation();
  const { showSnackbar } = useSnackbar();
  const lastBackPress = useRef(0);

  useEffect(() => {
    const handlePopState = () => {
      if (location.pathname !== routeConstants.HOME) return;

      const now = Date.now();
      const isSecondPress = now - lastBackPress.current < EXIT_TIMEOUT;

      if (isSecondPress) {
        if (typeof onExitRequested === 'function') onExitRequested();
        return;
      }

      lastBackPress.current = now;

      showSnackbar({
        type: 'info',
        message: 'Press back again to exit',
        duration: EXIT_TIMEOUT
      });

      window.history.pushState({ preventExit: true }, '', window.location.pathname);
    };

    if (location.pathname === routeConstants.HOME) {
      window.history.pushState({ preventExit: true }, '', window.location.pathname);
    }

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, [location.pathname, onExitRequested, showSnackbar]);
}

export default useDoubleBackExit;
