let deferredInstallPrompt = null;

export async function initializePWA() {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    window.dispatchEvent(new CustomEvent('pwa-install-available'));
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    document.documentElement.setAttribute('data-pwa-installed', 'true');
    window.dispatchEvent(new CustomEvent('pwa-installed'));
  });

  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  document.documentElement.setAttribute(
    'data-pwa-installed',
    isStandalone ? 'true' : 'false'
  );
}

export async function promptPWAInstall() {
  if (!deferredInstallPrompt) {
    return { success: false, reason: 'install_prompt_unavailable' };
  }

  deferredInstallPrompt.prompt();

  const result = await deferredInstallPrompt.userChoice;
  const accepted = result.outcome === 'accepted';

  deferredInstallPrompt = null;

  return { success: accepted, outcome: result.outcome };
}

export function canInstallPWA() {
  return Boolean(deferredInstallPrompt);
}

export function isPWAInstalled() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

export default initializePWA;
