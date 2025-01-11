export function convertTime(tineInMilliseconds: number): {
  minutes: number;
  seconds: number;
  milliseconds: number;
} {
  const minutes = Math.floor(tineInMilliseconds / 60000);
  const seconds = Math.floor((tineInMilliseconds % 60000) / 1000);
  const milliseconds = tineInMilliseconds % 1000;
  return { minutes, seconds, milliseconds };
}

export function formatTime(timeInMilliseconds: number): string {
  const { minutes, seconds, milliseconds } = convertTime(timeInMilliseconds);
  console.log(convertTime(timeInMilliseconds));
  const decimals = milliseconds.toString().padEnd(3, '0');

  const displaySeconds = minutes > 0 ? seconds.toString().padStart(2, '0') : seconds;
  console.log(displaySeconds);

  return `${minutes > 0 ? minutes : ''}${minutes > 0 ? ':' : ''}${displaySeconds}.${decimals}`;
}
