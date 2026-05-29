export const APP_CONFIG = {
  APP_NAME: 'AI Palm Reader',
  APP_FULL_NAME: 'AI Palm Reader - Tarot & Astrology Guidance',
  APP_VERSION: '1.0.0',
  OPENROUTER: {
    BASE_URL: 'https://openrouter.ai/api/v1/chat/completions',
    API_KEY: import.meta.env.VITE_OPENROUTER_API_KEY,
    VISION_MODEL: 'allenai/molmo-2-8b:free',
    REASONING_MODEL: 'liquid/lfm-2.5-1.2b-thinking:free',
    REQUEST_TIMEOUT: 60000,
    MAX_RETRIES: 2
  },
  AI_RULES: {
    ALLOW_PREDICTIONS: false,
    ALLOW_MEDICAL_ADVICE: false,
    ALLOW_LEGAL_ADVICE: false,
    ALLOW_FEAR_BASED_LANGUAGE: false,
    RESPONSE_STYLE: 'calm-spiritual'
  },
  PALM_SCAN: {
    MAX_IMAGE_SIZE_MB: 8,
    ALLOWED_FORMATS: ['image/jpeg', 'image/png', 'image/webp'],
    IMAGE_QUALITY: 0.85,
    MAX_WIDTH: 1600,
    MAX_HEIGHT: 1600
  },
  STORAGE_KEYS: {
    LANGUAGE: 'ai_palm_language',
    USER_PROFILE: 'ai_palm_user_profile',
    TAROT_HISTORY: 'ai_palm_tarot_history',
    DAILY_GUIDANCE: 'ai_palm_daily_guidance',
    SETTINGS: 'ai_palm_settings'
  }
};

if (!APP_CONFIG.OPENROUTER.API_KEY) {
  console.warn('Missing VITE_OPENROUTER_API_KEY environment variable.');
}

export default APP_CONFIG;
