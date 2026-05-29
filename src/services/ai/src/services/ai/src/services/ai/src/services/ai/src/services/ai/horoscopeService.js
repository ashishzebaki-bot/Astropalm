import { APP_CONFIG } from '../../config/appConfig';
import { openRouterRequest } from './openRouterClient';

const HOROSCOPE_SYSTEM_PROMPT = `
You are an AI horoscope reflection guide.
Never predict guaranteed future events.
Never give medical or legal advice.
Never use fear-based language.
Use calm, symbolic, reflective language.
Required sections: Mood, Love, Career, Advice.
Always end with: "Interpretation only, no guarantees."
`;

export async function generateHoroscope({
  zodiacSign,
  language = 'en',
  userProfile = {}
}) {
  if (!zodiacSign) throw new Error('Zodiac sign is required.');

  const prompt = `
Language: ${language}
Zodiac Sign: ${zodiacSign}
User profile for tone personalization only:
${JSON.stringify(userProfile)}
Create calm symbolic horoscope reflection.
`;

  return openRouterRequest({
    model: APP_CONFIG.OPENROUTER.REASONING_MODEL,
    messages: [
      { role: 'system', content: HOROSCOPE_SYSTEM_PROMPT },
      { role: 'user', content: prompt }
    ],
    temperature: 0.75,
    maxTokens: 2000
  });
}

export default generateHoroscope;
