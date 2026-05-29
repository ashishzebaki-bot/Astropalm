import React, { createContext, useContext, useMemo, useState } from 'react';

const PalmReadingContext = createContext(null);

const initialPalmState = {
  selectedHand: '',
  uploadedImage: null,
  imagePreviewUrl: '',
  analysis: null,
  isAnalyzing: false,
  error: null
};

export function PalmReadingProvider({ children }) {
  const [palmState, setPalmState] = useState(initialPalmState);

  const selectHand = (hand) => {
    setPalmState((current) => ({ ...current, selectedHand: hand }));
  };

  const setPalmImage = ({ file, previewUrl }) => {
    setPalmState((current) => ({
      ...current,
      uploadedImage: file,
      imagePreviewUrl: previewUrl,
      analysis: null,
      error: null
    }));
  };

  const setPalmAnalysis = (analysis) => {
    setPalmState((current) => ({
      ...current,
      analysis,
      isAnalyzing: false,
      error: null
    }));
  };

  const setAnalyzing = (isAnalyzing) => {
    setPalmState((current) => ({ ...current, isAnalyzing }));
  };

  const setPalmError = (error) => {
    setPalmState((current) => ({
      ...current,
      error,
      isAnalyzing: false
    }));
  };

  const resetPalmReading = () => {
    setPalmState(initialPalmState);
  };

  const value = useMemo(
    () => ({
      palmState,
      selectHand,
      setPalmImage,
      setPalmAnalysis,
      setAnalyzing,
      setPalmError,
      resetPalmReading
    }),
    [palmState]
  );

  return <PalmReadingContext.Provider value={value}>{children}</PalmReadingContext.Provider>;
}

export function usePalmReading() {
  const context = useContext(PalmReadingContext);

  if (!context) throw new Error('usePalmReading must be used within PalmReadingProvider');

  return context;
}

export default PalmReadingContext;
