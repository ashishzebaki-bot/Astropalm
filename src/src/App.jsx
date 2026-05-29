import React, { useEffect } from 'react';

import AppRouter from './router/AppRouter';

import CosmicBackground from './components/common/CosmicBackground';
import Snackbar from './components/common/Snackbar';
import NetworkStatusBar from './components/common/NetworkStatusBar';
import InstallPWAButton from './components/common/InstallPWAButton';
import ExitConfirmationDialog from './components/common/ExitConfirmationDialog';

import { useDoubleBackExit } from './hooks/useDoubleBackExit';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { useExitConfirmation } from './hooks/useExitConfirmation';

import { initializeLanguage } from './bootstrap/initializeLanguage';
import { initializePWA } from './bootstrap/initializePWA';

import './theme/globalStyles.css';
import './theme/animations.css';

function App() {
  const isOnline = useOnlineStatus();

  const {
    isExitDialogOpen,
    openExitDialog,
    closeExitDialog,
    confirmExit
  } = useExitConfirmation();

  useDoubleBackExit({ onExitRequested: openExitDialog });

  useEffect(() => {
    initializeLanguage();
    initializePWA();
  }, []);

  return (
    <div className="app-root">
      <CosmicBackground />
      <NetworkStatusBar isOnline={isOnline} />

      <main className="app-container">
        <AppRouter />
      </main>

      <InstallPWAButton />
      <Snackbar />

      <ExitConfirmationDialog
        open={isExitDialogOpen}
        onCancel={closeExitDialog}
        onConfirm={confirmExit}
      />
    </div>
  );
}

export default App;
