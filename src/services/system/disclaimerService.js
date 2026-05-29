const DISCLAIMERS = {
  global: 'Interpretation only, no guarantees.',
  palm: 'Palm readings are symbolic reflections and should not be considered factual predictions.',
  tarot: 'Tarot guidance is intended for personal reflection and emotional insight only.',
  horoscope: 'Horoscope content is symbolic and should not be treated as certain future events.',
  dailyGuidance: 'Daily guidance is reflective and intended to support mindful thinking.',
  aiChat: 'AI responses are supportive reflections and do not provide medical, legal, or guaranteed advice.'
};

export function getDisclaimer(type = 'global') {
  return DISCLAIMERS[type] || DISCLAIMERS.global;
}

export function appendDisclaimer(content, type = 'global') {
  if (!content) return getDisclaimer(type);

  const disclaimer = getDisclaimer(type);

  if (content.includes(disclaimer)) return content;

  return `${content}\n\n${disclaimer}`;
}

export function getAllDisclaimers() {
  return { ...DISCLAIMERS };
}

export default {
  getDisclaimer,
  appendDisclaimer,
  getAllDisclaimers
};
