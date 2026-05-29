import { APP_CONFIG } from '../../config/appConfig';
import { openRouterRequest } from './openRouterClient';

const GUIDANCE_SYSTEM_PROMPT = `
You are an AI spiritual reflection guide.
Never predict guaranteed future events.
Never use fear-based language.
Never create urgency or dependency.
Never give medical or legal advice.
Use calm, symbolic, supportive language.
Required sections: Today's Energy, Emotional Focus, Embrace, Avoid, Lucky Element, Closing Thought.
Always include: "Interpretation only, no guarantees."
`;

export async function generateDailyGuidance({
  language = 'en',
  userProfile = {},
  context = ''
}) {
  const prompt = `
Language: ${language}
User Personalization: ${JSON.stringify(userProfile)}
Additional Context: ${context}
Generate calm symbolic daily guidance.
`;

  return openRouterRequest({
    model: APP_CONFIG.OPENROUTER.REASONING_MODEL,
    messages: [
      { role: 'system', content: GUIDANCE_SYSTEM_PROMPT },
      { role: 'user', content: prompt }
    ],
    temperature: 0.8,
    maxTokens: 2200
  });
}

export default generateDailyGuidance;
