import { ordinal } from '@/lib/results';

export default function Place({ place }) {
  const medal = place >= 1 && place <= 3 ? ` place--${place}` : '';
  return (
    <span className={`place${medal}`} aria-label={`${ordinal(place)} place`}>
      {ordinal(place)}
    </span>
  );
}
