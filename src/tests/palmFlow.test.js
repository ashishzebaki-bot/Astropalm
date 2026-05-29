import { describe, expect, it } from 'vitest';
import { validateImage } from '../services/image/imageValidationService';

describe('Palm Flow', () => {
  it('rejects missing image files', () => {
    const result = validateImage(null);

    expect(result.valid).toBe(false);
    expect(result.error).toBe('No image selected.');
  });

  it('accepts supported image formats', () => {
    const file = new File(['test'], 'palm.png', { type: 'image/png' });
    const result = validateImage(file);

    expect(result.valid).toBe(true);
    expect(result.error).toBe(null);
  });

  it('rejects unsupported image formats', () => {
    const file = new File(['test'], 'palm.gif', { type: 'image/gif' });
    const result = validateImage(file);

    expect(result.valid).toBe(false);
  });
});

src/tests/aiService.test.js

import { describe, expect, it } from 'vitest';
import { APP_CONFIG } from '../config/appConfig';

describe('AI Service Configuration', () => {
  it('uses the required OpenRouter base URL', () => {
    expect(APP_CONFIG.OPENROUTER.BASE_URL).toBe(
      'https://openrouter.ai/api/v1/chat/completions'
    );
  });

  it('uses the required palm vision model', () => {
    expect(APP_CONFIG.OPENROUTER.VISION_MODEL).toBe(
      'allenai/molmo-2-8b:free'
    );
  });

  it('uses the required reasoning model', () => {
    expect(APP_CONFIG.OPENROUTER.REASONING_MODEL).toBe(
      'liquid/lfm-2.5-1.2b-thinking:free'
    );
  });

  it('does not hardcode an API key value', () => {
    expect(APP_CONFIG.OPENROUTER.API_KEY).not.toContain('sk-');
  });
});
