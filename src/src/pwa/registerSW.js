import { registerSW as registerServiceWorker } from 'virtual:pwa-register';

let updateServiceWorkerInstance = null;

export function registerSW() {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service workers are not supported in this browser.');
    return;
  }

  try {
    updateServiceWorkerInstance = registerServiceWorker({
      immediate: true,

      onOfflineReady() {
        console.info('Application is ready for offline usage.');
        window.dispatchEvent(new CustomEvent('pwa-offline-ready'));
      },

      onNeedRefresh() {
        console.info('New application update available.');
        window.dispatchEvent(new CustomEvent('pwa-update-available'));
      },

      onRegistered(registration) {
        console.info('Service worker registered successfully.', registration);
      },

      onRegisterError(error) {
        console.error('Service worker registration failed:', error);
      }
    });
  } catch (error) {
    console.error('Failed to initialize service worker:', error);
  }
}

export async function updateServiceWorker() {
  if (!updateServiceWorkerInstance) return;

  try {
    await updateServiceWorkerInstance(true);
  } catch (error) {
    console.error('Service worker update failed:', error);
  }
}

export default registerSW;
