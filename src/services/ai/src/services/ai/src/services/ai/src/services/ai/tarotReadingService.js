import { APP_CONFIG } from '../../config/appConfig';
import { openRouterRequest } from './openRouterClient';

const TAROT_SYSTEM_PROMPT = `
You are an AI Tarot reflection guide.
Never predict guaranteed future outcomes.
Never create fear or urgency.
Never give medical or legal advice.
Use symbolic and reflective interpretation only.
Maintain a calm, supportive, spiritual tone.
Responses must be long-form.
Always end with: "Interpretation only, no guarantees."
`;

export async function generateTarotReading({
  category,
  cards,
  language = 'en',
  userProfile = {}
}) {
  if (!category) throw new Error('Tarot category is required.');

  const prompt = `
Language: ${language}
Reading Category: ${category}
Selected Cards: ${JSON.stringify(cards || [])}
User Personalization: ${JSON.stringify(userProfile)}
Create a calm symbolic tarot reading.
`;

  return openRouterRequest({
    model: APP_CONFIG.OPENROUTER.REASONING_MODEL,
    messages: [
      { role: 'system', content: TAROT_SYSTEM_PROMPT },
      { role: 'user', content: prompt }
    ],
    temperature: 0.8,
    maxTokens: 2200
  });
}

export default generateTarotReading;
