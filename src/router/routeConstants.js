export const routeConstants = {
  SPLASH: '/splash',
  LANGUAGE: '/language',
  ONBOARDING: '/onboarding',
  PROFILE_SETUP: '/profile-setup',
  HOME: '/',
  HAND_SELECTION: '/hand-selection',
  PALM_SCAN: '/palm-scan',
  PALM_RESULT: '/palm-result',
  PALM_CHAT: '/palm-chat',
  TAROT: '/tarot',
  TAROT_RESULT: '/tarot-result',
  DAILY_GUIDANCE: '/daily-guidance',
  HOROSCOPE: '/horoscope',
  SETTINGS: '/settings',
  PRIVACY_POLICY: '/privacy-policy',
  OFFLINE: '/offline',
  NOT_FOUND: '*'
};

export const bottomNavigationRoutes = [
  { label: 'Home', route: routeConstants.HOME },
  { label: 'Palm', route: routeConstants.HAND_SELECTION },
  { label: 'Tarot', route: routeConstants.TAROT },
  { label: 'Horoscope', route: routeConstants.HOROSCOPE },
  { label: 'Settings', route: routeConstants.SETTINGS }
];

export const publicRoutes = [
  routeConstants.SPLASH,
  routeConstants.LANGUAGE,
  routeConstants.ONBOARDING,
  routeConstants.PROFILE_SETUP,
  routeConstants.OFFLINE
];

export const palmRoutes = [
  routeConstants.HAND_SELECTION,
  routeConstants.PALM_SCAN,
  routeConstants.PALM_RESULT,
  routeConstants.PALM_CHAT
];

export const tarotRoutes = [
  routeConstants.TAROT,
  routeConstants.TAROT_RESULT
];

export function isPublicRoute(pathname) {
  return publicRoutes.includes(pathname);
}

export function isPalmRoute(pathname) {
  return palmRoutes.includes(pathname);
}

export function isTarotRoute(pathname) {
  return tarotRoutes.includes(pathname);
}
