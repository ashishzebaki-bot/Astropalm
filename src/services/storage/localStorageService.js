import { errorHandler } from '../../errors/errorHandler';

class LocalStorageService {
  set(key, value) {
    try {
      if (!key) throw new Error('Storage key is required.');
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      errorHandler.capture(error, { scope: 'localStorage.set', key });
      return false;
    }
  }

  get(key, fallback = null) {
    try {
      if (!key) return fallback;
      const rawValue = localStorage.getItem(key);
      if (rawValue === null) return fallback;
      return JSON.parse(rawValue);
    } catch (error) {
      errorHandler.capture(error, { scope: 'localStorage.get', key });
      return fallback;
    }
  }

  remove(key) {
    try {
      if (!key) return false;
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      errorHandler.capture(error, { scope: 'localStorage.remove', key });
      return false;
    }
  }

  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      errorHandler.capture(error, { scope: 'localStorage.clear' });
      return false;
    }
  }
}

export const localStorageService = new LocalStorageService();
export default localStorageService;
