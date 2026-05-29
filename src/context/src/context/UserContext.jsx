import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { APP_CONFIG } from '../config/appConfig';
import { localStorageService } from '../services/storage/localStorageService';

const UserContext = createContext(null);

const initialProfile = {
  name: '',
  dateOfBirth: '',
  timeOfBirth: '',
  gender: '',
  isProfileComplete: false
};

export function UserProvider({ children }) {
  const [profile, setProfile] = useState(initialProfile);

  useEffect(() => {
    const savedProfile = localStorageService.get(APP_CONFIG.STORAGE_KEYS.USER_PROFILE, null);
    if (savedProfile) setProfile({ ...initialProfile, ...savedProfile });
  }, []);

  const updateProfile = (profileData) => {
    const nextProfile = { ...profile, ...profileData };

    nextProfile.isProfileComplete = Boolean(
      nextProfile.name &&
      nextProfile.dateOfBirth &&
      nextProfile.timeOfBirth &&
      nextProfile.gender
    );

    setProfile(nextProfile);
    localStorageService.set(APP_CONFIG.STORAGE_KEYS.USER_PROFILE, nextProfile);

    return nextProfile;
  };

  const clearProfile = () => {
    setProfile(initialProfile);
    localStorageService.remove(APP_CONFIG.STORAGE_KEYS.USER_PROFILE);
  };

  const value = useMemo(
    () => ({ profile, updateProfile, clearProfile, isProfileComplete: profile.isProfileComplete }),
    [profile]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
}

export default UserContext;
