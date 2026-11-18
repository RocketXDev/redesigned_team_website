import data from '@/data/competitions.json';

export const seasons = data.seasons;

export function ordinal(n) {
  const v = n % 100;
  const suffix = v >= 11 && v <= 13 ? 'th' : { 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th';
  return `${n}${suffix}`;
}

export function score(segment) {
  return segment && segment.score != null ? segment.score.toFixed(2) : '–';
}

export function total(result) {
  if (result.total != null) return result.total.toFixed(2);
  if (result.rd?.score != null && result.fd?.score != null) return (result.rd.score + result.fd.score).toFixed(2);
  return '–';
}

// "2024-2025" -> "2024–25"
export function seasonLabel(season) {
  const [a, b] = season.split('-');
  return `${a}–${b.slice(2)}`;
}

export function slug(season) {
  return `season-${season}`;
}
