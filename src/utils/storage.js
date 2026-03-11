const EVALUATIONS_KEY = 'college_evaluations';

export function getEvaluations() {
  const raw = localStorage.getItem(EVALUATIONS_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveEvaluation(payload) {
  const evaluations = getEvaluations();
  evaluations.push(payload);
  localStorage.setItem(EVALUATIONS_KEY, JSON.stringify(evaluations));
}

export function getUniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]).filter(Boolean))];
}
