import { zeroLeft } from './zeroLeft';

export function secondsToTime(seconds: number): string {
  seconds = Math.abs(seconds);
  const h = zeroLeft(Math.floor(seconds / 60 / 60));
  const m = zeroLeft(Math.floor((seconds / 60) % 60));
  const s = zeroLeft(seconds % 60);
  return `${h}h${m}m${s}s`;
}
