import React, { createContext, useContext, useMemo, useState } from 'react';

import { APP_CONFIG } from '../config/appConfig';
import { localStorageService } from '../services/storage/localStorageService';

const TarotContext = createContext(null);

const initialTarotState = {
  category: '',
  selectedCards: [],
  interpretation: null,
  isLoading: false,
  error: null
};

export function TarotProvider({ children }) {
  const [tarotState, setTarotState] = useState(() => {
    const savedHistory = localStorageService.get(APP_CONFIG.STORAGE_KEYS.TAROT_HISTORY, []);

    return {
      ...initialTarotState,
      history: savedHistory
    };
  });

  const setCategory = (category) => {
    setTarotState((current) => ({ ...current, category }));
  };

  const setSelectedCards = (cards = []) => {
    setTarotState((current) => ({ ...current, selectedCards: cards }));
  };

  const setLoading = (isLoading = false) => {
    setTarotState((current) => ({ ...current, isLoading }));
  };

  const setInterpretation = (interpretation) => {
    const historyEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      category: tarotState.category,
      cards: tarotState.selectedCards,
      interpretation
    };

    const updatedHistory = [historyEntry, ...(tarotState.history || [])].slice(0, 20);

    localStorageService.set(APP_CONFIG.STORAGE_KEYS.TAROT_HISTORY, updatedHistory);

    setTarotState((current) => ({
      ...current,
      interpretation,
      history: updatedHistory,
      isLoading: false,
      error: null
    }));
  };

  const setTarotError = (error) => {
    setTarotState((current) => ({
      ...current,
      error,
      isLoading: false
    }));
  };

  const resetReading = () => {
    setTarotState((current) => ({
      ...initialTarotState,
      history: current.history || []
    }));
  };

  const clearHistory = () => {
    localStorageService.remove(APP_CONFIG.STORAGE_KEYS.TAROT_HISTORY);
    setTarotState((current) => ({ ...current, history: [] }));
  };

  const value = useMemo(
    () => ({
      tarotState,
      setCategory,
      setSelectedCards,
      setLoading,
      setInterpretation,
      setTarotError,
      resetReading,
      clearHistory
    }),
    [tarotState]
  );

  return <TarotContext.Provider value={value}>{children}</TarotContext.Provider>;
}

export function useTarot() {
  const context = useContext(TarotContext);

  if (!context) throw new Error('useTarot must be used within TarotProvider');

  return context;
}

export default TarotContext;
