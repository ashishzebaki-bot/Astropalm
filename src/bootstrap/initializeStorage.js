import { APP_CONFIG } from '../config/appConfig';

const STORAGE_VERSION = '1.0.0';

export async function initializeStorage() {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);

    if (!localStorage.getItem('ai_palm_storage_version')) {
      localStorage.setItem('ai_palm_storage_version', STORAGE_VERSION);
    }

    if (!localStorage.getItem('ai_palm_install_timestamp')) {
      localStorage.setItem('ai_palm_install_timestamp', Date.now().toString());
    }

    const settingsKey = APP_CONFIG.STORAGE_KEYS.SETTINGS;

    if (!localStorage.getItem(settingsKey)) {
      localStorage.setItem(
        settingsKey,
        JSON.stringify({
          animationsEnabled: true,
          glowEffectsEnabled: true,
          offlineModeEnabled: true,
          hapticFeedbackEnabled: true,
          selectedLanguage: 'en',
          installPromptDismissed: false,
          disclaimerAccepted: false,
          createdAt: Date.now(),
          updatedAt: Date.now()
        })
      );
    }

    return true;
  } catch (error) {
    console.error('Storage initialization failed:', error);
    return false;
  }
}

export default initializeStorage;
