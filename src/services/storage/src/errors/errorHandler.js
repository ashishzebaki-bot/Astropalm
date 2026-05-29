class ErrorHandler {
  constructor() {
    this.errorQueue = [];
    this.maxQueueSize = 100;
  }

  capture(error, metadata = {}) {
    try {
      const normalizedError = this.normalizeError(error, metadata);
      this.errorQueue.push(normalizedError);

      if (this.errorQueue.length > this.maxQueueSize) {
        this.errorQueue.shift();
      }

      if (import.meta.env.DEV) {
        console.group('%cApplication Error', 'color: #ff6b6b; font-weight: bold;');
        console.error(normalizedError);
        console.groupEnd();
      }

      window.dispatchEvent(new CustomEvent('app-error', { detail: normalizedError }));
      return normalizedError;
    } catch (handlerError) {
      console.error('Critical error handler failure:', handlerError);
      return null;
    }
  }

  normalizeError(error, metadata = {}) {
    const timestamp = new Date().toISOString();

    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: error.stack,
        timestamp,
        metadata
      };
    }

    if (typeof error === 'string') {
      return {
        name: 'ApplicationError',
        message: error,
        stack: null,
        timestamp,
        metadata
      };
    }

    return {
      name: 'UnknownError',
      message: 'An unknown application error occurred.',
      stack: null,
      timestamp,
      metadata,
      raw: error
    };
  }

  getErrors() {
    return [...this.errorQueue];
  }

  clearErrors() {
    this.errorQueue = [];
  }
}

export const errorHandler = new ErrorHandler();
export default errorHandler;
