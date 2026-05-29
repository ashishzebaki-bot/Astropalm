import { initializeLanguage } from './initializeLanguage';
import { initializePWA } from './initializePWA';
import { initializeStorage } from './initializeStorage';
import { historyManager } from '../navigation/historyManager';
import { errorHandler } from '../errors/errorHandler';
import { APP_CONFIG } from '../config/appConfig';

let isInitialized = false;

export async function initializeApp() {
  if (isInitialized) return;

  try {
    console.info(`${APP_CONFIG.APP_NAME} v${APP_CONFIG.APP_VERSION}`);

    await initializeStorage();
    await initializeLanguage();
    await initializePWA();

    historyManager.initialize();

    window.addEventListener('error', (event) => {
      errorHandler.capture(event.error || event.message, { type: 'window-error' });
    });

    window.addEventListener('unhandledrejection', (event) => {
      errorHandler.capture(event.reason, { type: 'promise-rejection' });
    });

    isInitialized = true;
  } catch (error) {
    errorHandler.capture(error, { scope: 'initializeApp' });
    console.error('Application bootstrap failed:', error);
  }
}

export default initializeApp;
