import { APP_CONFIG } from '../../config/appConfig';
import { errorHandler } from '../../errors/errorHandler';

const OPENROUTER_URL = APP_CONFIG.OPENROUTER.BASE_URL;
const OPENROUTER_API_KEY = APP_CONFIG.OPENROUTER.API_KEY;

export async function openRouterRequest({
  model,
  messages,
  temperature = 0.7,
  maxTokens = 1800,
  signal
}) {
  try {
    if (!OPENROUTER_API_KEY) throw new Error('Missing VITE_OPENROUTER_API_KEY');
    if (!model) throw new Error('OpenRouter model is required');
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error('OpenRouter messages are required');
    }

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      signal,
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': APP_CONFIG.APP_FULL_NAME
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || `OpenRouter request failed with status ${response.status}`);
    }

    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error('OpenRouter returned an empty response');

    return content;
  } catch (error) {
    errorHandler.capture(error, { scope: 'openRouterRequest', model });
    throw error;
  }
}

export function createTextMessage(role, content) {
  return { role, content };
}

export function createImageMessage({ text, imageBase64 }) {
  return {
    role: 'user',
    content: [
      { type: 'text', text },
      { type: 'image_url', image_url: { url: imageBase64 } }
    ]
  };
}

export default openRouterRequest;
