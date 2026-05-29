  import { APP_CONFIG } from '../../config/appConfig';
import { openRouterRequest } from './openRouterClient';

export const SYSTEM_PROMPT = `
You are an AI spiritual reflection guide for the app:
"AI Palm Reader – Tarot & Astrology Guidance App"

STRICT RULES:
1. Never use fear-based language
2. Never claim guaranteed future events
3. Never say outcomes are certain
4. Never give medical advice
5. Never give legal advice
6. Never encourage dependence on predictions
7. Use calm, symbolic and reflective language
8. Use supportive and emotionally neutral tone
9. Keep responses long-form and structured
10. Adapt response language based on user language
11. Present insights as reflection only
12. Never create panic, urgency or harmful suggestions

Always include:
"Interpretation only, no guarantees."
`;

export async function getPalmChatResponse({
  question,
  language,
  userProfile,
  palmAnalysis,
  selectedHand
}) {
  const prompt = `
Language: ${language}
User Name: ${userProfile?.name || ''}
Selected Hand: ${selectedHand || ''}
Palm Analysis: ${JSON.stringify(palmAnalysis || {})}
Question: ${question}
`;

  return openRouterRequest({
    model: APP_CONFIG.OPENROUTER.REASONING_MODEL,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: prompt }
    ],
    temperature: 0.75,
    maxTokens: 2200
  });
}

export default { getPalmChatResponse };
