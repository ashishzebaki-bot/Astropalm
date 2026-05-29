import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import './theme/globalStyles.css';
import './theme/animations.css';

import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import { SnackbarProvider } from './context/SnackbarContext';
import { PalmReadingProvider } from './context/PalmReadingContext';
import { TarotProvider } from './context/TarotContext';

import { registerSW } from './pwa/registerSW';
import { initializeApp } from './bootstrap/initializeApp';

initializeApp();
registerSW();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <UserProvider>
            <PalmReadingProvider>
              <TarotProvider>
                <SnackbarProvider>
                  <App />
                </SnackbarProvider>
              </TarotProvider>
            </PalmReadingProvider>
          </UserProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

IMPORTANT:
Create src/pwa/registerSW.js if not already created.
