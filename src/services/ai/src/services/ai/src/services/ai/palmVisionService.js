import { APP_CONFIG } from '../../config/appConfig';
import { openRouterRequest, createImageMessage } from './openRouterClient';

const PALM_VISION_SYSTEM_PROMPT = `
You are a calm AI palm reading interpretation assistant.

STRICT RULES:
- Do not predict guaranteed future events.
- Do not make medical claims.
- Do not make legal or financial guarantees.
- Do not use fear-based language.
- Treat palm lines as symbolic reflection only.
- If the image is unclear, politely explain what is difficult to see.
- Always include: "Interpretation only, no guarantees."

Return exact sections:
1. Heart Line
2. Head Line
3. Life Line
4. Fate Line
5. Gentle Summary
`;

export async function analyzePalmImageWithVision({
  imageBase64,
  selectedHand,
  language = 'en',
  userProfile = {}
}) {
  if (!imageBase64) throw new Error('Palm image is required for analysis.');

  const prompt = `
Language: ${language}
Selected hand: ${selectedHand || 'not specified'}
User profile for tone personalization only:
${JSON.stringify(userProfile)}

Analyze this palm image symbolically.
Focus only on visible palm line patterns:
Heart Line, Head Line, Life Line, Fate Line.
Do not provide medical, legal, or guaranteed future predictions.
`;

  return openRouterRequest({
    model: APP_CONFIG.OPENROUTER.VISION_MODEL,
    messages: [
      { role: 'system', content: PALM_VISION_SYSTEM_PROMPT },
      createImageMessage({ text: prompt, imageBase64 })
    ],
    temperature: 0.65,
    maxTokens: 2200
  });
}

export default analyzePalmImageWithVision;
