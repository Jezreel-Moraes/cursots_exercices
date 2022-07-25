import { zeroLeft } from './zeroLeft';

export function secondsToMinutes(seconds: number): string {
  seconds = Math.abs(seconds);
  const m = zeroLeft(Math.floor((seconds / 60) % 60));
  const s = zeroLeft(seconds % 60);
  return `${m}:${s}`;
}
