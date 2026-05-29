import { useCallback, useState } from 'react';

export function useExitConfirmation() {
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);

  const openExitDialog = useCallback(() => setIsExitDialogOpen(true), []);
  const closeExitDialog = useCallback(() => setIsExitDialogOpen(false), []);

  const confirmExit = useCallback(() => {
    setIsExitDialogOpen(false);

    if (window.navigator?.app?.exitApp) {
      window.navigator.app.exitApp();
      return;
    }

    window.close();
  }, []);

  return {
    isExitDialogOpen,
    openExitDialog,
    closeExitDialog,
    confirmExit
  };
}

export default useExitConfirmation;
