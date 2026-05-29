class HistoryManager {
  constructor() {
    this.currentPath = '/';
    this.previousPath = null;
    this.listeners = [];
    this.initialized = false;
  }

  initialize() {
    if (this.initialized) return;

    this.currentPath = window.location.pathname;

    window.addEventListener('popstate', this.handlePopState);

    window.history.replaceState({ path: this.currentPath }, '', this.currentPath);

    this.initialized = true;
  }

  push(path, state = {}) {
    if (!path || path === this.currentPath) return;

    this.previousPath = this.currentPath;
    this.currentPath = path;

    window.history.pushState({ path, ...state }, '', path);
    this.notifyListeners({ type: 'push', path });
  }

  replace(path, state = {}) {
    if (!path) return;

    this.previousPath = this.currentPath;
    this.currentPath = path;

    window.history.replaceState({ path, ...state }, '', path);
    this.notifyListeners({ type: 'replace', path });
  }

  back() {
    window.history.back();
  }

  handlePopState = (event) => {
    const path = event.state?.path || window.location.pathname;

    this.previousPath = this.currentPath;
    this.currentPath = path;

    this.notifyListeners({ type: 'popstate', path });
  };

  subscribe(listener) {
    if (typeof listener !== 'function') return () => {};

    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  notifyListeners(payload) {
    this.listeners.forEach((listener) => {
      try {
        listener(payload);
      } catch (error) {
        console.error('History listener error:', error);
      }
    });
  }
}

export const historyManager = new HistoryManager();
export default historyManager;
