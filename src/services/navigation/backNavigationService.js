import { routeConstants } from '../../router/routeConstants';

export function isHomeRoute(pathname = window.location.pathname) {
  return pathname === routeConstants.HOME;
}

export function canNavigateBack() {
  return window.history.length > 1;
}

export function navigateBackOrHome(navigate) {
  if (canNavigateBack()) {
    navigate(-1);
    return;
  }

  navigate(routeConstants.HOME, { replace: true });
}

export function pushHistoryState(state = {}) {
  window.history.pushState(state, '', window.location.pathname);
}

export default {
  isHomeRoute,
  canNavigateBack,
  navigateBackOrHome,
  pushHistoryState
};
