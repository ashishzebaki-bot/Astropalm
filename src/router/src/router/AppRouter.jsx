import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import SplashScreen from '../pages/SplashScreen';
import LanguageScreen from '../pages/LanguageScreen';
import OnboardingScreen from '../pages/OnboardingScreen';
import ProfileSetupScreen from '../pages/ProfileSetupScreen';
import HomeScreen from '../pages/HomeScreen';
import HandSelectionScreen from '../pages/HandSelectionScreen';
import PalmScanScreen from '../pages/PalmScanScreen';
import PalmResultScreen from '../pages/PalmResultScreen';
import PalmChatScreen from '../pages/PalmChatScreen';
import TarotScreen from '../pages/TarotScreen';
import TarotResultScreen from '../pages/TarotResultScreen';
import DailyGuidanceScreen from '../pages/DailyGuidanceScreen';
import HoroscopeScreen from '../pages/HoroscopeScreen';
import SettingsScreen from '../pages/SettingsScreen';
import PrivacyPolicyScreen from '../pages/PrivacyPolicyScreen';
import OfflineScreen from '../pages/OfflineScreen';
import NotFoundScreen from '../pages/NotFoundScreen';

import MainLayout from '../layouts/MainLayout';
import { routeConstants } from './routeConstants';

function AnimatedPage({ children }) {
  return (
    <motion.div
      className="page-transition-wrapper"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

function AppRouter() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path={routeConstants.SPLASH} element={<AnimatedPage><SplashScreen /></AnimatedPage>} />
        <Route path={routeConstants.LANGUAGE} element={<AnimatedPage><LanguageScreen /></AnimatedPage>} />
        <Route path={routeConstants.ONBOARDING} element={<AnimatedPage><OnboardingScreen /></AnimatedPage>} />
        <Route path={routeConstants.PROFILE_SETUP} element={<AnimatedPage><ProfileSetupScreen /></AnimatedPage>} />

        <Route path={routeConstants.HOME} element={<MainLayout />}>
          <Route index element={<AnimatedPage><HomeScreen /></AnimatedPage>} />
          <Route path="hand-selection" element={<AnimatedPage><HandSelectionScreen /></AnimatedPage>} />
          <Route path="palm-scan" element={<AnimatedPage><PalmScanScreen /></AnimatedPage>} />
          <Route path="palm-result" element={<AnimatedPage><PalmResultScreen /></AnimatedPage>} />
          <Route path="palm-chat" element={<AnimatedPage><PalmChatScreen /></AnimatedPage>} />
          <Route path="tarot" element={<AnimatedPage><TarotScreen /></AnimatedPage>} />
          <Route path="tarot-result" element={<AnimatedPage><TarotResultScreen /></AnimatedPage>} />
          <Route path="daily-guidance" element={<AnimatedPage><DailyGuidanceScreen /></AnimatedPage>} />
          <Route path="horoscope" element={<AnimatedPage><HoroscopeScreen /></AnimatedPage>} />
          <Route path="settings" element={<AnimatedPage><SettingsScreen /></AnimatedPage>} />
          <Route path="privacy-policy" element={<AnimatedPage><PrivacyPolicyScreen /></AnimatedPage>} />
          <Route path="offline" element={<AnimatedPage><OfflineScreen /></AnimatedPage>} />
        </Route>

        <Route path="/home" element={<Navigate to={routeConstants.HOME} replace />} />
        <Route path="*" element={<AnimatedPage><NotFoundScreen /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
}

export default AppRouter;
